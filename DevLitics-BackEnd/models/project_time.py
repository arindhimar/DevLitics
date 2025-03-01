import mysql.connector

class ProjectTimeModel:
    def __init__(self):
        self.conn = self.get_db_connection()

    def get_db_connection(self):
        return mysql.connector.connect(
            host="localhost",
            database="devlitics",
            user="root",
            password="root"
        )

    def fetch_project_times(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM PROJECT_TIME WHERE user_id = %s", (user_id,))
        result = cursor.fetchall()
        conn.close()
        return result

    def add_project_time(self, user_id, project_name, project_time):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)

        try:
            cursor.execute(
                "SELECT project_time FROM PROJECT_TIME WHERE user_id = %s AND project_name = %s",
                (user_id, project_name)
            )
            existing_record = cursor.fetchone()

            if existing_record:
                new_time = int(existing_record["project_time"]) + int(project_time)
                cursor.execute(
                    "UPDATE PROJECT_TIME SET project_time = %s WHERE user_id = %s AND project_name = %s",
                    (new_time, user_id, project_name)
                )
            else:
                cursor.execute(
                    "INSERT INTO PROJECT_TIME (user_id, project_name, project_time) VALUES (%s, %s, %s)",
                    (user_id, project_name, project_time)
                )

            conn.commit()
            return True
        except mysql.connector.Error as e:
            print(f"Error: {e}")
            return False
        finally:
            conn.close()

    def update_project_time(self, user_id, project_name, project_time):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "UPDATE PROJECT_TIME SET project_time = project_time + %s WHERE user_id = %s AND project_name = %s",
            (project_time, user_id, project_name)
        )
        conn.commit()
        conn.close()
        return True

    def delete_project_time(self, user_id, project_name):
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "DELETE FROM PROJECT_TIME WHERE user_id = %s AND project_name = %s",
            (user_id, project_name)
        )
        conn.commit()
        conn.close()
        return True

    def get_total_project_time(self, user_id):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT SUM(project_time) FROM PROJECT_TIME WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        conn.close()
        return result[0] if result and result[0] else 0
