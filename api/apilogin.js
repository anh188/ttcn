// document.getElementById('loginForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Ngăn chặn hành động mặc định của form

//   const email = document.getElementById('usernamelg').value;
//   const password = document.getElementById('passwordField').value;

//   // Gửi yêu cầu POST đến API login
//   fetch('http://localhost:3456/auth/login', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Xử lý phản hồi từ API
//       if (data.status === 200 && data.error === false) {
//           // Đăng nhập thành công, chuyển hướng sang trang contact.html
//           window.location.href = 'ad_user.html';
//       } else {
//           // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, vv.)
//           alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
//   });
// });

// // function login() {
// //   const username = document.getElementById('username').value;
// //   const password = document.getElementById('password').value;

// //   // Gửi yêu cầu đăng nhập đến endpoint đăng nhập
// //   fetch('http://localhost:3456/login', {
// //       method: 'POST',
// //       headers: {
// //           'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ username, password })
// //   })
// //   .then(response => {
// //       if (!response.ok) {
// //           throw new Error('Login failed');
// //       }
// //       // Nếu đăng nhập thành công, lưu trữ token trong localStorage
// //       return response.json();
// //   })
// //   .then(data => {
// //     // Lưu trữ token vào Local Storage
// //     localStorage.setItem('accessToken', data.token);

// //     // Thực hiện các hành động khác sau khi đăng nhập thành công, ví dụ: chuyển hướng trang, hiển thị thông báo, vv.
// //     alert('Đăng nhập thành công');
// //     window.location.href = 'ad_user.html'; // Chuyển hướng sang trang admin.html
// // })
// //   .catch(error => {
// //       console.error('Login failed:', error);
// //       alert('Đăng nhập thất bại');
// //   });
// // }