from flask import Flask, jsonify
from flask_cors import CORS

# app = Flask(__name__,
#             static_folder="../build/static",
#             template_folder="../build")
app = Flask(__name__)
CORS(app) 
@app.route('/')
def index():
    print("backend is running")
    # return render_template('index.html')


@app.route('/api/data')
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
