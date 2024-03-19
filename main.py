from flask import Flask , render_template, flash, redirect, request, session, make_response, jsonify, abort, url_for
import requests
import urllib.parse
from datetime import datetime, timedelta



#Flask Set up
app = Flask(__name__) 
app.secret_key = "KSEWAceYWyA5Oao8Ee9NmjyWi7YIJfZd"

client_secret = "e43a7e158ede4a138f116cc70d63a449"
client_id = "1bc96559e04b4be1a0d5726ffe196590"
redirect_uri = "http://127.0.0.1:5000/callback"

AUTH_URL = "https://accounts.spotify.com/authorize"
token_url = "https://accounts.spotify.com/api/token"
api_base_url = "https://api.spotify.com/v1/"


@app.route('/')
def indexpage():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def authorize():
    scope = "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public"
    
    params = {
         'client_id': client_id,
         'scope' : scope ,
         'response_type' : 'code',
         'redirect_uri' : redirect_uri,
         'show_dialog' : True
    }

    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    return redirect(auth_url)
	

    
@app.route('/callback')
def callback():
    if 'error' in request.args:
        return render_template('index.html', error= "Acess Denied!" )
    if 'code' in request.args:
        req_body = {
            'code' : request.args['code'],
            'grant_type' : 'authorization_code',
            'redirect_uri' :  redirect_uri,
            'client_id' : client_id,
            'client_secret' : client_secret
        }

        response = requests.post(token_url , data= req_body)
        token_info = response.json()

        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

        return redirect('/home')
    

@app.route('/home')
def home():
    headers = {

        'Authorization': f'Bearer {session['access_token']}'
    }
    response = requests.get(api_base_url + 'me/playlists' , headers= headers)
  
    playlists = response.json()
    return  render_template('home.html', data= playlists)

@app.route('/home/<pId>')
def load_songs(pId):
    headers = {

        'Authorization': f'Bearer {session['access_token']}'
    }
    response = requests.get(api_base_url + 'playlists/' + pId + "/tracks" , headers= headers)
    tracks = response.json()
    songs =[]
    for item in tracks['items']:
        songs.append(item['track']['name'])

    return render_template('playlist.html', data= tracks)



	
if __name__ == "__main__" :
    app.run(debug=True)
