document.addEventListener('DOMContentLoaded', function() {
  const tableRows = document.getElementById('tableRows');
  const paginationContainer = document.getElementById('paginationContainer');

  // Số lượng items trên mỗi trang
  const itemsPerPage = 5;
  // Số trang hiện tại
  let currentPage = 1;

  // Lấy dữ liệu user từ API
  function fetchUsers(page) {
      fetch(`http://localhost:3456/sets/?page=${page}&per_page=${itemsPerPage}&field=name&sort_order=asc`)
          .then(response => response.json())
          .then(data => {
              // Xử lý dữ liệu trả về và hiển thị trên bảng
              displayUsers(data.users);

              // Tính toán và hiển thị phân trang
              const totalPages = Math.ceil(data.total / itemsPerPage);
              displayPagination(totalPages);
          })
          .catch(error => console.error('Error fetching user data:', error));
  }

  // Hiển thị dữ liệu user trên bảng
  function displayUsers(users) {
      let rows = '';
      users.forEach(user => {
          rows += `
              <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.updated_at}</td>
              </tr>
          `;
      });
      tableRows.innerHTML = rows;
  }

  // Hiển thị phân trang
  function displayPagination(totalPages) {
      let pagination = '';
      for (let i = 1; i <= totalPages; i++) {
          pagination += `<li class="page-item ${i === currentPage ? 'active' : ''}"><button class="page-link" onclick="changePage(${i})">${i}</button></li>`;
      }
      paginationContainer.innerHTML = `
          <nav aria-label="Page navigation">
              <ul class="pagination">
                  ${pagination}
              </ul>
          </nav>
      `;
  }

  // Thay đổi trang khi người dùng click vào nút phân trang
  window.changePage = function(page) {
      currentPage = page;
      fetchUsers(page);
  };

  // Load trang đầu tiên khi trang được tải
  fetchUsers(currentPage);
});