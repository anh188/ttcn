// // Xác nhận xóa dữ liệu
// function deletegenuses(genusId) {
//   if (confirm('Bạn có chắc chắn muốn xóa chi này?')) {
//       deleteGenus(genusId);
//   }
// }

// // Xóa dữ liệu
// function deleteGenus(genusId) {
//   const token = localStorage.getItem('accessToken');

//   // Hiển thị thông báo hoặc spinner ngay khi người dùng nhấn nút
//   showNotification('Đang xóa dữ liệu...');

//   fetch(`http://localhost:3456/genuses/${genusId}`, {
//       method: 'DELETE',
//       headers: {
//           'Authorization': `Bearer ${token}`
//       }
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Failed to delete genus');
//       }
//       return response.json();
//   })
//   .then(result => {
//       console.log(result);

//       if (result.status === 200 && !result.error) {
//           showNotification('Xóa dữ liệu thành công');
//           fetchUserData(currentPage); // Reload the data to update the table
//       } else {
//           showNotification('Failed to delete genus');
//       }
//   })
//   .catch(error => {
//       console.error('Error deleting genus:', error);
//       showNotification('Error deleting genus');
//   });
// }

// // Hiển thị thông báo
// function showNotification(message) {
//   const notification = document.getElementById('notification');
//   notification.textContent = message;
//   notification.style.display = 'block';
//   setTimeout(() => {
//       notification.style.display = 'none';
//   }, 3000);
// }

// // Fetch và hiển thị lại dữ liệu sau khi xóa
// function fetchUserData(page, query = '') {
//   const token = localStorage.getItem('accessToken');
//   fetch(`http://localhost:3456/genuses/?page=${page}&per_page=${rowsPerPage}&field=name&sort_order=asc&query=${query}`, {
//       method: 'GET',
//       headers: {
//           'Authorization': `Bearer ${token}`
//       }
//   })
//   .then(response => response.json())
//   .then(res => {
//       processUserData(res, 'tableRows');
//   })
//   .catch(error => console.log('Error fetching data:', error));
// }

// document.addEventListener('DOMContentLoaded', function() {
//   const rowsPerPage = 9; // Số mục trên mỗi trang
//   let currentPage = 1;
//   let totalPages = 1;
//   let searchQuery = '';

//   function processUserData(res, containerId) {
//       const genuses = res.data.genuses;
//       if (genuses && Array.isArray(genuses)) {
//           let rows = '';
//           genuses.forEach(genus => {
//               rows += `
//               <tr>
//                   <td>${genus.name}</td>
//                   <td>${new Date(genus.updated_at).toLocaleString()}</td>
//                   <td>
//                       <button class="btn btn-warning" onclick="editgenuses('${genus._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
//                       <button class="btn btn-danger" onclick="deletegenuses('${genus._id}')"><i class="fa-solid fa-trash"></i></button>
//                   </td>
//               </tr>
//               `;
//           });
//           document.getElementById(containerId).innerHTML = rows;
//           totalPages = Math.ceil(res.data.total / rowsPerPage);
//           renderPagination(currentPage, totalPages, 'pagination', fetchUserData);
//       } else {
//           console.error('Invalid data format:', res);
//       }
//   }

//   function handleSearch() {
//       const searchInput = document.getElementById('searchInput').value;
//       fetchUserData(1, searchInput); // Bắt đầu tìm kiếm từ trang đầu tiên với từ khóa tìm kiếm
//   }

//   // Thêm sự kiện click cho nút tìm kiếm
//   document.getElementById('searchBtn').addEventListener('click', handleSearch);

//   // Gọi hàm fetchUserData để hiển thị dữ liệu ban đầu
//   fetchUserData(currentPage);
// });

// function renderPagination(currentPage, totalPages, containerId, fetchDataFunction) {
//   const paginationContainer = document.getElementById(containerId);
//   paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại

//   // Tạo nút phân trang cho mỗi trang
//   for (let i = 1; i <= totalPages; i++) {
//       const pageItem = document.createElement('button');
//       pageItem.textContent = i;
//       pageItem.classList.add('btn', 'btn-primary');

//       // Thêm sự kiện click cho từng nút phân trang
//       pageItem.addEventListener('click', function() {
//           // Cập nhật trang hiện tại và gọi hàm fetchDataFunction
//           currentPage = parseInt(this.textContent);
//           fetchDataFunction(currentPage, searchQuery);

//           // Cập nhật lại nút phân trang
//           updatePaginationButtons(currentPage, totalPages, containerId);
//       });

//       // Nếu là trang hiện tại, thêm lớp 'active'
//       if (i === currentPage) {
//           pageItem.classList.add('active');
//       }

//       // Thêm nút phân trang vào container
//       paginationContainer.appendChild(pageItem);
//   }
// }

// function updatePaginationButtons(currentPage, totalPages, containerId) {
//   // Lấy tất cả các nút phân trang
//   const paginationButtons = document.querySelectorAll(`#${containerId} button`);

//   // Loại bỏ lớp 'active' từ tất cả các nút phân trang
//   paginationButtons.forEach(button => {
//       button.classList.remove('active');
//   });

//   // Thêm lớp 'active' cho nút phân trang được nhấp vào
//   paginationButtons[currentPage - 1].classList.add('active');
// }
