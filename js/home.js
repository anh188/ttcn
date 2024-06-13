// $(document).ready(function () {
//   $('.menu-icon').click(function () {
//       $('.menu').slideToggle();
//   });

//   $(window).resize(function () {
//       if ($(window).width() > 768) {
//           $('.menu').removeAttr('style');
//       }
//   });

//   $('.submenu').hover(function () {
//       $(this).find('.submenu-content').slideToggle();
//   });
// });
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  
  searchButton.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
  // Hàm để tìm kiếm hoa
  function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      sessionStorage.setItem('searchQuery', query); // Lưu từ khóa tìm kiếm vào sessionStorage
      const url = `search.html?q=${encodeURIComponent(query)}`; // Điều hướng đến search.html kèm query string
      window.location.href = url;
    }
  }


  // Hàm để tải dữ liệu hoa từ API
  function fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Truy xuất giá trị "total" từ dữ liệu API
        const totalFlowers = data.data.total;

        // Cập nhật nội dung phần tử HTML
        document.getElementById('total-count').textContent = totalFlowers;
        const flowers = data.data.flowers;
        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = ''; // Clear the gallery

        flowers.forEach(flower => {
          const div = document.createElement('div');
          div.classList.add('gallery-item');
          const a = document.createElement('a');
          a.href = '#'; // Placeholder href

          const img = document.createElement('img');
          img.src = flower.flower_images[0] || './asset/IMG_5148.JPG'; // Use default image if no image available
          img.alt = flower.name;

          const h3 = document.createElement('h3');
          h3.textContent = flower.name;

          const span = document.createElement('span');
          span.textContent = `(${flower.science_name})`; // Add scientific name in parentheses

          h3.appendChild(document.createElement('br')); // Add line break
          h3.appendChild(span); // Append scientific name

          a.appendChild(img);
          a.appendChild(h3);
          div.appendChild(a);
          galleryContainer.appendChild(div);

          // Add click event listener
          div.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link click behavior
            sessionStorage.setItem('selectedFlower', JSON.stringify(flower));
            window.location.href = './details.html';
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Tải tất cả các loài hoa khi trang được tải lần đầu
  const initialUrl = `http://localhost:3456/flowers/?page=1&per_page=8&sort_field=updated_at&sort_order=desc`;
  fetchData(initialUrl);
});