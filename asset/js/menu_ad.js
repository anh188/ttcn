document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname; // Lấy URL hiện tại

  const navLinks = document.querySelectorAll('nav a'); // Chọn tất cả các thẻ a trong thẻ nav

  navLinks.forEach(link => {
    // Kiểm tra xem href của liên kết có khớp với URL hiện tại không
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('current-page'); // Thêm class current-page nếu có khớp
    }
  });
});


