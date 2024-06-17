window.addEventListener('scroll', function() {
  const backtopButton = document.querySelector('.backtop');
  if (window.scrollY > 150) { // Hiển thị nút khi cuộn xuống 200px
    backtopButton.classList.add('show');
  } else {
    backtopButton.classList.remove('show');
  }
})