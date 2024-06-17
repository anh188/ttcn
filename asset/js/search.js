
// // // document.addEventListener('DOMContentLoaded', function () {
// // //   const searchInput = document.getElementById('searchInput');
// // //   const items = document.querySelectorAll('.gallery a');
// // //   const resultCount = document.getElementById('resultCount');

// // //   function filterItems(searchTerm) {
// // //       items.forEach(item => {
// // //           const title = item.querySelector('h3').textContent.toLowerCase();
// // //           if (title.includes(searchTerm.toLowerCase())) {
// // //               item.style.display = 'block';
// // //           } else {
// // //               item.style.display = 'none';
// // //           }
// // //       });
// // //       resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
// // //   }

// // //   searchInput.addEventListener('input', function () {
// // //       filterItems(this.value);
// // //   });

// // // });



// document.addEventListener('DOMContentLoaded', function () {
//   const searchInput = document.getElementById('searchInput');
//   const searchButton = document.getElementById('searchButton');
//   const items = document.querySelectorAll('.gallery a');
//   const resultCount = document.getElementById('resultCount');

//   let visibleCount = 0;
//   let initialDisplayStates = {}; // Lưu trữ trạng thái ban đầu của các đối tượng

//   // Lưu trữ trạng thái ban đầu của các đối tượng
//   items.forEach(item => {
//       initialDisplayStates[item.dataset.id] = item.style.display;
//   });

//   function filterItems(searchTerm) {
//       visibleCount = 0;
//       items.forEach(item => {
//           const title = item.querySelector('h3').textContent.toLowerCase();
//           if (title.includes(searchTerm.toLowerCase())) {
//               item.style.display = 'block';
//               visibleCount++;
//           } else {
//               item.style.display = 'none';
//           }
//       });
//       resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
//   }

//   searchInput.addEventListener('keypress', function (event) {
//       if (event.key === 'Enter') {
//           const searchTerm = searchInput.value.trim();
//           if (searchTerm !== '') {
//               // Lưu dữ liệu tìm kiếm vào session storage
//               sessionStorage.setItem('searchTerm', searchTerm);
//               redirectToSearch();
//           }
//       }
//   });

//   searchButton.addEventListener('click', function () {
//       const searchTerm = searchInput.value.trim();
//       if (searchTerm !== '') {
//           // Lưu dữ liệu tìm kiếm vào session storage
//           sessionStorage.setItem('searchTerm', searchTerm);
//           redirectToSearch();
//       }
//   });

//   function redirectToSearch() {
//       window.location.href = './search.html';
//   }

//   searchInput.addEventListener('input', function () {
//       const searchTerm = this.value.trim();
//       if (searchTerm === '') {
//           // Khôi phục lại trạng thái ban đầu của các đối tượng
//           items.forEach(item => {
//               item.style.display = initialDisplayStates[item.dataset.id];
//           });
//           resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
//       }
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const searchButton = document.getElementById('searchButton');

//   searchButton.addEventListener('click', function () {
//       const searchInput = document.getElementById('searchInput').value;
//       const apiUrl = `https://ttcn-be-1.onrender.com/flowers/?page=1&field=name&sort_order=asc&per_page=100&search=${searchInput}`;

//       fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//               // Xử lý kết quả tìm kiếm ở đây
//               // Chuyển hướng sang trang mới để hiển thị kết quả
//               const searchParams = new URLSearchParams({
//                   search: searchInput
//               });
//               window.location.href = './search.html?' + searchParams.toString();
//           })
//           .catch(error => console.error('Error searching:', error));
//   });
// });