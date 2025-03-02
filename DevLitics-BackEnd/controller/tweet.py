from flask import Blueprint, request, jsonify
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import google.generativeai as genai
from datetime import datetime, timedelta
import tweepy

# Create a Blueprint for the tweet controller
tweet_blueprint = Blueprint('tweet', __name__)

# Fixed Google Gemini API key
GEMINI_API_KEY = "AIzaSyCI_FGuv17jJPuw1jSxCfnzvTj5A0cQMfA"  # Replace with your actual API key
genai.configure(api_key=GEMINI_API_KEY)

# Function to fetch all commits from the past 7 days for a given repository
def fetch_recent_commits(repo_owner, repo_name, github_token):
    commits = []
    page = 1
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    seven_days_ago_iso = seven_days_ago.isoformat()

    headers = {
        'Authorization': f'token {github_token}',
        'User-Agent': 'DevLitics/1.0'  # Required by GitHub API
    }

    # Configure session with retries
    session = requests.Session()
    retries = Retry(
        total=5,
        backoff_factor=0.3,
        status_forcelist=[500, 502, 503, 504, 429],
        allowed_methods={'GET'}
    )
    session.mount('https://', HTTPAdapter(max_retries=retries))

    while True:
        try:
            # Get the commits for the specified repository and page
            api_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/commits'
            response = session.get(
                api_url,
                headers=headers,
                params={
                    'page': page,
                    'per_page': 100,
                    'since': seven_days_ago_iso
                },
                timeout=10
            )
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch commits for {repo_name}: {e}")
            break

        data = response.json()
        
        if not data:
            break  # No more commits, exit the loop

        # Filter commits from the past 7 days
        for commit in data:
            commit_date = datetime.strptime(commit['commit']['author']['date'], '%Y-%m-%dT%H:%M:%SZ')
            if commit_date < seven_days_ago:
                break  # Stop processing if commits are older than 7 days

            commit_info = {
                'commit_sha': commit['sha'],
                'message': commit['commit']['message'],
                'author_name': commit['commit']['author']['name'],
                'date': commit['commit']['author']['date'],
                'url': commit['html_url'],
                'changes': get_commit_changes(repo_owner, repo_name, commit['sha'], github_token)
            }
            commits.append(commit_info)
        
        page += 1  # Go to the next page if available
    
    return commits

# Function to fetch commit changes (files modified) and the actual code changes (diffs)
def get_commit_changes(repo_owner, repo_name, commit_sha, github_token):
    commit_url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/commits/{commit_sha}'
    headers = {
        'Authorization': f'token {github_token}',
        'User-Agent': 'DevLitics/1.0'
    }

    try:
        response = requests.get(commit_url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch commit details for {commit_sha}: {e}")
        return []
    
    commit_data = response.json()
    
    # Extract file changes: file name, additions, deletions, and changes (diffs)
    changes = []
    for file in commit_data.get('files', []):
        file_changes = {
            'file_name': file['filename'],
            'status': file['status'],
            'additions': file['additions'],
            'deletions': file['deletions'],
            'patch': file.get('patch', 'No patch available'),  # The actual code changes (diffs)
        }
        changes.append(file_changes)
    
    return changes

# Function to generate a human-readable summary of the work done in the past 7 days
def generate_summary(commits):
    if not commits:
        return "No work was done in the past 7 days."

    # Prepare the input for the AI model
    commit_details = ""
    for commit in commits:
        commit_details += f"Commit by {commit['author_name']} on {commit['date']}:\n"
        commit_details += f"Message: {commit['message']}\n"
        commit_details += "Changes:\n"
        for change in commit['changes']:
            commit_details += f"- File: {change['file_name']} ({change['status']})\n"
            commit_details += f"  Additions: {change['additions']}, Deletions: {change['deletions']}\n"
        commit_details += "\n"

    # Use Google's Gemini to generate a human-readable summary
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        "Summarize the work done in the past 7 days based on the following commit details. "
        "Write the summary in natural, human-like language, focusing on the key changes and improvements made. "
        "Avoid technical jargon and make it easy to understand for non-technical stakeholders.\n\n"
        f"{commit_details}"
    )

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating summary: {e}")
        return "Could not generate summary due to an error."

# Function to split the summary into chunks of 280 characters
def split_summary_into_tweets(summary):
    max_length = 280
    tweets = []
    while len(summary) > max_length:
        # Find the last space within the limit
        split_index = summary.rfind(' ', 0, max_length)
        if split_index == -1:
            split_index = max_length
        tweets.append(summary[:split_index].strip())
        summary = summary[split_index:].strip()
    tweets.append(summary)  # Add the remaining part
    return tweets

# Function to post a thread of tweets
# def post_tweet_thread(tweets, twitter_credentials):
#     try:
#         # Authenticate with Twitter API
#         client = tweepy.Client(
#             bearer_token=twitter_credentials['bearer_token'],
#             consumer_key=twitter_credentials['api_key'],
#             consumer_secret=twitter_credentials['api_secret'],
#             access_token=twitter_credentials['access_token'],
#             access_token_secret=twitter_credentials['access_token_secret']
#         )

#         # Post the first tweet
#         response = client.create_tweet(text=tweets[0])
#         last_tweet_id = response.data['id']
#         print(f"Tweet posted successfully! Tweet ID: {last_tweet_id}")

#         # Post the rest of the tweets as replies
#         for tweet in tweets[1:]:
#             response = client.create_tweet(
#                 text=tweet,
#                 in_reply_to_tweet_id=last_tweet_id  # Ensure this is correctly passed
#             )
#             if response.data and 'id' in response.data:
#                 last_tweet_id = response.data['id']  # Update the last_tweet_id
#                 print(f"Reply tweet posted successfully! Tweet ID: {last_tweet_id}")
#             else:
#                 print("Failed to get tweet ID from response.")
#                 break  # Stop if the response doesn't contain a valid tweet ID
#     except tweepy.TweepyException as e:
#         print(f"Error posting tweet thread: {e}")
        
        
        
        

import time
import random

def post_tweet_thread(tweets, twitter_credentials):
    try:
        # Authenticate with Twitter API
        client = tweepy.Client(
            bearer_token=twitter_credentials['bearer_token'],
            consumer_key=twitter_credentials['api_key'],
            consumer_secret=twitter_credentials['api_secret'],
            access_token=twitter_credentials['access_token'],
            access_token_secret=twitter_credentials['access_token_secret']
        )

        # Post the first tweet
        response = client.create_tweet(text=tweets[0])
        last_tweet_id = response.data['id']
        print(f"Tweet posted successfully! Tweet ID: {last_tweet_id}")

        # Post the rest of the tweets as replies
        for tweet in tweets[1:]:
            retries = 3  # Number of retries
            for attempt in range(retries):
                try:
                    response = client.create_tweet(
                        text=tweet,
                        in_reply_to_tweet_id=last_tweet_id
                    )
                    if response.data and 'id' in response.data:
                        last_tweet_id = response.data['id']
                        print(f"Reply tweet posted successfully! Tweet ID: {last_tweet_id}")
                        break  # Exit retry loop on success
                    else:
                        print("Failed to get tweet ID from response.")
                        break
                except tweepy.TweepyException as e:
                    if e.api_code == 429:  # Rate limit exceeded
                        reset_time = int(e.response.headers.get('x-rate-limit-reset', 0))
                        if reset_time:
                            wait_time = reset_time - int(time.time()) + 10  # Add 10 seconds buffer
                            print(f"Rate limit exceeded. Waiting for {wait_time} seconds...")
                            time.sleep(wait_time)
                            continue  # Retry the same tweet
                        else:
                            print("Rate limit exceeded, but reset time not found in headers.")
                            break
                    else:
                        print(f"Error posting tweet (attempt {attempt + 1}): {e}")
                        if attempt < retries - 1:
                            wait_time = (2 ** attempt) + random.random()  # Exponential backoff
                            print(f"Retrying in {wait_time} seconds...")
                            time.sleep(wait_time)
                        else:
                            print("Max retries reached. Skipping this tweet.")
                            break
    except tweepy.TweepyException as e:
        print(f"Error posting tweet thread: {e}")        

# Endpoint to post a summary of work done in the past 7 days
@tweet_blueprint.route('/post_summary', methods=['POST'])
def post_summary():
    print("Adjklajsdkhasdjasjdgh")
    """Endpoint to post a summary of work done in the past 7 days."""
    # Get request data
    data = request.json
    github_token = data.get('github_token')
    repo_owner = data.get('repo_owner')
    repo_name = data.get('repo_name')
    twitter_credentials = data.get('twitter_credentials')

    if not all([github_token, repo_owner, repo_name, twitter_credentials]):
        return jsonify({'error': 'Missing required parameters.'}), 400

    # Fetch commits and generate summary
    commits = fetch_recent_commits(repo_owner, repo_name, github_token)
    summary = generate_summary(commits)
    if not summary:
        return jsonify({'error': 'No work was done in the past 7 days.'}), 400

    # Split the summary into tweets
    tweets = split_summary_into_tweets(summary)
    if not tweets:
        return jsonify({'error': 'Failed to split summary into tweets.'}), 500

    # Post the tweet thread
    try:
        post_tweet_thread(tweets, twitter_credentials)
        return jsonify({'message': 'Summary posted successfully as a tweet thread.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500