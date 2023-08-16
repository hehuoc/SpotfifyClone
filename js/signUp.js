// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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


let email = document.getElementById('content-email')
let password = document.getElementById('content-password')
let yourName = document.getElementById('content-name')
let submitButton = document.getElementById('button')
let male = document.getElementById('male')
let female = document.getElementById('female')
let date = document.getElementById('date')



submitButton.addEventListener('click', function submitForm(event) {
  event.preventDefault()
  if (email.value == '') {
    alert('Hãy nhập email của bạn')
    email.focus()
    return
  }
  if (yourName.value == '') {
    alert('Hãy nhập tên của bạn')
    yourName.focus(focus)
    return
  }

  if (password.value == '') {
    alert('Hãy tạo mật khẩu')
    password.focus()
    return
  }
  if (date.value == '') {
    alert('Hãy chọn ngày tháng')
  }


  if (male.checked == false && female.checked == false) {
    alert('Hãy chọn giới tính của bạn')
    return
  }

  let userList = JSON.parse(localStorage.getItem("account")) || []

  for (let item of userList) {
    console.log(item)
    if (item.email === email.value) {
      alert("please choose another email")
      return
    }
  }

  let user = {
    email: email.value,
    password: password.value,
    date: date.value,
    gender: male.checked ? "male" : "female"
  }
  userList.push(user)

  // localStorage.setItem("account", JSON.stringify(userList))

  let auth = getAuth(firebase)
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
      // sendEmailVerification(auth.currentUser)
      alert('sign up successfully')
      localStorage.setItem('user',userCredential.user)
      window.location.href = 'index.html'

      localStorage.setItem("favSongsList",JSON.stringify([]))
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

})

