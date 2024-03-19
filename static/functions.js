function test(data) {

console.log(data)

}

function createPlaylistDivs(data) {

  for (let i = 0; i < data['items'].length; i++) {
  temp = document.createElement('a');
  temp.className = 'text-white flex-none bg-gray-800 rounded-xl py-6 px-3 first:pl-6 last:pr-6 h-40 w-40';
  temp.innerHTML = data['items'][i]['name'];
  var hreflink = data['items'][i]['id']
  temp.href = "/home/" + hreflink;
  document.getElementById('playlists').appendChild(temp)
  }
}

function createTrackDivs(data){

  for (let i = 0 ; i < data['items'].length; i++){
    temp = document.createElement('div');
    temp.className = 'temp'
    temp.innerHTML = data['items'][i]['track']['name']
    document.getElementById('goeshere').appendChild(temp)
    
  }

}