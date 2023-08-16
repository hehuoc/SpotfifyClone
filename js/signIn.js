// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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

let submitButton = document.getElementById('button')
let email = document.getElementById('content-email')
let password = document.getElementById('content-password')
let remember = document.getElementById('remember')

submitButton.addEventListener('click', function submitForm(event) {
    event.preventDefault()
    if (email.value == '') {
        alert('hay nhap email')
        email.focus()
        return
    }
    if (password.value == '') {
        alert('hay nhap password')
        password.focus()
        return
    }

    // let userList = JSON.parse(localStorage.getItem("account")) || []
    // let rememberStorage = JSON.parse(localStorage.getItem("remember")) || []

    // if(!rememberStorage){
    //     email.value = rememberStorage.email
    //     password.value = rememberStorage.password
    // }

    // for(let item of userList){
    //     console.log(item)
    //     if(email.value === item.email && password.value === item.password){
    //         if(remember.checked){
    //             localStorage.setItem("remember",{
    //                 email : email.value,
    //                 password : password.value
    //             })
    //         }else{
    //             localStorage.removeItem(remember)
    //         }
    //         alert('dang nhap thanh cong')
    //         window.location.href = "index.html"
    //         return
    //     }
    // }

    let auth = getAuth(firebase)
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            // sendEmailVerification(auth.currentUser)
            const user = userCredential.user
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('logged', 'true')
            const userDocRef = doc(database, "songs", user.uid)

            // getDoc(userDocRef)
            // .then((response)=>{
            //   if(response.data().exists()){
            //     console.log("abc")
            //     localStorage.setItem("favSongsList",response.data())
            //   }else{
            //     console.log("xyz")
            //     localStorage.setItem("favSongsList",[])
            //   }
            // })
            // .catch((error)=>{
            //     console.log(error)
            // })

            const songs = await getDoc(userDocRef)
            if (songs.exists()) {
                localStorage.setItem("favSongsList",JSON.stringify(songs.data().songList))
            }else{
                localStorage.setItem("favSongsList", [])
            }

            alert('sign in successfully')
            window.location.href = 'index.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            password.value = ""
            email.focus()
            console.log(errorMessage)
        });
})


