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
    temp.innerHTML = data['items'][i]['track']['name'] + " - " + data['items'][i]['track']['artists'][0]['name']
    temp.href = window.location.href + '/' + data['items'][i]['track']['name'] + '/' + data['items'][i]['track']['artists'][0]['name']
    document.getElementById('tracks').appendChild(temp)   
  }

}

function createSearchDivs(data){
  for (let i = 0; i < data.length; i++){
    console.log(data[i]['name'])
    temp = document.createElement('a');
    temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"
    temp.innerHTML = data[i]['name'] + " - " + data[i]['artists'][0]['name']
    temp.href = "http://127.0.0.1:5000/home" + '/' + data[i]['name'] + '/' + data[i]['artists'][0]['name']
    document.getElementById('tracks').appendChild(temp)  
  }

}

function createSearchAddDivs(data){
  for (let i = 0; i < data.length; i++){
    console.log(data[i]['name'])
    temp = document.createElement('a');
    temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"
    temp.innerHTML = data[i]['name'] + " - " + data[i]['artists'][0]['name']
    temp.href = window.location.href + "/" + data[i]['uri'] + "/add"
    document.getElementById('tracks').appendChild(temp)  
  }

}



function createResourceDivs(data){
  for (let i = 0 ; i < data.length ; i++){
    temp = document.createElement('a')
    temp.innerHTML = "Link to Tabs"
    temp.href = data[i]
    temp.target = "_blank"

    if (data[i].includes("youtube.com")){
      
      temp = document.createElement('a')
      temp.innerHTML = "Link to Video"
      temp.href = data[i]
      temp.target = "_blank"
      temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"
      document.getElementById("video").appendChild(temp)
    } else {
      temp = document.createElement('a')
      temp.innerHTML = "Link to Tabs"
      temp.href = data[i]
      temp.target = "_blank"
      temp.className = "bg-slate-600 w-80 text-white font-semibold rounded-lg pl-5 items-center text-lg ml-5 transition hover:bg-slate-400"

      document.getElementById("regular").appendChild(temp)
    }


  }


}

function createSavedDivs(data){
  for (let i = 0; i < data['items'].length; i++) {
  temp = document.createElement('a');
  temp.className = 'text-white flex-none bg-gray-800 rounded-xl py-6 px-3 first:pl-6 last:pr-6 h-40 w-40 transition hover:bg-slate-400';

  var hreflink = data['items'][i]['track']['name'] + '/' + data['items'][i]['track']['artists'][0]['name']
  temp.href = "/home/" + hreflink;
  temp.id = "smain" + i 
  document.getElementById('savedsongs').appendChild(temp)
  
  /* images */
  image = document.createElement('img')
  image.className = 'size-20'
  try {
    image.src = data['items'][i]['track']['album']["images"][0]['url']
  }
  catch(err){
    image.src = "https://static.vecteezy.com/system/resources/thumbnails/005/720/408/small_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
  }
  
 
  /* container */
  container = document.createElement('div')
  container.className = "flex flex-col items-center justify-center"
  container.id = "scont" + i

  /* title */
  title = document.createElement('strong')
  title.className = "flex text-center"
  title.innerHTML = data['items'][i]['track']['name'];


  document.getElementById('smain' + i).appendChild(container)
  document.getElementById("scont" + i).appendChild(image)
  document.getElementById("scont" + i).appendChild(title)
  
  }
}


function createPlaylist(){
  let submitBtn = document.getElementById('submit')

  submitBtn.addEventListener("click", (e) => {
    let name = document.getElementById('name')
    let description = document.getElementById('description')

    if (name.value == "" || description.value == ""){
      name.value = name.value
      description.value = description.value
      alert("Please fill out all fields!")
    } else {
      window.location.href = "http://127.0.0.1:5000/create/" + name.value + "/" + description.value

    }

  })


}
