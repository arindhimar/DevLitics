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

    def fetch_by_id(self, userid):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE userid = %s", (userid,))
        result = cursor.fetchone()
        conn.close()
        return result

    def create_user(self, username, email, password):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
        conn.commit()
        conn.close()
        return True

    def update_user(self, userid, username, email, password):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("UPDATE users SET username = %s, email = %s, password = %s WHERE userid = %s", 
                       (username, email, password, userid))
        conn.commit()
        conn.close()
        return True

    def delete_user(self, userid):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM users WHERE userid = %s", (userid,))
        conn.commit()
        conn.close()
        return True

    def close_connection(self):
        conn = self.get_db_connection()
        conn.close()
