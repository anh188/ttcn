document.addEventListener('DOMContentLoaded', function() {
  function setupImagePreview(inputElement, previewContainer, filesArray) {
    inputElement.addEventListener('change', function(event) {
      const newFiles = Array.from(event.target.files);

      // Kiểm tra số lượng ảnh được thêm vào, nếu vượt quá 5 thì thông báo và return
      // if (newFiles.length + filesArray.length > 5) {
      //   alert('Bạn chỉ được tải lên tối đa 5 ảnh!');
      //   return;
      // }

      // Thêm các file mới vào mảng
      filesArray.push(...newFiles);
      updatePreview();
      updateInputElement();
    });

    function updatePreview() {
      previewContainer.innerHTML = '';

      filesArray.forEach((file, index) => {
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
          filesArray.splice(index, 1);
          URL.revokeObjectURL(img.src); // Giải phóng bộ nhớ
          updatePreview();
          updateInputElement();
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(deleteBtn);
        previewContainer.appendChild(imageContainer);
      });
    }

    function updateInputElement() {
      const dataTransfer = new DataTransfer();
      filesArray.forEach(file => dataTransfer.items.add(file));
      inputElement.files = dataTransfer.files;
    }
  }

  const flowerFilesArray = [];
  const pollenFilesArray = [];

  const flowerImageInput = document.getElementById('flower-image');
  const flowerImagePreview = document.getElementById('flower-image-preview');
  const pollenImageInput = document.getElementById('pollen-image');
  const pollenImagePreview = document.getElementById('pollen-image-preview');

  setupImagePreview(flowerImageInput, flowerImagePreview, flowerFilesArray);
  setupImagePreview(pollenImageInput, pollenImagePreview, pollenFilesArray);
});