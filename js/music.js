let searchMusic = document.getElementById('search-music')
let searchBtn = document.getElementById('search-btn')
let img = document.getElementById('img-artist')
let nameArtist = document.getElementById('name-artist')
let nameSong = document.getElementById('name-song')
let listSong = document.getElementById('list-song')
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
    window.location.href = "signIn.html"
})

signUpBtn.addEventListener('click', function(){
    window.location.href = "signUp.html"
})

logOut.addEventListener('click',function () {
    localStorage.removeItem('logged')
    window.location.reload()
})

async function callAPI(){
    const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + searchMusic.value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fa0e44061fmshf9b0c505b940a1dp1f32ccjsn65aaa91acf85',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        let count = 0;
        let string = ''
        listSong.innerHTML = ''
        for (let item of result.data) {
            if (count == 0) {
                console.log(item.artist.name)
                nameArtist.innerText = item.artist.name
                img.src = item.artist.picture
                nameSong.innerText = item.title_short
            }
            if(count == 4){
                break
            }

            string += `
            <div class="result"  id_song="${item.id}">
                <div class="result-container">
                    <div class="flex">
                        <div class="img-container">
                            <img src="${item.artist.picture}"
                                alt="" class="result-img">
                        </div>
                        <div class="result-info">
                            <div>${item.title}</div>
                            <div>${item.artist.name}</div>
                        </div>
                    </div>
                    <div class="more-info">
                        <div class="more-container">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div class="more-container time">
                            <p id="time"> 4:58</p>
                        </div>
                        <div class="more-container">
                            <p class="other-options"><i class="fa-solid fa-ellipsis"></i></p>
                        </div>
                    </div>
                </div>
            </div>
            `


            count++    
        }
        console.log(string)
        listSong.innerHTML = string
        document.querySelectorAll(".result").forEach((item) => {
            item.addEventListener('click' , function(){
                localStorage.setItem('chosen-song' , item.getAttribute("id_song"))
                window.location.href = "index-music.html"
            })
        })

    } catch (error) {
        console.error(error);
    }
}

searchBtn.addEventListener('click', async function () {
    if (searchMusic.value == '') {
        alert("")
        return
    }

    await callAPI()
})

searchMusic.addEventListener('keypress', async function(e){
    if(e.key === "Enter" ){
        await callAPI()
    }
})


