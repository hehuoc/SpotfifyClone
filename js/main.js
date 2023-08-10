let searchInput = document.getElementById("search-bar")
let searchButton = document.getElementById("search-btn")

searchButton.addEventListener("click",async function() {
    let options = {
        headers: {
            "X-RapidAPI-Key": "fa0e44061fmshf9b0c505b940a1dp1f32ccjsn65aaa91acf85", 
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
        }
            
    }
    const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q="+searchInput.value
    const res = await fetch(url,options)
    let data = await res.json()
    let songs = data.data 
    render(songs)



})

function render(array){
    let mainContent = document.getElementById("main-content")
    mainContent.innerHTML = ""
    for(let item of array){
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main-container")
        
        let artistImg = document.createElement("img")
        artistImg.src = item.artist.picture
        mainContainer.appendChild(artistImg)

        let songName = document.createElement('h4')
        songName.classList.add('song-name')
        songName.innerText = item.title
        mainContainer.appendChild(songName)


        mainContent.appendChild(mainContainer)

    }
}