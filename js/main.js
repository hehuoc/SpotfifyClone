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