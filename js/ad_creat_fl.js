document.addEventListener('DOMContentLoaded', function() {
  function setupImagePreview(inputElement, previewContainer) {
    let filesArray = [];

    inputElement.addEventListener('change', function(event) {
      // Xóa nội dung hiện tại trong phần tử hiển thị ảnh
      previewContainer.innerHTML = '';

      // Lấy các file đã chọn
      const files = Array.from(event.target.files);

      // Kiểm tra xem người dùng có chọn quá 5 ảnh không
      if (files.length + filesArray.length > 5) {
        alert('Bạn chỉ được tải lên tối đa 5 ảnh!');
        return;
      }

      // Thêm các file mới vào mảng
      filesArray = filesArray.concat(files);

      // Lặp qua các tập tin đã chọn
      filesArray.forEach((file, index) => {
        // Tạo một phần tử div chứa ảnh và nút xóa
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        // Tạo phần tử img để hiển thị ảnh
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        // Tạo nút "X" để xóa ảnh
        let deleteBtn = document.createElement('div');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
          // Xóa ảnh khỏi mảng filesArray và cập nhật hiển thị
          filesArray.splice(index, 1);
          updatePreview();
        });

        // Thêm nút xóa vào phần tử div chứa ảnh
        imageContainer.appendChild(img);
        imageContainer.appendChild(deleteBtn);

        // Thêm phần tử div vào phần tử hiển thị ảnh
        previewContainer.appendChild(imageContainer);
      });

      // Cập nhật lại hiển thị
      function updatePreview() {
        previewContainer.innerHTML = '';
        filesArray.forEach((file, index) => {
          let imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');

          let img = document.createElement('img');
          img.src = URL.createObjectURL(file);

          let deleteBtn = document.createElement('div');
          deleteBtn.textContent = 'X';
          deleteBtn.classList.add('delete-btn');
          deleteBtn.addEventListener('click', function() {
            filesArray.splice(index, 1);
            updatePreview();
          });

          imageContainer.appendChild(img);
          imageContainer.appendChild(deleteBtn);
          previewContainer.appendChild(imageContainer);
        });
      }
    });
  }

  const flowerImageInput = document.getElementById('flower-image');
  const flowerImagePreview = document.getElementById('flower-image-preview');
  const pollenImageInput = document.getElementById('pollen-image');
  const pollenImagePreview = document.getElementById('pollen-image-preview');

  setupImagePreview(flowerImageInput, flowerImagePreview);
  setupImagePreview(pollenImageInput, pollenImagePreview);
});