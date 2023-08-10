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
  if (yourName.value == '' ) {
    alert('Hãy nhập tên của bạn')
    yourName.focus(focus)
    return
  }

  if (password.value == '') {
    alert('Hãy tạo mật khẩu')
    password.focus()
    return
  }
  if (date.value == '' ){
    alert('Hãy chọn ngày tháng')
  }


  if (male.checked == false && female.checked == false ) {
    alert('Hãy chọn giới tính của bạn')
    return
  }

  let userList = JSON.parse(localStorage.getItem("account")) || []

  for(let item of userList){
    console.log(item)
    if(item.email === email.value){
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
  
  localStorage.setItem("account",JSON.stringify(userList))

  alert('sign up successfully')
  window.location.href = 'signIn.html'
})

