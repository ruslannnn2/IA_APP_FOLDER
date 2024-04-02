from flask import Flask , render_template, flash, redirect, request, session, make_response, jsonify, abort, url_for
import requests
import urllib.parse
from datetime import datetime, timedelta
from googlesearch import search


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
    scope = "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public user-library-read"
    
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

        'Authorization': f'Bearer {session["access_token"]}'
    }
    response = requests.get(api_base_url + 'me/playlists?limit=50' , headers= headers)
  
    playlists = response.json()
    
    #user data
    responseUser = requests.get(api_base_url + 'me' , headers= headers)
    user = responseUser.json()

    #save user id for future calls
    session['user_id'] = user['id']

    #user's saved songs
    savedSongsResponse =  requests.get(api_base_url + 'me/tracks?limit=50' , headers= headers)
    savedSongs = savedSongsResponse.json()
    return  render_template('home.html', data= playlists , imagedata= user['images'][1]['url'], user = user['display_name'], userdata = user , savedSongs = savedSongs)



@app.route('/home/<pId>')
def load_songs(pId):
    headers = {

        'Authorization': f'Bearer {session["access_token"]}'
    }
    response = requests.get(api_base_url + 'playlists/' + pId + "/tracks" , headers= headers)
    tracks = response.json()
   

    return render_template('playlist.html', data= tracks)



@app.route('/home/<pId>/<tName>/<tArtist>')
def loud_resources(pId,tName,tArtist):
    list = []
    for link in search(tName + " " + tArtist + "guitar tabs" ,num=5, stop= 5):
        list.append(str(link))

    return render_template('track.html', data = list , song = tName , artist = tArtist) 



@app.route('/home/<tName>/<tArtist>')
def search_results(tName,tArtist):
    list = []
    for link in search(tName + " " + tArtist + "guitar tabs" ,num=5, stop= 5):
        list.append(str(link))
    return render_template('track.html', data = list, song = tName , artist = tArtist )


@app.route('/search/<songcreds>')
def search_method(songcreds):

    headers = {

        'Authorization': f'Bearer {session["access_token"]}'
    }
    params ={
        'q' : songcreds,
        'type' : 'track',
        'offset' : "5",

    }

    search_url = f"{api_base_url}search?{urllib.parse.urlencode(params)}"
    search_request = requests.get(search_url, headers= headers)
    temp = search_request.json()['tracks']['items']
    
    return render_template('search.html', data = temp)


	
if __name__ == "__main__" :
    app.run(debug=True)
