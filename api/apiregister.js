document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('namerg').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('passwordFieldrg').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  if (!agreeTerms) {
      alert('Vui lòng đồng ý với mọi điều khoản trước khi đăng ký.');
      return;
  }

  fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert('Đăng ký không thành công. '+ data.message);
      } else {
          alert('Đăng ký thành công!');
          // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
          window.location.href = 'loginregister.html';
      }
  })
  .catch(error => {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
      alert('Đã xảy ra lỗi khi gửi yêu cầu đăng ký. Vui lòng thử lại sau.');
  });
});