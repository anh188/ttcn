document.addEventListener('DOMContentLoaded', function () {
  let currentFlowerId = null; // Biến toàn cục để lưu trữ flowerId hiện tại
  const saveButton = document.querySelector('.btn_update_cr_flower');
  const flowerFilesArray = [];
  const pollenFilesArray = [];
  const existingFlowerImages = [];
  const existingPollenImages = [];

  window.editFlower = function (flowerId) {
    currentFlowerId = flowerId; // Lưu flowerId vào biến toàn cục
    fetch(`http://localhost:3456/flowers/${flowerId}`)
      .then(response => response.json())
      .then(data => {
        const flowerData = data.data;

        // Cập nhật tiêu đề modal
        document.querySelector('.modal-title').textContent = 'Chỉnh sửa thông tin hoa';

        // Điền dữ liệu vào các trường input
        document.getElementById('common-name').value = flowerData.name;
        document.getElementById('scientific-name').value = flowerData.science_name;
        document.getElementById('pollen-size').value = flowerData.size;
        
        // Lưu trữ ID vào các trường ẩn
        document.getElementById('order-id').value = flowerData.set_id._id;
        document.getElementById('family-id').value = flowerData.surname_id._id;
        document.getElementById('genus-id').value = flowerData.genus_id._id;
        document.getElementById('pollen-shape-id').value = flowerData.shape_id._id;
        document.getElementById('pollen-surface-id').value = flowerData.surface_id._id;
        document.getElementById('part-id').value = flowerData.part_id._id;
        document.getElementById('aperture-type-id').value = flowerData.aperture_id._id;
        
         // Hiển thị tên tương ứng với ID (tùy chọn, nếu cần hiển thị)
         document.getElementById('order').value = flowerData.set_id.name;
         document.getElementById('family').value = flowerData.surname_id.name;
         document.getElementById('genus').value = flowerData.genus_id.name;
         document.getElementById('pollen-shape').value = flowerData.shape_id.name;
         document.getElementById('pollen-surface').value = flowerData.surface_id.name;
         document.getElementById('part').value = flowerData.part_id.name;
         document.getElementById('aperture-type').value = flowerData.aperture_id.name;
        document.getElementById('downloadlink_fl').value = flowerData.downloadlink;
        document.getElementById('characteristics').value = flowerData.characteristics;

        // Hiển thị và cho phép xóa các ảnh hiện có
        existingFlowerImages.length = 0;
        existingPollenImages.length = 0;
        existingFlowerImages.push(...flowerData.flower_images);
        existingPollenImages.push(...flowerData.pollen_grain_images);
        displayExistingImages('flower', existingFlowerImages);
        displayExistingImages('pollen', existingPollenImages);

        // Mở modal
        document.querySelector('.modal_creatfl').classList.add('modal-open-add');
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu hoa:', error);
      });
  };

  function displayExistingImages(type, images) {
    const previewContainer = document.getElementById(`${type}-image-preview`);
    previewContainer.innerHTML = '';

    // Hiển thị ảnh hiện có
    images.forEach((image, index) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const img = document.createElement('img');
      img.src = `http://localhost:3456/static/${image}`;
      img.alt = `${type} Image`;
      img.classList.add('selected-image');
      img.dataset.existing = image;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', function () {
        images.splice(index, 1);
        displayExistingImages(type, images);
      });

      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteBtn);
      previewContainer.appendChild(imageContainer);
    });
  }

  function updatePreview(type, filesArray, existingImages) {
    const previewContainer = document.getElementById(`${type}-image-preview`);
    previewContainer.innerHTML = '';

    // Hiển thị ảnh hiện có
    existingImages.forEach((image, index) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const img = document.createElement('img');
      img.src = `http://localhost:3456/static/${image}`;
      img.alt = `${type} Image`;
      img.classList.add('selected-image');
      img.dataset.existing = image;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', function () {
        existingImages.splice(index, 1);
        updatePreview(type, filesArray, existingImages);
      });

      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteBtn);
      previewContainer.appendChild(imageContainer);
    });

    // Hiển thị ảnh mới
    filesArray.forEach((file, index) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = `${type} Image`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', function () {
        filesArray.splice(index, 1);
        URL.revokeObjectURL(img.src); // Giải phóng bộ nhớ
        updatePreview(type, filesArray, existingImages);
      });

      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteBtn);
      previewContainer.appendChild(imageContainer);
    });
  }

  function handleFileInput(type, filesArray, existingImages) {
    const inputElement = document.getElementById(`${type}-image`);
    inputElement.addEventListener('change', function (event) {
      const newFiles = Array.from(event.target.files);
      filesArray.push(...newFiles);
      updatePreview(type, filesArray, existingImages);
    });
  }

  handleFileInput('flower', flowerFilesArray, existingFlowerImages);
  handleFileInput('pollen', pollenFilesArray, existingPollenImages);

  function closeModal() {
    document.querySelector('.modal_creatfl').classList.remove('modal-open-add');
  }

  document.querySelector('.modal-close-add').addEventListener('click', closeModal);
  document.querySelector('.btn_exit_cr_flower').addEventListener('click', closeModal);
  document.querySelector('.js-modal-container').addEventListener('click', function (event) {
    event.stopPropagation();
  });
  document.querySelector('.modal_creatfl').addEventListener('click', closeModal);

  saveButton.addEventListener('click', async function () {
    const formData = new FormData();
    formData.append('name', document.getElementById('common-name').value);
    formData.append('science_name', document.getElementById('scientific-name').value);
    formData.append('size', document.getElementById('pollen-size').value);
    formData.append('set_id', document.getElementById('order-id').value);
    formData.append('surname_id', document.getElementById('family-id').value);
    formData.append('genus_id', document.getElementById('genus-id').value);
    formData.append('shape_id', document.getElementById('pollen-shape-id').value);
    formData.append('surface_id', document.getElementById('pollen-surface-id').value);
    formData.append('part_id', document.getElementById('part-id').value);
    formData.append('aperture_id', document.getElementById('aperture-type-id').value);
    formData.append('downloadlink', document.getElementById('downloadlink_fl').value);
    const characteristics = document.getElementById('characteristics').value;
    if (characteristics !== '') {
      formData.append('characteristics', characteristics);
    }

    // Add new flower images to FormData if there are new images
    flowerFilesArray.forEach(file => {
      formData.append('flower_images', file);
    });

    // Add new pollen images to FormData if there are new images
    pollenFilesArray.forEach(file => {
      formData.append('pollen_grain_images', file);
    });

    // Add existing images back to FormData
    for (const image of existingFlowerImages) {
      const file = await urlToFile(`http://localhost:3456/static/${image}`, image);
      formData.append('flower_images', file);
    }

    for (const image of existingPollenImages) {
      const file = await urlToFile(`http://localhost:3456/static/${image}`, image);
      formData.append('pollen_grain_images', file);
    }
    // Gửi yêu cầu đến API
    fetch(`http://localhost:3456/flowers/${currentFlowerId}`, {
      method: 'PUT',
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

  async function urlToFile(url, filename) {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: 'image/jpeg' });
  }
});