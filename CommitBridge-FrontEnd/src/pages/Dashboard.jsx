import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GitBranch, Twitter, Clock, Plus, X } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Dashboard() {
  const [gitRepos, setGitRepos] = useState([{ owner: '', repo: '' }]) // Removed 'url' field
  const [githubToken, setGitHubToken] = useState('')
  const [trackInterval, setTrackInterval] = useState('daily')
  const [twitterEnabled, setTwitterEnabled] = useState(false)
  const [twitterBearerToken, setTwitterBearerToken] = useState('')
  const [twitterConsumerKey, setTwitterConsumerKey] = useState('')
  const [twitterConsumerSecret, setTwitterConsumerSecret] = useState('')
  const [twitterAccessToken, setTwitterAccessToken] = useState('')
  const [twitterAccessTokenSecret, setTwitterAccessTokenSecret] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      console.log('User:', parsedUser)
      setUser(parsedUser)
      fetchGitHubCredentials(parsedUser)
      fetchTwitterCredentials(parsedUser)
    }
  }, [])

  // Fetch GitHub credentials using the GitHub controller
  const fetchGitHubCredentials = async (user) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/github/${user}`)
      console.log('GitHub Response:', response)
      if (response.ok) {
        const data = await response.json()
        console.log('GitHub Data:', data)
        // Set GitHub token and tracking interval
        setGitHubToken(data.github_token || '')
        setTrackInterval(data.trackInterval || 'daily')
        // Set repositories (if they exist)
        if (data.repos && Array.isArray(data.repos)) {
          setGitRepos(data.repos)
        } else {
          setGitRepos([{ owner: '', repo: '' }]) // Removed 'url' field
        }
      }
    } catch (error) {
      console.error('Failed to fetch GitHub credentials:', error)
    }
  }

  // Fetch Twitter credentials using the Twitter controller
  const fetchTwitterCredentials = async (user) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/twitter/${user}`)
      if (response.ok) {
        const data = await response.json()
        setTwitterEnabled(data.auto_post_enabled || false)
        setTwitterBearerToken(data.bearer_token || '')
        setTwitterConsumerKey(data.consumer_key || '')
        setTwitterConsumerSecret(data.consumer_secret || '')
        setTwitterAccessToken(data.access_token || '')
        setTwitterAccessTokenSecret(data.access_token_secret || '')
      }
    } catch (error) {
      console.error('Failed to fetch Twitter credentials:', error)
    }
  }

  const handleAddRepo = () => {
    setGitRepos([...gitRepos, { owner: '', repo: '' }]) // Add a new empty repo object without 'url'
  }

  const handleRemoveRepo = async (index, repo) => {
    if (!user || !repo.owner || !repo.repo) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/github/${user}/${repo.owner}/${repo.repo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("GitHub repository deleted successfully");

        // Remove from state
        setGitRepos((prevRepos) => prevRepos.filter((_, i) => i !== index));
      } else {
        console.error("Failed to delete GitHub repository");
      }
    } catch (error) {
      console.error("Error deleting GitHub repository:", error);
    }
  };

  const handleRepoChange = (index, field, value) => {
    const newRepos = [...gitRepos]
    newRepos[index][field] = value
    setGitRepos(newRepos)
  }

  // Save GitHub settings
  const handleSaveGitHubSettings = async () => {
    if (!user) return

    try {
      const githubResponse = await fetch(`http://127.0.0.1:5000/github/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_token: githubToken,
          repos: gitRepos, // Send the full array of repos (without 'url')
          trackInterval: trackInterval,
        }),
      })

      if (githubResponse.ok) {
        console.log('GitHub credentials updated successfully')
      } else {
        console.error('Failed to update GitHub credentials')
      }
    } catch (error) {
      console.error('Failed to update GitHub credentials:', error)
    }
  }

  // Save Twitter settings
  const handleSaveTwitterSettings = async () => {
    if (!user) return

    try {
      const twitterResponse = await fetch(`http://127.0.0.1:5000/twitter/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bearer_token: twitterBearerToken,
          consumer_key: twitterConsumerKey,
          consumer_secret: twitterConsumerSecret,
          access_token: twitterAccessToken,
          access_token_secret: twitterAccessTokenSecret,
          auto_post_enabled: twitterEnabled,
        }),
      })

      if (twitterResponse.ok) {
        console.log('Twitter credentials updated successfully')
      } else {
        console.error('Failed to update Twitter credentials')
      }
    } catch (error) {
      console.error('Failed to update Twitter credentials:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4 space-y-6"
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Dashboard
          </h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* GitHub Integration Card */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-6 h-6 text-purple-500" />
                  Git Integration
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Configure your Git repository settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="github-token" className="text-gray-700 dark:text-gray-300">GitHub Token</Label>
                    <Input
                      id="github-token"
                      placeholder="Enter your GitHub token"
                      value={githubToken}
                      onChange={(e) => setGitHubToken(e.target.value)}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  {gitRepos.map((repo, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Owner"
                          value={repo.owner}
                          onChange={(e) => handleRepoChange(index, "owner", e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <Input
                          placeholder="Repository Name"
                          value={repo.repo}
                          onChange={(e) => handleRepoChange(index, "repo", e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveRepo(index, repo)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    onClick={handleAddRepo}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Repository
                  </Button>
                  <div>
                    <Label htmlFor="track-interval" className="text-gray-700 dark:text-gray-300">Commit Tracking Interval</Label>
                    <Select value={trackInterval} onValueChange={setTrackInterval}>
                      <SelectTrigger id="track-interval" className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end p-4">
                <Button
                  onClick={handleSaveGitHubSettings}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  Save GitHub Settings
                </Button>
              </div>
            </Card>

            {/* Twitter Integration Card */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-purple-500" />
                  Twitter Integration
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Connect your Twitter account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Twitter className="w-5 h-5 text-purple-500" />
                      <Label htmlFor="twitter-integration" className="text-gray-700 dark:text-gray-300">Twitter Integration</Label>
                    </div>
                    <Switch
                      id="twitter-integration"
                      checked={twitterEnabled}
                      onCheckedChange={setTwitterEnabled}
                    />
                  </div>

                  {twitterEnabled && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="twitter-bearer-token" className="text-gray-700 dark:text-gray-300">Bearer Token</Label>
                        <Input
                          id="twitter-bearer-token"
                          placeholder="Enter your Twitter Bearer Token"
                          value={twitterBearerToken}
                          onChange={(e) => setTwitterBearerToken(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter-consumer-key" className="text-gray-700 dark:text-gray-300">Consumer(API) Key</Label>
                        <Input
                          id="twitter-consumer-key"
                          placeholder="Enter your Twitter Consumer Key"
                          value={twitterConsumerKey}
                          onChange={(e) => setTwitterConsumerKey(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter-consumer-secret" className="text-gray-700 dark:text-gray-300">Consumer(API) Secret</Label>
                        <Input
                          id="twitter-consumer-secret"
                          placeholder="Enter your Twitter Consumer Secret"
                          value={twitterConsumerSecret}
                          onChange={(e) => setTwitterConsumerSecret(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter-access-token" className="text-gray-700 dark:text-gray-300">Access Token</Label>
                        <Input
                          id="twitter-access-token"
                          placeholder="Enter your Twitter Access Token"
                          value={twitterAccessToken}
                          onChange={(e) => setTwitterAccessToken(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter-access-token-secret" className="text-gray-700 dark:text-gray-300">Access Token Secret</Label>
                        <Input
                          id="twitter-access-token-secret"
                          placeholder="Enter your Twitter Access Token Secret"
                          value={twitterAccessTokenSecret}
                          onChange={(e) => setTwitterAccessTokenSecret(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="flex justify-end p-4">
                <Button
                  onClick={handleSaveTwitterSettings}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  Save Twitter Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}