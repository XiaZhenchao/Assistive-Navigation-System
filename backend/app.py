from flask import Flask, jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from query import get_sidewalk_accessibility
load_dotenv() 
# app = Flask(__name__,
#             static_folder="../build/static",
#             template_folder="../build")
app = Flask(__name__)
CORS(app) 
@app.route('/')
def index():
    print("backend is running")
    # return render_template('index.html')


@app.route('/api/data', methods=['POST'])  # Use POST method to send line points
def get_data():
    try:
        # Example line_points data structure: [{"lng": -73.987, "lat": 40.757}, {"lng": -73.985, "lat": 40.759}]
        line_points = request.json.get('linePoints', [])
        # Assuming you send line_points as JSON data
        if not line_points:
            return jsonify({'error': 'No line points provided'})
        # Call the function to fetch sidewalk accessibility data
        sidewalk_data = get_sidewalk_accessibility(line_points)
        return jsonify(sidewalk_data)

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
