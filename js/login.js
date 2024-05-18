const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const forms = document.querySelectorAll('form');

registerLink.addEventListener('click', () => {
  logregBox.classList.add('active');
  // Xóa tất cả các giá trị đã nhập trong các trường input
  forms.forEach(form => form.reset());
});

loginLink.addEventListener('click', () => {
  logregBox.classList.remove('active');
  // Xóa tất cả các giá trị đã nhập trong các trường input
  forms.forEach(form => form.reset());
});

document.addEventListener('DOMContentLoaded', function () {
  const togglePasswordList = document.querySelectorAll('.toggle-password');

  togglePasswordList.forEach(function(togglePassword) {
    const passwordField = togglePassword.nextElementSibling;

    togglePassword.addEventListener('click', function () {
      const icon = togglePassword.querySelector('i');

      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-solid', 'fa-eye');
        icon.classList.add('fa-solid', 'fa-eye-slash');
      } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-solid', 'fa-eye-slash');
        icon.classList.add('fa-solid', 'fa-eye');
      }
    });

    passwordField.addEventListener('input', function () {
      const icon = togglePassword.querySelector('i');

      if (passwordField.value.trim() !== '') {
        icon.classList.remove('bx', 'bxs-lock-alt');
        icon.classList.add('fa-solid', 'fa-eye');
      } else {
        icon.classList.remove('fa-solid', 'fa-eye');
        icon.classList.add('bx', 'bxs-lock-alt');
      }
    });
  });
});


// const wrapper1 = document.querySelector('.wrapper-log');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
// const btnPopup = document.querySelector('.btnLogin-popup');
// const iconClose = document.querySelector('.icon-close');

// registerLink.addEventListener('click',()=> {
//     wrapper1.classList.add('active');
// });

// loginLink.addEventListener('click',()=> {
//     wrapper1.classList.remove('active');
// });

// const usernameEle = document.getElementById('username');
// const emailEle = document.getElementById('email');
// const passwordEle =document.getElementById('password');

// const btnRegister = document.getElementById('btn-register');
// const inputEles = document.querySelectorAll('.input-box');
// const textFields = document.querySelectorAll('input[type="text"]');
// const emailFields = document.querySelectorAll('input[type="email"]');
// const passFields = document.querySelectorAll('input[type="password"]');

// btnRegister.addEventListener('click', function () {
//     Array.from(inputEles).map((ele) =>
//         ele.classList.remove('success', 'error')
//     );
//     let isValid = checkValidate();

//     if (isValid) {
//         alert('Sign Up Success');
//         wrapper1.classList.remove('active-popup');
//         textFields.forEach(text => text.value = "");
//         emailFields.forEach(text => text.value = "");
//         passFields.forEach(text => text.value = "");
//     }
// });

// function checkValidate() {
//     let usernameValue = usernameEle.value;
//     let emailValue = emailEle.value;
//     let passwordValue = passwordEle.value;

//     let isCheck = true;

//     if (usernameValue == '') {
//         setError(usernameEle, 'Please enter full name');
//         isCheck = false;
//     } else if (!isName(usernameValue)) {
//         setError(usernameEle, 'Last name must be greater than 8 characters');
//         isCheck = false;
//     } else {
//         setSuccess(usernameEle);
//     }

//     if (emailValue == '') {
//         setError(emailEle, 'Please enter email');
//         isCheck = false;
//     } else if (!isEmail(emailValue)) {
//         setError(emailEle, 'Email invalidate');
//         isCheck = false;
//     } else {
//         setSuccess(emailEle);
//     }
    
//     if (passwordValue == '') {
//         setError(passwordEle, 'Please enter a password');
//         isCheck = false;
//     } else if (!isPass(passwordValue)) {
//         setError(passwordEle, 'Total length is at least 8 characters.');
//         isCheck = false;
//     } else {
//         setSuccess(passwordEle);
//     }

//     return isCheck;
// }

// function setSuccess(ele) {
//     ele.parentNode.classList.add('success');
// }

// function setError(ele, message) {
//     let parentEle = ele.parentNode;
//     parentEle.classList.add('error');
//     parentEle.querySelector('small').innerText = message;
// }

// function isName(username) {
//     // Vui lòng tên người dùng có ít nhất 8 ký tự
//     const re = /^.{8,}$/;
//     return re.test(username);
// }

// function isEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
// function isPass(password) {
//     const re = /^.{8,}$/;
//     return re.test(password);
// }



