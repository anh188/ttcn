document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form

  const email = document.getElementById('usernamelg').value;
  const password = document.getElementById('passwordField').value;

  // Gửi yêu cầu POST đến API login
  fetch('http://localhost:3456/auth/login', {
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
          window.location.href = 'admin.html';
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

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Gửi yêu cầu đăng nhập đến endpoint đăng nhập
  fetch('http://localhost:3456/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Login failed');
      }
      // Nếu đăng nhập thành công, lưu trữ token trong localStorage
      return response.json();
  })
  .then(data => {
      localStorage.setItem('accessToken', data.accessToken);
      // Thực hiện hành động sau khi đăng nhập thành công, ví dụ: hiển thị thông báo, chuyển hướng đến trang khác, vv.
      alert('Đăng nhập thành công');
  })
  .catch(error => {
      console.error('Login failed:', error);
      alert('Đăng nhập thất bại');
  });
}