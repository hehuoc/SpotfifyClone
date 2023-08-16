// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGGqOnUkTylSUXJZb6wUwE4kNZOyspfHA",
    authDomain: "spotify-clone-94369.firebaseapp.com",
    projectId: "spotify-clone-94369",
    storageBucket: "spotify-clone-94369.appspot.com",
    messagingSenderId: "990971279390",
    appId: "1:990971279390:web:2eb23b744999edebc9560f",
    measurementId: "G-5X4G6JC9TH"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getFirestore(firebase);


let imageMusic = document.getElementById('image-music')
let nameSongs = document.getElementById('name-song-detail')
let avatarArtist = document.getElementById('avartar-of-artists')
let nameArtist = document.getElementById('name-of-artists')
let songsName = document.getElementById('songs-name')
let year = document.getElementById('year-of-song')
let timeSong = document.getElementById('time-for-song')
let artistsJobImage = document.getElementById('artists-job-img')
let artistJobName = document.getElementById('artists-job-name')
let btnPlay = document.getElementById('btn-play')
let buttonPlay = document.getElementById('play')
let buttonPause = document.getElementById('pause')
let bar = document.getElementById('bar')
let  playMusicImg = document.getElementById('play-music-img')
let nameMusic = document.getElementById('name-music')
let artistName = document.getElementById('artist-name')
let likedMusicBtn = document.getElementById('liked-music-btn')
let liked = document.getElementById('liked')
let notLiked = document.getElementById('not-liked')


let mouseDownOnSlider = false

if (localStorage.getItem('chosen-song')) {
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/track/' + localStorage.getItem('chosen-song');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fa0e44061fmshf9b0c505b940a1dp1f32ccjsn65aaa91acf85',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            nameSongs.innerText = result.title_short
            nameArtist.innerText = result.artist.name
            songsName.innerText = result.title_short
            year.innerText = result.release_date

            let mind = result.duration % (60 * 60);
            let minutes = Math.floor(mind / 60);

            let secd = mind % 60;
            let seconds = Math.ceil(secd);
            timeSong.innerText = `${minutes}:${seconds}`

            imageMusic.src = result.artist.picture
            avatarArtist.src = result.artist.picture
            artistsJobImage.src = result.artist.picture
            artistJobName.innerText = result.artist.name
            playMusicImg.src = result.artist.picture
            nameMusic.innerText = result.title_short
            artistName.innerText = result.artist.name

            const url = result.preview

            const audio = new Audio(url);
            audio.addEventListener("loadeddata", () => {
                bar.value = 0;
            });
            audio.addEventListener("timeupdate", () => {
                if (!mouseDownOnSlider) {
                    bar.value = audio.currentTime / audio.duration * 100;
                }
            });
            audio.addEventListener("ended", () => {
                buttonPlay.hidden = false
                buttonPause.hidden = true
            });

            btnPlay.addEventListener("click", () => {
                audio.paused ? audio.play() : audio.pause();
                if(audio.paused){
                    buttonPlay.hidden = false
                    buttonPause.hidden = true
                }else{
                    buttonPlay.hidden = true
                    buttonPause.hidden = false
                }
            });

            bar.addEventListener("change", () => {
                const pct = bar.value / 100;
                audio.currentTime = (audio.duration || 0) * pct;
            });
            bar.addEventListener("mousedown", () => {
                mouseDownOnSlider = true;
            });
            bar.addEventListener("mouseup", () => {
                mouseDownOnSlider = false;
            });

        })
        .catch(error => {
            console.log(error)
        })

}

likedMusicBtn.addEventListener('click', async function(){
    const user = JSON.parse(localStorage.getItem('user'))
    try{
        const userDocRef = doc(database, "songs",user.uid)
    
        const songs = await getDoc(userDocRef)
        let favSongs = []
        if(songs.exists()){
            favSongs = songs.data().songList
        }
        if(!checkExists(favSongs,Number(localStorage.getItem('chosen-song')))){
            favSongs.push(JSON.parse(localStorage.getItem('chosen-song')))
            localStorage.setItem("favSongsList",JSON.stringify(favSongs))
            await setDoc(userDocRef,{
                songList : favSongs
            })
            liked.hidden = false
            notLiked.hidden = true
            alert("Add favorite song successfully")
        }else{
            alert("Already add this song")
        }
    }catch(error){
        console.log(error)
    }

})

function checkExists(list,id){
    for(let item of list){
        if(item === id){
            return true
        }
    }
    return false
}

let favSongs = JSON.parse(localStorage.getItem("favSongsList"))
if(checkExists(favSongs,Number(localStorage.getItem("chosen-song")))){
    liked.hidden = false
    notLiked.hidden = true
}else{
    liked.hidden = true
    notLiked.hidden = false
}


let signIn =document.getElementById('sign-in')
let notSignIn = document.getElementById('not-sign-in')
let signUpBtn = document.getElementById('sign-up-btn')
let signInBtn = document.getElementById('sign-in-btn')
let logOut = document.getElementById("log-out-btn")

if(localStorage.getItem('logged')){
    signIn.style.display = 'block'
    notSignIn.style.display = 'none'
}else{
    signIn.style.display = 'none'
    notSignIn.style.display = 'block'
}

signInBtn.addEventListener('click',function(){
    alert("UI")
    window.location.href = "signIn.html"
})
signUpBtn.addEventListener('click', function(){
    window.location.href = "signUp.html"
})

logOut.addEventListener('click',function () {
    localStorage.removeItem('logged')
    window.location.reload()
})