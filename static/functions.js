


function test(data) {

console.log(data)

}

function createPlaylistDivs(data) {

  for (let i = 0; i < data['items'].length; i++) {
  temp = document.createElement('a');
  temp.className = 'text-white flex-none bg-gray-800 rounded-xl py-6 px-3 first:pl-6 last:pr-6 h-40 w-40 transition hover:bg-slate-400';

  var hreflink = data['items'][i]['id']
  temp.href = "/home/" + hreflink;
  temp.id = "main" + i 
  document.getElementById('playlists').appendChild(temp)
  
  /* images */
  image = document.createElement('img')
  image.className = 'size-20'
  try {
    image.src = data['items'][i]['images'][0]["url"]
  }
  catch(err){
    image.src = "https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
  }
  
 
  /* container */
  container = document.createElement('div')
  container.className = "flex flex-col items-center justify-center"
  container.id = "cont" + i

  /* title */
  title = document.createElement('strong')
  title.className = "flex text-center"
  title.innerHTML = data['items'][i]['name'];


  document.getElementById('main' + i).appendChild(container)
  document.getElementById("cont" + i).appendChild(image)
  document.getElementById("cont" + i).appendChild(title)
  
  }
}

function createTrackDivs(data){

  for (let i = 0 ; i < data['items'].length; i++){
    temp = document.createElement('a');
    temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"
    temp.innerHTML = data['items'][i]['track']['name']
    temp.href = window.location.href + '/' + data['items'][i]['track']['name'] + '/' + data['items'][i]['track']['artists'][0]['name']
    document.getElementById('tracks').appendChild(temp)   
  }

}

function createSearchDivs(data){
  for (let i = 0; i < data.length; i++){
    console.log(data[i]['name'])
    temp = document.createElement('a');
    temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"
    temp.innerHTML = data[i]['name']
    temp.href = "http://127.0.0.1:5000/home" + '/' + data[i]['name'] + '/' + data[i]['artists'][0]['name']
    document.getElementById('tracks').appendChild(temp)  
  }

}