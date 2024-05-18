document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form

  const email = document.getElementById('usernamelg').value;
  const password = document.getElementById('passwordField').value;

  // Gửi yêu cầu POST đến API login
  fetch('https://ttcn-be-1.onrender.com/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
      // Xử lý phản hồi từ API
      if (data.status === 200 && data.error === false) {
          // Đăng nhập thành công, chuyển hướng sang trang contact.html
          window.location.href = 'contact.html';
      } else {
          // Xử lý khi đăng nhập thất bại (hiển thị thông báo lỗi, vv.)
          alert('Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
  });
});