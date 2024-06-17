document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const rowsPerPage = 5;
  let currentPage = 1;
  let totalPages = 0; // Khai báo biến totalPages ở phạm vi toàn cục
  let timeoutId; // Khai báo biến timeoutId ở phạm vi toàn cục

  function fetchAndDisplayFlowers(query = '', page = 1) {
    let url = `http://localhost:3456/flowers/?page=${page}&per_page=${rowsPerPage}&field=name&sort_order=asc`;
      // let url = `http://localhost:3456/flowers/?page=${page}&per_page=10&field=name&sort_order=asc`;
      if (query) {
          url += `&q=${encodeURIComponent(query)}`;
      }

      fetch(url)
          .then(response => response.json())
          .then(res => {
              const data = res.data.flowers;
              if (data && Array.isArray(data)) {
                  let rows = '';
                  data.forEach(flower => {
                      rows += `
                          <tr>
                              <td><img src="${flower.flower_images[0] || './asset/IMG_5148.JPG'}" alt="${flower.name}" style="width: 110px; height: 120px; object-fit: cover"></td>
                              <td>${flower.name}</td>
                              <td>${flower.science_name}</td>
                              <td>${flower.size}</td>
                              <td>${flower.set_id ? flower.set_id.name : ''}</td>
                              <td>${flower.surname_id ? flower.surname_id.name : ''}</td>
                              <td>${flower.genus_id ? flower.genus_id.name : ''}</td>
                              <td>${flower.shape_id ? flower.shape_id.name : ''}</td>
                              <td>${flower.surface_id ? flower.surface_id.name : ''}</td>                          
                              <td>${flower.aperture_id ? flower.aperture_id.name : ''}</td>
                              <td><img src="${flower.pollen_grain_images[0] || './asset/default_pollen.jpg'}" alt="${flower.name}" style="width: 110px; height: 120px; object-fit: cover"></td>
                              <td>${new Date(flower.updated_at).toLocaleString()}</td>
                              <td>
                                  <button class="btn btn-warning" style="margin-bottom: 5px" onclick="editFlower('${flower._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                                  <button class="btn btn-danger" onclick="confirmDelete('${flower._id}')"><i class="fa-solid fa-trash"></i></button>
                              </td>
                          </tr>
                      `;
                  });
                  document.getElementById('tableRows').innerHTML = rows;
                  // Cập nhật tổng số trang dựa trên số lượng hoa trả về và số hàng mỗi trang
                  totalPages = Math.ceil(res.data.total / rowsPerPage);
                  renderPagination();

              } else {
                  console.error('Invalid data format:', res);
              }
          })
          .catch(error => console.log('Error fetching data:', error));
  }

  function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Xóa các nút trang cũ

    // Nếu tổng số trang nhỏ hơn hoặc bằng 5, hiển thị tất cả các trang
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            let pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            let pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                fetchAndDisplayCurrentPage(searchInput.value.trim(), currentPage);
                document.querySelector('.management_rg').scrollIntoView({
                    block: 'start',
                    behavior: 'auto'
                });
            });

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    } else {
        // Nếu tổng số trang lớn hơn 5, hiển thị các trang với dấu "..." ở các vị trí phù hợp
        let startPage, endPage;
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }

        for (let i = startPage; i <= endPage; i++) {
            let pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            let pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                fetchAndDisplayCurrentPage(searchInput.value.trim(), currentPage);
                document.querySelector('.management_rg').scrollIntoView({
                    block: 'start',
                    behavior: 'auto'
                });
            });

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }
}

function fetchAndDisplayCurrentPage(query = '') {
  fetchAndDisplayFlowers(query, currentPage);
}

fetchAndDisplayCurrentPage();

searchInput.addEventListener('input', function() {
  currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm

  // Hủy bỏ timeout cũ nếu có
  if (timeoutId) {
      clearTimeout(timeoutId);
  }

  // Tạo timeout mới
  timeoutId = setTimeout(function() {
      fetchAndDisplayCurrentPage(searchInput.value.trim());
  }, 700); //độ tr
});
});
