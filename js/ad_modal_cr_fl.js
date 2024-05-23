document.addEventListener("DOMContentLoaded", function() {
  
 
    // Tìm phần tử button với ID addFlowerBtn
    const addFlowerBtn = document.getElementById('addFlowerBtn');
    // Tìm phần tử modal với class modal_creatfl
    const modal = document.querySelector('.modal_creatfl');
    const modalContainer= document.querySelector('.js-modal-container')
    // Thêm sự kiện click cho button
    addFlowerBtn.addEventListener('click', function() {
        // Thêm class modal-open-add vào modal
        modal.classList.add('modal-open-add');
    });

    // Tìm phần tử để đóng modal và thêm sự kiện click cho nó
    const closeModalBtn = document.querySelector('.modal-close-add');
    closeModalBtn.addEventListener('click', function() {
        // Xóa class modal-open-add khỏi modal để đóng modal
        modal.classList.remove('modal-open-add');
    });
    modal.addEventListener('click', function() {
      // Xóa class modal-open-add khỏi modal để đóng modal
      modal.classList.remove('modal-open-add');
  });
    modalContainer.addEventListener('click', function(event){
      event.stopPropagation();
    })


    const btnExit = document.querySelector('.btn_exit_cr_flower');
    btnExit.addEventListener('click', function() {
      // Xóa dữ liệu đã nhập trong form
      const inputFields = document.querySelectorAll('.modal-input');
      inputFields.forEach(field => {
          field.value = '';
      });
    
      // Xóa dữ liệu đã chọn từ gợi ý
      const suggestions = document.querySelectorAll('.suggestions');
      suggestions.forEach(suggestion => {
          suggestion.innerHTML = '';
      });
      modal.classList.remove('modal-open-add');
    
    });
      

        // Lấy các gợi ý cho các đầu vào khác nhau
        const fetchPromises = [
          fetchSuggestions('sets', 'order'),
          fetchSuggestions('surnames', 'family'),
          fetchSuggestions('genuses', 'genus'),
          fetchSuggestions('shapes', 'pollen-shape'),
          fetchSuggestions('surfaces', 'pollen-surface'),
          fetchSuggestions('parts', 'part'),
          fetchSuggestions('apertures', 'aperture-type')
      ];
  
      // Xử lý các lỗi khi lấy gợi ý
      Promise.all(fetchPromises)
                .catch(error => console.error('Error fetching data:', error));
              
  
      // Xử lý sự kiện click trên nút lưu
      const btnSave = document.querySelector('.btn_save_cr_flower');
      btnSave.addEventListener('click', function() {
          // Lấy dữ liệu từ các trường đầu vào
          const commonName = document.getElementById('common-name').value.trim();
          const scientificName = document.getElementById('scientific-name').value.trim();
          const pollenSize = document.getElementById('pollen-size').value.trim();
  
          // Kiểm tra dữ liệu hợp lệ
    if (commonName === '' || scientificName === '' || pollenSize === '') {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
  }
          
       // Get Lấy ID từ các gợi ý đã chọn
      const orderID = getIdFromInput('sets', 'order');
      const familyID = getIdFromInput('surnames', 'family');
      const genusID = getIdFromInput('genuses', 'genus');
      const pollenShapeID = getIdFromInput('shapes', 'pollen-shape');
      const pollenSurfaceID = getIdFromInput('surfaces', 'pollen-surface');
      const partID = getIdFromInput('parts', 'part');
      const apertureTypeID = getIdFromInput('apertures', 'aperture-type');
  
      // Tạo payload để gửi
      const formData = new FormData();
      formData.append('name', commonName);
      formData.append('science_name', scientificName);
      formData.append('size', pollenSize);
      formData.append('set_id', orderID);
      formData.append('surface_id', familyID);
      formData.append('genus_id', genusID);
      formData.append('shape_id', pollenShapeID);
      formData.append('surname_id', pollenSurfaceID);
      formData.append('part_id', partID);
      formData.append('aperture_id', apertureTypeID);
  
          // Thêm ảnh hoa vào formData
          const flowerImage = document.getElementById('flower-image').files;
          for (let i = 0; i < flowerImage.length; i++) {
              formData.append('flower_images', flowerImage[i]);
          }
  
          // Thêm ảnh hạt phấn vào formData
          const pollenImage = document.getElementById('pollen-image').files;
          for (let i = 0; i < pollenImage.length; i++) {
              formData.append('pollen_grain_images', pollenImage[i]);
          }
  
          // Gửi yêu cầu POST đến API
          fetch('http://localhost:3456/flowers/', {
              method: 'POST',
              body: formData
          })
          .then(response => response.json())
          .then(data => {
              // Xử lý dữ liệu phản hồi từ API (nếu cần)
              console.log('Created successfully:', data);
              const inputFields = document.querySelectorAll('.modal-input');
          inputFields.forEach(field => {
              field.value = '';
          });
        
          // Xóa dữ liệu đã chọn từ gợi ý
          const suggestions = document.querySelectorAll('.suggestions');
          suggestions.forEach(suggestion => {
              suggestion.innerHTML = '';
          });
          modal.classList.remove('modal-open-add');
              // Thực hiện các hành động khác sau khi tạo thành công (nếu cần)
          })
          .catch(error => {
              console.error('Error creating:', error);
              // Xử lý lỗi (nếu cần)
          });


          
      });
          
});

 