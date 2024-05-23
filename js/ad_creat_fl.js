// Lắng nghe sự kiện "change" trên các input file
document.getElementById('flower-image').addEventListener('change', function(event) {
  // Xóa nội dung hiện tại trong phần tử hiển thị ảnh
  document.getElementById('flower-image-preview').innerHTML = '';

  // Kiểm tra xem người dùng có chọn quá 5 ảnh không
  if (event.target.files.length > 5) {
    alert('Bạn chỉ được tải lên tối đa 5 ảnh!');
    return;
  }

  // Lặp qua các tập tin đã chọn
  for (let i = 0; i < event.target.files.length; i++) {
    // Tạo một phần tử div chứa ảnh và nút xóa
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Tạo phần tử img để hiển thị ảnh
    let img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[i]);

    // Tạo nút "X" để xóa ảnh
    let deleteBtn = document.createElement('div');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      imageContainer.remove();
    });

    // Thêm nút xóa vào phần tử div chứa ảnh
    imageContainer.appendChild(img);
    imageContainer.appendChild(deleteBtn);

    // Thêm phần tử div vào phần tử hiển thị ảnh
    document.getElementById('flower-image-preview').appendChild(imageContainer);
  }
});


const inputElement = document.getElementById('pollen-size');
  const addMicronButton = document.getElementById('add-micron');
  
  addMicronButton.addEventListener('click', function() {
      // Thêm "µm" vào input nếu chưa tồn tại
      if (!inputElement.value.includes('µm')) {
          inputElement.value += ' µm';
      }
  }); 

// Lắng nghe sự kiện "change" trên các input file
const flowerImageInput = document.getElementById('flower-image');
const flowerImagePreview = document.getElementById('flower-image-preview');
const pollenImageInput = document.getElementById('pollen-image');
const pollenImagePreview = document.getElementById('pollen-image-preview');

const maxImageCount = 5;

function addImageContainer(event, previewContainer) {
  // Xóa nội dung hiện tại trong phần tử hiển thị ảnh
  previewContainer.innerHTML = '';

  // Lặp qua các tập tin đã chọn
  for (let i = 0; i < event.target.files.length; i++) {
    // Tạo một phần tử div chứa ảnh và nút xóa
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Tạo phần tử img để hiển thị ảnh
    let img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[i]);

    // Tạo nút "X" để xóa ảnh
    let deleteBtn = document.createElement('div');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
      // Xóa phần tử div chứa ảnh khỏi danh sách
      imageContainer.remove();
      previewContainer.childElementCount--;
    });

    // Thêm nút xóa vào phần tử div chứa ảnh
    imageContainer.appendChild(img);
    imageContainer.appendChild(deleteBtn);

    // Thêm phần tử div vào phần tử hiển thị ảnh
    previewContainer.appendChild(imageContainer);
  }

  // Kiểm tra số lượng ảnh đã tải lên
  if (previewContainer.childElementCount > maxImageCount) {
    alert('Chỉ được tải lên tối đa 5 ảnh.');
    while (previewContainer.childElementCount > maxImageCount) {
      previewContainer.removeChild(previewContainer.lastChild);
    }
  }
}

flowerImageInput.addEventListener('change', (event) => addImageContainer(event, flowerImagePreview));
pollenImageInput.addEventListener('change', (event) => addImageContainer(event, pollenImagePreview));
