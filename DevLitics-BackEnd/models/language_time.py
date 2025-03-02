import mysql.connector

class LanguageTimeModel:
    def __init__(self):
        self.conn = self.get_db_connection()

    def get_db_connection(self):
        return mysql.connector.connect(
            host="localhost",
            database="devlitics",
            user="root",
            password="root"
        )
    
    def fetch_all_language_times(self):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT u.user_id, u.username, lt.language_name, lt.language_time 
            FROM LANGUAGE_TIME lt
            JOIN users u ON lt.user_id = u.user_id
        """)
        
        result = cursor.fetchall()
        conn.close()
        
        return result


    def fetch_language_times(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT u.username, lt.language_name, lt.language_time 
            FROM LANGUAGE_TIME lt
            JOIN users u ON lt.user_id = u.user_id
            WHERE lt.user_id = %s
        """, (user_id,))
        
        result = cursor.fetchall()
        conn.close()
        
        return result

    
    def add_language_time(self, user_id, language_name, language_time):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute(
                "SELECT language_time FROM LANGUAGE_TIME WHERE user_id = %s AND language_name = %s",
                (user_id, language_name)
            )
            existing_record = cursor.fetchone()

            if existing_record:
                new_time = float(language_time)
                cursor.execute(
                    "UPDATE LANGUAGE_TIME SET language_time = %s WHERE user_id = %s AND language_name = %s",
                    (new_time, user_id, language_name)
                )
            else:
                cursor.execute(
                    "INSERT INTO LANGUAGE_TIME (user_id, language_name, language_time) VALUES (%s, %s, %s)",
                    (user_id, language_name, language_time)
                )

            conn.commit()
            return True
        except mysql.connector.Error as e:
            print(f"Error: {e}")
            return False
        finally:
            conn.close()


    def update_language_time(self, user_id, language_name, language_time):
        """Update the time spent on a specific language for a user"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "UPDATE LANGUAGE_TIME SET language_time = language_time + %s WHERE user_id = %s AND language_name = %s",
            (language_time, user_id, language_name)
        )
        conn.commit()
        conn.close()
        return True

    def delete_language_time(self, user_id, language_name):
        """Delete a specific language record for a user"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "DELETE FROM language_time WHERE user_id = %s AND language_name = %s",
            (user_id, language_name)
        )
        conn.commit()
        conn.close()
        return True
    
    def delete_by_user_id(self, user_id):
        """Delete all language records for a user"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM language_time WHERE user_id = %s", (user_id,))
        conn.commit()
        conn.close()
        return True
    
    def delete_all_language_times(self):
        """Delete all language records"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("DELETE FROM language_time")
        conn.commit()
        conn.close()
        return True
    

    def get_total_coding_time(self, user_id):
        """Get the total coding time across all languages for a user"""
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT SUM(language_time) FROM LANGUAGE_TIME WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        conn.close()
        return result[0] if result and result[0] else 0
