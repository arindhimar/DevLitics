import mysql.connector

class UserModel:
    def __init__(self):
        self.conn = self.get_db_connection()

    def get_db_connection(self):
        return mysql.connector.connect(
            host="localhost",
            database="devlitics",
            user="root",
            password="root"
        )

    def fetch_all_users(self):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
        conn.close()
        return result

    def fetch_by_id(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        conn.close()
        return result

    def create_user(self, username, email, password):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
        user_id = cursor.lastrowid 
        conn.commit()
        conn.close()
        return user_id 


    def update_user(self, user_id, username, email, twitterHandle, linkedinProfile):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            cursor.execute(
                """UPDATE users 
                SET username = %s, email = %s,
                    twitterHandle = %s, linkedinProfile = %s 
                WHERE user_id = %s""",
                (username, email, twitterHandle, linkedinProfile, user_id)
            )
            conn.commit()
            return True

        except mysql.connector.Error as e:
            print(f"Database Error: {e}")
            return False

        finally:
            conn.close()

    def delete_user(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
        conn.commit()
        conn.close()
        return True
    
    def fetch_by_email(self, email):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        result = cursor.fetchone()
        conn.close()
        return result

    def close_connection(self):
        conn = self.get_db_connection()
        conn.close()
