fetch('http://localhost:3456/flowers/?page=1&per_page=100&field=name&sort_order=asc')
  .then(response => response.json())
  .then(data => {
    const flowers = data.data.flowers;
    const galleryContainer = document.getElementById('gallery');

    // Tạo phần tử cho mỗi cây và thêm vào galleryContainer
    flowers.forEach(flower => {
      const div = document.createElement('div');
      div.classList.add('gallery-item');
      const a = document.createElement('a');
      a.href = './details.html';
      a.setAttribute('data-bo', flower.set_id.name);
      a.setAttribute('data-ho', flower.surname_id.name);
      a.setAttribute('data-kich-thuoc', flower.size);

      const img = document.createElement('img');
      img.src = flower.flower_images[0] || './asset/IMG_5148.JPG'; // Sử dụng hình ảnh mặc định nếu không có hình ảnh
      // img.alt = flower.name;

      const h3 = document.createElement('h3');
      h3.textContent = flower.name;

      a.appendChild(img);
      a.appendChild(h3);
      div.appendChild(a);
      galleryContainer.appendChild(div);
    });
  })
  .catch(error => console.error('Error fetching data:', error));