document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('add-micron').addEventListener('click', () => {
    const pollenSizeInput = document.getElementById('pollen-size');
    pollenSizeInput.value += ' µm';
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
          const characteristics = document.getElementById('characteristics').value.trim();
          const downloadlink = document.getElementById('downloadlink_fl').value.trim();
  
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
      if (characteristics !== '') {
        formData.append('characteristics', characteristics);
    } 
    if (downloadlink !== '') {
      formData.append('downloadlink', downloadlink);
  }
      formData.append('set_id', orderID);
      formData.append('surname_id', familyID);
      formData.append('genus_id', genusID);
      formData.append('shape_id', pollenShapeID);
      formData.append('surface_id', pollenSurfaceID);
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
            if (data.success) {
              showNotification('Thêm hoa mới thành công!');
              // Reload lại dữ liệu mới
              fetchData(recentUrl);
              flowerForm.reset(); // Reset lại form
            } else {
              // alert('Có lỗi xảy ra, vui lòng thử lại.');
            }
              // Xử lý dữ liệu phản hồi từ API (nếu cần)
              console.log('Created successfully:', data);
              const inputFields = document.querySelectorAll('.modal-input');
          inputFields.forEach(field => {
              field.value = '';
          });
              // // Xử lý dữ liệu phản hồi từ API (nếu cần)
              // console.log('Created successfully:', data);
          //     const inputFields = document.querySelectorAll('.modal-input');
          // inputFields.forEach(field => {
          //     field.value = '';
          // });
        
          // Xóa dữ liệu đã chọn từ gợi ý
          const suggestions = document.querySelectorAll('.suggestions');
          suggestions.forEach(suggestion => {
              suggestion.innerHTML = '';
          });
          modal.classList.remove('modal-open-add');
              // Thực hiện các hành động khác sau khi tạo thành công (nếu cần)
          })
          .catch(error => {
            console.error('Error adding new flower:', error);
            showNotification('Có lỗi xảy ra, vui lòng thử lại.');
          });


          
      });
          
});


function showNotification(message) {
  const notification = document.getElementById('notificationcr');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
      notification.style.display = 'none';
  }, 1000);
}

 