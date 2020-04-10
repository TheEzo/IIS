from web import create_app
from flask_cors import CORS

app = create_app()
#CORS(app, resources={r"/*": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Accept'

if __name__ == '__main__':
    host = 'localhost'
    port = 8080

    app.run(host=host, port=port, debug=True)

