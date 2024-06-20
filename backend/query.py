import psycopg2
from dotenv import load_dotenv
import os
load_dotenv() 
def get_sidewalk_accessibility(line_points):
    try:
        conn = psycopg2.connect(dsn= os.getenv('dsn'))
        cursor = conn.cursor()
        line_geom = f"ST_SetSRID(ST_MakeLine(ARRAY[{', '.join(['ST_MakePoint(%s, %s)'] * len(line_points))}]), 2263)"
        query = f"""
        WITH geometry_range AS (
            SELECT *
            FROM nyc_sidewalk_features
            WHERE ST_Intersects(
                ST_SetSRID(geometry::geometry, 2263), 
                {line_geom}
            )
        )
        SELECT * FROM geometry_range;
        """

        # Flatten the points for the query parameters
        query_params = [coord for point in line_points for coord in (point['lng'], point['lat'])]
        
        cursor.execute(query, query_params)

        points = cursor.fetchall()
        
        cursor.close()
        conn.close()

        return points

    except Exception as e:
        return {'error': str(e)}