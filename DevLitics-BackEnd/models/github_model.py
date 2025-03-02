import mysql.connector

class GitHubModel:
    def __init__(self):
        self.conn = self.get_db_connection()

    def get_db_connection(self):
        return mysql.connector.connect(
            host="localhost",
            database="devlitics",
            user="root",
            password="root"
        )

    def fetch_all_github_credentials(self):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM github_credentials")
        result = cursor.fetchall()
        conn.close()
        return result

    def fetch_github_credentials_by_user_id(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT * FROM github_credentials WHERE user_id = %s", (user_id,))
        result = cursor.fetchall()
        
        conn.close()
        return result  

    
    def create_github_credentials(self, user_id, github_token, repo_owner, repo_name):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if repo already exists for this user
            cursor.execute(
                "SELECT * FROM github_credentials WHERE user_id = %s AND repo_owner = %s AND repo_name = %s",
                (user_id, repo_owner, repo_name)
            )
            existing_record = cursor.fetchone()

            if existing_record:
                return False  # Repo already exists, do not insert duplicate

            # Insert only if no duplicate exists
            cursor.execute(
                "INSERT INTO github_credentials (user_id, github_token, repo_owner, repo_name) VALUES (%s, %s, %s, %s)",
                (user_id, github_token, repo_owner, repo_name)
            )
            conn.commit()
            return True

        except mysql.connector.Error as e:
            print(f"Database Error: {e}")
            return False

        finally:
            conn.close()

    
    def update_github_credentials(self, user_id, github_token, repo_owner, repo_name):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            # Check if the record exists for the given user_id
            cursor.execute(
                "SELECT * FROM github_credentials WHERE user_id = %s",
                (user_id,)
            )
            existing_record = cursor.fetchone()

            if existing_record:
                # Update the existing record
                cursor.execute(
                    "UPDATE github_credentials SET github_token = %s, repo_owner = %s, repo_name = %s WHERE user_id = %s",
                    (github_token, repo_owner, repo_name, user_id)
                )
            else:
                # Insert a new record
                cursor.execute(
                    "INSERT INTO github_credentials (user_id, github_token, repo_owner, repo_name) VALUES (%s, %s, %s, %s)",
                    (user_id, github_token, repo_owner, repo_name)
                )

            conn.commit()
            return True
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()

    def delete_github_credentials(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM github_credentials WHERE user_id = %s", (user_id,))
        conn.commit()
        conn.close()
        return True
    
    def delete_github_repo(self, user_id, repo_owner, repo_name):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            cursor.execute(
                "DELETE FROM github_credentials WHERE user_id = %s AND repo_owner = %s AND repo_name = %s",
                (user_id, repo_owner, repo_name),
            )
            conn.commit()

            if cursor.rowcount > 0:
                return True
            return False

        except mysql.connector.Error as e:
            print(f"Database Error: {e}")
            return False

        finally:
            conn.close()


    def close_connection(self):
        conn = self.get_db_connection()
        conn.close()