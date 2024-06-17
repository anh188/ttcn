// Kiểm tra trạng thái đăng nhập khi người dùng truy cập trang đăng nhập
document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
      window.location.href = '/admin.html'; // Chuyển hướng đến trang chính
  }
});

// Xử lý khi đăng nhập thành công
function handleSuccessfulLogin() {
  localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
  // Chuyển hướng đến trang chính
  window.location.href = '/admin.html'; 
}

// Xử lý khi đăng xuất
function handleLogout() {
  localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
  // Chuyển hướng đến trang đăng nhập
  window.location.href = '/loginregister.html'; 
}