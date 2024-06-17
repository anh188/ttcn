// function renderPagination(currentPage, totalPages, containerId, fetchDataFunction) {
//   const paginationContainer = document.getElementById(containerId);
//   paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại

//   // Tạo nút phân trang cho mỗi trang
//   for (let i = 1; i <= totalPages; i++) {
//     const pageItem = document.createElement('button');
//     pageItem.textContent = i;
//     pageItem.classList.add('btn', 'btn-primary');

//     // Thêm sự kiện click cho từng nút phân trang
//     pageItem.addEventListener('click', function() {
//       // Cập nhật trang hiện tại và gọi hàm fetchDataFunction
//       currentPage = parseInt(this.textContent);
//       fetchDataFunction(currentPage);

//       // Cập nhật lại nút phân trang
//       updatePaginationButtons(currentPage, totalPages, containerId);
//     });

//     // Nếu là trang hiện tại, thêm lớp 'active'
//     if (i === currentPage) {
//       pageItem.classList.add('active');
//     }

//     // Thêm nút phân trang vào container
//     paginationContainer.appendChild(pageItem);
//   }
// }

// function updatePaginationButtons(currentPage, totalPages, containerId) {
//   // Lấy tất cả các nút phân trang
//   const paginationButtons = document.querySelectorAll(`#${containerId} button`);

//   // Loại bỏ lớp 'active' từ tất cả các nút phân trang
//   paginationButtons.forEach(button => {
//     button.classList.remove('active');
//   });

//   // Thêm lớp 'active' cho nút phân trang được nhấp vào
//   paginationButtons[currentPage - 1].classList.add('active');
// }
// function fetchDataAndDisplay(fetchURL, rowsPerPage, currentPage, containerId, dataProcessor) {
//   const token = localStorage.getItem('accessToken');
//   fetch(`${fetchURL}?page=${currentPage}&per_page=${rowsPerPage}&field=name&sort_order=asc`, {
//       method: 'GET',
//       headers: {
//           'Authorization': `Bearer ${token}`
//       }
//   })
//   .then(response => response.json())
//   .then(res => {
//       dataProcessor(res, containerId); // Process and display data in the specified container
//   })
//   .catch(error => console.log('Error fetching data:', error));
// }

