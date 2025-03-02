import mysql.connector

class TwitterModel:
    def __init__(self):
        self.conn = self.get_db_connection()

    def get_db_connection(self):
        return mysql.connector.connect(
            host="localhost",
            database="devlitics",
            user="root",
            password="root"
        )

    def fetch_all_twitter_credentials(self):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM twitter_credentials")
        result = cursor.fetchall()
        conn.close()
        return result

    def fetch_twitter_credentials_by_user_id(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM twitter_credentials WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        conn.close()
        return result

    def create_twitter_credentials(self, user_id, bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency=24, auto_post_enabled=False):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if the user already has Twitter credentials
            cursor.execute("SELECT * FROM twitter_credentials WHERE user_id = %s", (user_id,))
            existing_record = cursor.fetchone()

            if existing_record:
                # Update existing credentials
                cursor.execute(
                    """UPDATE twitter_credentials 
                    SET bearer_token = %s, consumer_key = %s, consumer_secret = %s, 
                        access_token = %s, access_token_secret = %s, 
                        post_frequency = %s, auto_post_enabled = %s 
                    WHERE user_id = %s""",
                    (bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency, auto_post_enabled, user_id)
                )
                conn.commit()
                return "updated"

            else:
                # Insert new credentials if not found
                cursor.execute(
                    """INSERT INTO twitter_credentials 
                    (user_id, bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency, auto_post_enabled) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
                    (user_id, bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency, auto_post_enabled)
                )
                conn.commit()
                return "created"

        except mysql.connector.Error as e:
            print(f"Database Error: {e}")
            return False

        finally:
            conn.close()


    def update_twitter_credentials(self, user_id, bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency=24, auto_post_enabled=False):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "UPDATE twitter_credentials SET bearer_token = %s, consumer_key = %s, consumer_secret = %s, access_token = %s, access_token_secret = %s, post_frequency = %s, auto_post_enabled = %s WHERE user_id = %s",
            (bearer_token, consumer_key, consumer_secret, access_token, access_token_secret, post_frequency, auto_post_enabled, user_id)
        )
        conn.commit()
        conn.close()
        return True

    def delete_twitter_credentials(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM twitter_credentials WHERE user_id = %s", (user_id,))
        conn.commit()
        conn.close()
        return True

    def close_connection(self):
        conn = self.get_db_connection()
        conn.close()