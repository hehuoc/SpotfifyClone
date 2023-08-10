let submitButton = document.getElementById('button')
let email = document.getElementById('content-email')
let password = document.getElementById('content-password')
let remember = document.getElementById('remember')

submitButton.addEventListener('click', function submitForm(event) {
    event.preventDefault()
    if(email.value == ''){
        alert('hay nhap email')
        email.focus()
        return
    }
    if(password.value == '') {
        alert('hay nhap password')
        password.focus()
        return 
    }

    let userList = JSON.parse(localStorage.getItem("account")) || []
    let rememberStorage = JSON.parse(localStorage.getItem("remember")) || []

    if(!rememberStorage){
        email.value = rememberStorage.email
        password.value = rememberStorage.password
    }

    for(let item of userList){
        console.log(item)
        if(email.value === item.email && password.value === item.password){
            if(remember.checked){
                localStorage.setItem("remember",{
                    email : email.value,
                    password : password.value
                })
            }else{
                localStorage.removeItem(remember)
            }
            alert('dang nhap thanh cong')
            window.location.href = "index.html"
            return
        }
    }

    alert('dang nhap that bai')
    password.value = ""
    email.focus()
})
