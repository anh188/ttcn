document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const items = document.querySelectorAll('.gallery a');
  const resultCount = document.getElementById('resultCount');

  let visibleCount = 0;
  let initialDisplayStates = {}; // Lưu trữ trạng thái ban đầu của các đối tượng

  // Lưu trữ trạng thái ban đầu của các đối tượng
  items.forEach(item => {
      initialDisplayStates[item.dataset.id] = item.style.display;
  });

  function filterItems(searchTerm) {
      visibleCount = 0;
      items.forEach(item => {
          const title = item.querySelector('h3').textContent.toLowerCase();
          if (title.includes(searchTerm.toLowerCase())) {
              item.style.display = 'block';
              visibleCount++;
          } else {
              item.style.display = 'none';
          }
      });
      resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
  }

  searchInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          const searchTerm = searchInput.value.trim();
          if (searchTerm !== '') {
              filterItems(searchTerm);
              redirectToSearch(searchTerm);
          }
      }
  });

  searchButton.addEventListener('click', function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
          filterItems(searchTerm);
          redirectToSearch(searchTerm);
      }
  });

  function redirectToSearch(searchTerm) {
      window.location.href = `./search.html?query=${encodeURIComponent(searchTerm)}`;
  }

  // Nếu trang đã được chuyển hướng từ trang search.html và có tham số truy vấn 'query' trong URL
  // thì điền giá trị của tham số đó vào ô nhập liệu và hiển thị kết quả tìm kiếm
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('query');
  if (queryParam !== null) {
      searchInput.value = queryParam;
      filterItems(queryParam);
  }

  searchInput.addEventListener('input', function () {
      const searchTerm = this.value.trim();
      if (searchTerm === '') {
          // Khôi phục lại trạng thái ban đầu của các đối tượng
          items.forEach(item => {
              item.style.display = initialDisplayStates[item.dataset.id];
          });
          resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
      }
  });

});
