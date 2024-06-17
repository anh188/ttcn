// document.addEventListener('DOMContentLoaded', function () {
//   // Lấy tham số tìm kiếm từ URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const searchQuery = urlParams.get('search');

//   // Hiển thị tham số tìm kiếm (có thể loại bỏ nếu không cần)
//   document.getElementById('searchInput').value = searchQuery;

//   // Gọi API để lấy dữ liệu hoa dựa trên tham số tìm kiếm
//   const apiUrl = `http://localhost:3456/flowers/?page=1&per_page=100&field=name&sort_order=asc=${searchQuery}`;

//   fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//           const flowers = data.data.flowers;
//           const flowerList = document.getElementById('flowerList');

//           // Hiển thị kết quả tìm kiếm
//           flowers.forEach(flower => {
//               const flowerItem = document.createElement('div');
//               flowerItem.classList.add('flower-item');

//               const flowerName = document.createElement('h3');
//               flowerName.textContent = flower.name;

//               const flowerImage = document.createElement('img');
//               flowerImage.src = flower.flower_images[0] || 'default-image.jpg'; // Thay thế bằng ảnh mặc định nếu không có ảnh
//               flowerImage.alt = flower.name;

//               flowerItem.appendChild(flowerImage);
//               flowerItem.appendChild(flowerName);
//               flowerList.appendChild(flowerItem);
//           });

//           // Hiển thị số lượng kết quả
//           const resultCount = document.getElementById('resultCount');
//           resultCount.textContent = `Tìm thấy ${flowers.length} kết quả`;
//       })
//       .catch(error => console.error('Error fetching search results:', error));
// });
