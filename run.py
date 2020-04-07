from web import create_app

app = create_app()

if __name__ == '__main__':
    host = 'localhost'
    port = 80

    app.run(host=host, port=port, debug=True)

