document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.querySelector('.btn_save_cr_flower');

  // Hàm để mở modal và điền các trường dữ liệu
  window.editFlower = function (flowerId) {
    fetch(`http://localhost:3456/flowers/${flowerId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const flowerData = data.data;

        // Cập nhật tiêu đề modal
        const modalTitle = document.querySelector('.modal-title');
        if (modalTitle) {
          modalTitle.textContent = 'Chỉnh sửa thông tin hoa';
          saveButton.classList.remove('btn_save_cr_flower');
          saveButton.classList.add('btn_save_up_flower');
        } else {
          console.error('Không tìm thấy phần tử tiêu đề modal');
          return;
        }

        // Thay đổi class của nút "Lưu"
        saveButton.classList.remove('btn_save_cr_flower');
        saveButton.classList.add('btn_save_up_flower');

        // Điền dữ liệu vào các trường input
        document.getElementById('common-name').value = flowerData.name;
        document.getElementById('scientific-name').value = flowerData.science_name;
        document.getElementById('pollen-size').value = flowerData.size;
        document.getElementById('order').value = flowerData.set_id.name;
        document.getElementById('family').value = flowerData.surname_id.name;
        document.getElementById('genus').value = flowerData.genus_id.name;
        document.getElementById('pollen-shape').value = flowerData.shape_id.name;
        document.getElementById('pollen-surface').value = flowerData.surface_id.name;
        document.getElementById('part').value = flowerData.part_id.name;
        document.getElementById('aperture-type').value = flowerData.aperture_id.name;

        // Hiển thị ảnh phấn hoa
        const pollenImagePreview = document.getElementById('pollen-image-preview');
        pollenImagePreview.innerHTML = '';
        flowerData.pollen_grain_images.forEach(image => {
          const img = document.createElement('img');
          img.src = image;
          img.alt = 'Pollen Image';
          pollenImagePreview.appendChild(img);
        });

        // Hiển thị hình ảnh hoa
        const flowerImagePreview = document.getElementById('flower-image-preview');
        flowerImagePreview.innerHTML = '';
        flowerData.flower_images.forEach(image => {
          const img = document.createElement('img');
          img.src = image;
          img.alt = 'Flower Image';
          flowerImagePreview.appendChild(img);
        });

        // Thêm sự kiện preview hình ảnh
        const pollenImageInput = document.getElementById('pollen-image');
        if (pollenImageInput) {
          pollenImageInput.addEventListener('change', previewImage);
        }

        // Mở modal
        const modal = document.querySelector('.modal_creatfl');
        if (modal) {
          modal.classList.add('modal-open-add');
        } else {
          console.error('Không tìm thấy phần tử modal');
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu hoa:', error);
      });
  };

  // Hàm preview hình ảnh
  function previewImage(event) {
    const preview = document.getElementById('pollen-image-preview');
    preview.innerHTML = ''; // Xóa hình ảnh hiện tại (nếu có)

    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        img.classList.add('selected-image');
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }

  // Hàm đóng modal
  function closeModal() {
    const modal = document.querySelector('.modal_creatfl');
    if (modal) {
      modal.classList.remove('modal-open-add');
    }
  }

  // Đóng modal khi nút đóng được nhấn
  const closeModalBtn = document.querySelector('.modal-close-add');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Đóng modal khi nhấn nút thoát
  const exitBtn = document.querySelector('.btn_exit_cr_flower');
  if (exitBtn) {
    exitBtn.addEventListener('click', closeModal);
  }

  // Ngăn không đóng modal khi nhấn vào bên trong container modal
  const modalContainer = document.querySelector('.js-modal-container');
  if (modalContainer) {
    modalContainer.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }

  // Đóng modal khi nhấn vào bên ngoài container modal
  const modal = document.querySelector('.modal_creatfl');
  if (modal) {
    modal.addEventListener('click', closeModal);
  }

  // Xử lý sự kiện nhấn nút lưu
  saveButton.addEventListener('click', function () {
    const isUpdate = saveButton.classList.contains('btn_save_up_flower');

    // Tạo formData từ các trường input
    const formData = new FormData();
    formData.append('common-name', document.getElementById('common-name').value);
    formData.append('scientific-name', document.getElementById('scientific-name').value);
    formData.append('pollen-size', document.getElementById('pollen-size').value);
    formData.append('order', document.getElementById('order').value);
    formData.append('family', document.getElementById('family').value);
    formData.append('genus', document.getElementById('genus').value);
    formData.append('pollen-shape', document.getElementById('pollen-shape').value);
    formData.append('pollen-surface', document.getElementById('pollen-surface').value);
    formData.append('part', document.getElementById('part').value);
    formData.append('aperture-type', document.getElementById('aperture-type').value);

    let url = 'http://localhost:3456/flowers/';
    let method = 'POST';

    if (isUpdate) {
      // Nếu đang ở chế độ cập nhật, thay đổi URL và phương thức thành PUT
      const flowerId = saveButton.getAttribute('data-flower-id'); // Lấy ID của hoa từ thuộc tính data
      url += flowerId;
      method = 'PUT';
    }

    // Gửi yêu cầu đến API
    fetch(url, {
      method: method,
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Có lỗi khi cập nhật hoa');
        }
        console.log('Đã cập nhật hoa thành công');
        closeModal(); // Đóng modal
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật hoa:', error);
      });
  });
});