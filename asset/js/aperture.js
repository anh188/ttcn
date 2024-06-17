document.addEventListener('DOMContentLoaded', function() {
  const rowsPerPage = 11; // Số mục trên mỗi trang
  let currentPage = 1;
  let totalPages = 1;
  let searchQuery = '';
  let timeoutId; // Khai báo biến timeoutId ở phạm vi toàn cục


  function processUserData(res, containerId) {
    const apertures = res.data.apertures;
    if (apertures && Array.isArray(apertures)) {
        let rows = '';
        apertures.forEach(apertures => {
            rows += `
            <tr>
                <td>${apertures.name}</td>
                <td>${new Date(apertures.updated_at).toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning" onclick="editapertures('${apertures._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteapertures('${apertures._id}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
            `;
        });
        document.getElementById(containerId).innerHTML = rows;
        totalPages = Math.ceil(res.data.total / rowsPerPage);
        renderPagination(currentPage, totalPages, 'pagination', fetchUserData);
    } else {
        console.error('Invalid data format:', res);
    }
}

  function fetchUserData(page, query = '') {
      const token = localStorage.getItem('accessToken');
      fetch(`http://localhost:3456/apertures/?page=${page}&per_page=${rowsPerPage}&field=name&sort_order=asc&q=${searchQuery}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => response.json())
      .then(res => {
          processUserData(res, 'tableRows');
      })
      .catch(error => console.log('Error fetching data:', error));
  }

// Hàm để xóa bộ dữ liệu với ID tương ứng
window.deleteapertures = function(apertureId) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        showNotification('Token không tồn tại, vui lòng đăng nhập lại.');
        return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa bộ dữ liệu này?')) {
        fetch(`http://localhost:3456/apertures/${apertureId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Delete Response:', data);
            if (data.error === false) {
                showNotification('Xóa bộ dữ liệu thành công!');
                fetchUserData(currentPage); // Tải lại dữ liệu sau khi xóa
            } else {
                showNotification(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Error deleting set:', error);
            showNotification('Có lỗi xảy ra, vui lòng thử lại.');
        });
    }
};

document.getElementById('searchInput').addEventListener('input', function() {
  searchQuery = this.value.trim();
  currentPage = 1; // Reset lại trang hiện tại về trang 1 khi tìm kiếm mới
  // Gọi hàm fetchData sau một khoảng thời gian nhất định
  if (timeoutId) {
      clearTimeout(timeoutId); // Hủy bỏ timeout cũ nếu có
  }
  timeoutId = setTimeout(function() {
    fetchUserData(currentPage);
  }, 500); // Độ trễ 700ms
});

// Gọi hàm fetchUserData để hiển thị dữ liệu ban đầu
fetchUserData(currentPage);
const btnSave = document.querySelector('.btn_save_cr_flower');

// Kiểm tra tồn tại của nút lưu
if (btnSave) {
  btnSave.addEventListener('click', function() {
    const apertureName = document.getElementById('aperturename').value.trim();
    if (apertureName === '') {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    
    const userData = {
      name: apertureName
    };
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Token không tồn tại, vui lòng đăng nhập lại.');
      return;
    }

    // Gửi yêu cầu POST đến API với dữ liệu dạng JSON raw
    fetch('http://localhost:3456/apertures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
      if (data.error === false) {
        alert('Thêm loại độ khẩu mới thành công!');
        // Reload lại dữ liệu mới nếu có hàm fetchData
        if (typeof fetchData === 'function') {
          fetchData(recentUrl);
        }
        // Reset lại form nếu form có id là 'flowerForm'
        const flowerForm = document.getElementById('flowerForm');
        if (flowerForm) {
          flowerForm.reset();
        }
      } else {
        alert(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    })
    .catch(error => {
      console.error('Error creating user:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    });
  });
} else {
  console.error('Button with class .btn_save_cr_flower not found.');
}
// fetchUserData(currentPage);
const modal = document.querySelector('.modal_creatfl');
const modalTitle = document.querySelector('.modal-title');
// const btnSave = document.querySelector('.btn_save_cr_flower');
const btnUpdate = document.querySelector('.btn_update_cr_flower');
const btnExit = document.querySelector('.btn_exit_cr_flower');

function openModal() {
    modal.classList.add('modal-open-add');
}

function closeModal() {
    modal.classList.remove('modal-open-add');
    resetForm();
}

function resetForm() {
    const inputField = document.getElementById('aperturename');
    inputField.value = '';
    modalTitle.textContent = 'Thêm hình dáng mới';
    btnSave.style.display = 'inline-block';
    btnUpdate.style.display = 'none';
}

// Xử lý sự kiện khi người dùng nhấp vào nút chỉnh sửa
window.editapertures = function(apertureId) {
    fetch(`http://localhost:3456/apertures/${apertureId}`)
        .then(response => response.json())
        .then(data => {
            const apertureName = data.data;

            // Cập nhật tiêu đề modal
            modalTitle.textContent = 'Chỉnh sửa họ';

            // Cập nhật giá trị của input
            document.getElementById('aperturename').value = apertureName.name;

            // Ẩn nút "Thêm mới", hiển thị nút "Lưu"
            btnSave.style.display = 'none';
            btnUpdate.style.display = 'inline-block'; // Hiển thị nút "Lưu" khi chỉnh sửa

            // Lưu lại id của surname hiện tại
            currentApertureId = apertureId;

            // Mở modal
            openModal();
        })
        .catch(error => {
            console.error('Error fetching set:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        });
      };

      
// Đăng ký sự kiện click cho nút btnUpdate
btnUpdate.addEventListener('click', function() {
  if (currentApertureId === null) return;

  const newName = document.getElementById('aperturename').value;

  // Tạo đối tượng dữ liệu mới cần cập nhật
  const newData = {
      name: newName
      // Thêm các trường dữ liệu khác cần cập nhật nếu có
  };

  fetch(`http://localhost:3456/apertures/${currentApertureId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Update Response:', data);
      // Kiểm tra nếu cập nhật thành công
      if (!data.error) {
          alert('Cập nhật thông tin thành công!');
          // Đóng modal sau khi cập nhật thành công
          closeModal();
          fetchUserData(currentPage); 
      } else {
          alert(data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
  })
  .catch(error => {
      console.error('Error updating set:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
  });
});


// Xử lý sự kiện khi người dùng nhấn vào nút "Lưu" sau khi chỉnh sửa


// Xử lý sự kiện khi người dùng nhấn vào nút "Thoát"
btnExit.addEventListener('click', function() {
    // Đóng modal
    closeModal();
});

// Xử lý sự kiện khi người dùng nhấn vào nút đóng modal
const closeModalBtn = document.querySelector('.modal-close-add');
closeModalBtn.addEventListener('click', function() {
    // Đóng modal
    closeModal();
});
});

function renderPagination(currentPage, totalPages, containerId, fetchDataFunction) {
const paginationContainer = document.getElementById(containerId);
paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại

// Tạo nút phân trang cho mỗi trang
for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('button');
    pageItem.textContent = i;
    pageItem.classList.add('btn', 'btn-primary');

    // Thêm sự kiện click cho từng nút phân trang
    pageItem.addEventListener('click', function() {
        // Cập nhật trang hiện tại và gọi hàm fetchDataFunction
        currentPage = parseInt(this.textContent);
        fetchDataFunction(currentPage);

        // Cập nhật lại nút phân trang
        updatePaginationButtons(currentPage, totalPages, containerId);
    });

    // Nếu là trang hiện tại, thêm lớp 'active'
    if (i === currentPage) {
        pageItem.classList.add('active');
    }

    // Thêm nút phân trang vào container
    paginationContainer.appendChild(pageItem);
}
}

function updatePaginationButtons(currentPage, totalPages, containerId) {
// Lấy tất cả các nút phân trang
const paginationButtons = document.querySelectorAll(`#${containerId} button`);

// Loại bỏ lớp 'active' từ tất cả các nút phân trang
paginationButtons.forEach(button => {
    button.classList.remove('active');
});

// Thêm lớp 'active' cho nút phân trang được nhấp vào
paginationButtons[currentPage - 1].classList.add('active');
}

// Hàm hiển thị thông báo dạng notification
function showNotification(message) {
const notification = document.getElementById('notification');
notification.textContent = message;
notification.style.display = 'block';
setTimeout(() => {
    notification.style.display = 'none';
}, 3000);
}