document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('.gallery a');

  function filterItems(searchTerm) {
      items.forEach(item => {
          const title = item.querySelector('h3').textContent.toLowerCase();
          if (title.includes(searchTerm.toLowerCase())) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  }

  searchInput.addEventListener('input', function () {
      filterItems(this.value);
  });
});