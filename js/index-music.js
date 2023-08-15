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



