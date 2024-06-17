document.addEventListener('DOMContentLoaded', function() {
  // Lấy token từ Local Storage sau khi đăng nhập thành công
  const token = localStorage.getItem('accessToken');

  // Nếu có token, hiển thị nút Đăng xuất
  if (token) {
      const logoutButton = document.querySelector('#logoutButton');

      // Thêm sự kiện click vào nút Đăng xuất
      logoutButton.addEventListener('click', function() {
          // Gửi yêu cầu đến API để thực hiện đăng xuất
          fetch('http://localhost:3456/auth/logout', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              // Nếu đăng xuất thành công, xóa token từ Local Storage và chuyển hướng về trang loginregister.html
              if (response.ok) {
                  localStorage.removeItem('accessToken');
                  window.location.href = 'loginregister.html';
              } else {
                  console.error('Logout failed');
              }
          })
          .catch(error => console.error('Error logging out:', error));
      });
  }
});