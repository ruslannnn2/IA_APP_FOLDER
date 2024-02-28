from flask import Flask, render_template
import requests
from flaskwebgui import FlaskUI

#Flask Set up
app = Flask(__name__)
ui = FlaskUI(app=app, server="flask")
app.secret_key = "hello_kamran"

#Spotify Vars
client_id = '1bc96559e04b4be1a0d5726ffe196590'
client_skey = 'e43a7e158ede4a138f116cc70d63a449'
redirect_uri = 'http://localhost:5000/callback'

#Spotify URLs
spotify_auth_url = "https://accounts.spotify.com/authorize"
token_url = "https://accounts.spotify.com/api/token"
api_url = 'https://api.spotify.com/v1/'


@app.route('/')
def indexpage():
    return render_template('index.html')

if __name__ == "__main__" :
    ui.run()
