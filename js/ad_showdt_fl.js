document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const rowsPerPage = 8;
  let currentPage = 1;

  function fetchAndDisplayFlowers(query = '', page = 1) {
      let url = `http://localhost:3456/flowers/?page=${page}&per_page=100&field=name&sort_order=asc`;
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
                              <td><img src="${flower.flower_images[0] || './asset/IMG_5148.JPG'}" alt="${flower.name}" style="width: 110px; height: 150px;"></td>
                              <td>${flower.name}</td>
                              <td>${flower.science_name}</td>
                              <td>${flower.size}</td>
                              <td>${flower.set_id ? flower.set_id.name : ''}</td>
                              <td>${flower.surname_id ? flower.surname_id.name : ''}</td>
                              <td>${flower.genus_id ? flower.genus_id.name : ''}</td>
                              <td>${flower.part_id ? flower.part_id.name : ''}</td>
                              <td>${flower.aperture_id ? flower.aperture_id.name : ''}</td>
                              <td><img src="${flower.pollen_grain_images[0] || './asset/default_pollen.jpg'}" alt="${flower.name}" style="width: 110px; height: 150px;"></td>
                              <td>${new Date(flower.updated_at).toLocaleString()}</td>
                              <td>
                                  <button class="btn btn-warning" onclick="editFlower('${flower._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                                  <button class="btn btn-danger" onclick="confirmDelete('${flower._id}')"><i class="fa-solid fa-trash"></i></button>
                              </td>
                          </tr>
                      `;
                  });
                  document.getElementById('tableRows').innerHTML = rows;
              } else {
                  console.error('Invalid data format:', res);
              }
          })
          .catch(error => console.log('Error fetching data:', error));
  }

  fetchAndDisplayFlowers();

  searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim();
      fetchAndDisplayFlowers(query, currentPage);
  });
});