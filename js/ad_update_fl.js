  // let saveButton = document.querySelector('.btn_save_cr_flower');

  // // document.addEventListener('DOMContentLoaded', function() {
  //   window.addEventListener('load',function(){
  //   // Hàm để mở modal và điền các trường dữ liệu
  //   window.editFlower = function(flowerId) {
  //     fetch(`http://localhost:3456/flowers/${flowerId}`)
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log(data)
  //           const flowerData = data.data
  //             // Đảm bảo phần tử tiêu đề modal tồn tại trước khi cập nhật
  //             const modalTitle = document.querySelector('.modal-title');
  //             if (modalTitle) {
  //                 modalTitle.textContent = 'Chỉnh sửa thông tin hoa';
  //             } else {
  //                 console.error('Không tìm thấy phần tử tiêu đề modal');
  //                 return;
  //             }

  //              // Thay đổi class của nút "Lưu"
  //              saveButton.classList.remove('btn_save_cr_flower');
  //              saveButton.classList.add('btn_save_up_flower');

  //             // Đảm bảo các trường input tồn tại trước khi điền dữ liệu
  //             document.getElementById('common-name').value = flowerData.name;
  //             document.getElementById('scientific-name').value = flowerData.science_name;
  //             document.getElementById('pollen-size').value = flowerData.size;
  //             document.getElementById('order').value = flowerData.set_id.name;
  //             document.getElementById('family').value = flowerData.surname_id.name;
  //             document.getElementById('genus').value = flowerData.genus_id.name;
  //             document.getElementById('pollen-shape').value = flowerData.shape_id.name;
  //             document.getElementById('pollen-surface').value = flowerData.surface_id.name;
  //             document.getElementById('part').value = flowerData.part_id.name;
  //             document.getElementById('aperture-type').value = flowerData.aperture_id.name;

  //             // Hiển thị ảnh hoa
  // const pollenImagePreview = document.getElementById('pollen-image-preview');
  // flowerData.pollen_grain_images.forEach(image => {
  //   const img = document.createElement('img');
  //   img.src = image;
  //   img.alt = 'Pollen Image';
  //   pollenImagePreview.appendChild(img);
  // });

  // // Hiển thị hình ảnh từ dữ liệu API

  // const flowerImagePreview = document.getElementById('flower-image-preview');
  // flowerData.flower_images.forEach(image => {
  //     const img = document.createElement('img');
  //     img.src = image;
  //     img.alt = 'Flower Image';
  //     flowerImagePreview.appendChild(img);
  // });

  // // Thêm hình ảnh mới
  // const pollenImageInput = document.getElementById('pollen-image');
  // if (pollenImageInput) {
  //     pollenImageInput.addEventListener('change', function(event) {
  //         previewImage(event); // Gọi hàm previewImage khi các tệp được chọn
  //     });
  // }

  // function previewImage(event) {
  //     const preview = document.getElementById('pollen-image-preview');
  //     preview.innerHTML = ''; // Xóa hình ảnh hiện tại (nếu có)

  //     const files = event.target.files;
  //     for (const file of files) {
  //         const reader = new FileReader();
  //         reader.onload = function (e) {
  //             const img = document.createElement('img');
  //             img.src = e.target.result;
  //             img.alt = file.name;
  //             img.classList.add('selected-image');
  //             preview.appendChild(img);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // }


  //         // Mở modal
  //         const modal = document.querySelector('.modal_creatfl');
  //         if (modal) {
  //           modal.classList.add('modal-open-add');
  //         } else {
  //           console.error('Không tìm thấy phần tử modal');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Lỗi khi lấy dữ liệu hoa:', error);
  //       });
  //   };

  //   // Đóng modal khi nút đóng được nhấn
  //   const closeModalBtn = document.querySelector('.modal-close-add');
  //   if (closeModalBtn) {
  //     closeModalBtn.addEventListener('click', function() {
  //       const modal = document.querySelector('.modal_creatfl');
  //       if (modal) {
  //         modal.classList.remove('modal-open-add');
  //       }
  //     });
  //   }

  //   // Đóng modal khi nút thoát được nhấn
  //   const exitBtn = document.querySelector('.btn_exit_cr_flower');
  //   if (exitBtn) {
  //     exitBtn.addEventListener('click', function() {
  //       const modal = document.querySelector('.modal_creatfl');
  //       if (modal) {
  //         modal.classList.remove('modal-open-add');
  //       }
  //     });
  //   }

  //   // Ngăn không đóng modal khi nhấn vào bên trong container modal
  //   const modalContainer = document.querySelector('.js-modal-container');
  //   if (modalContainer) {
  //     modalContainer.addEventListener('click', function(event) {
  //       event.stopPropagation();
  //     });
  //   }

  //   // Đóng modal khi nhấn vào bên ngoài container modal
  //   const modal = document.querySelector('.modal_creatfl');
  //   if (modal) {
  //     modal.addEventListener('click', function() {
  //       modal.classList.remove('modal-open-add');
  //     });
  //   }

  //   // Xử lý sự kiện nhấn nút lưu
  //   const saveBtn = document.querySelector('.btn_save_cr_flower');
  //   if (saveBtn) {
  //     saveBtn.addEventListener('click', function() {
  //       // Thêm logic lưu ở đây
  //       console.log('Đã nhấn lưu');
  //       // Đóng modal
  //       const modal = document.querySelector('.modal_creatfl');
  //       if (modal) {
  //         modal.classList.remove('modal-open-add');
  //       }
  //     });
  //   }
  // });
  // function previewImage(event) {
  //   const preview = document.getElementById('pollen-image-preview');
  //   preview.innerHTML = ''; // Xóa hình ảnh hiện tại (nếu có)

  //   const files = event.target.files;
  //   for (const file of files) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //           const img = document.createElement('img');
  //           img.src = e.target.result;
  //           img.alt = file.name;
  //           img.classList.add('selected-image');
  //           preview.appendChild(img);
  //       };
  //       reader.readAsDataURL(file);
  //   }
  // }




  // const saveBtn = document.querySelector('.btn_save_cr_flower');
  // if (saveBtn) {
  //   saveBtn.addEventListener('click', function() {
  //     // Thêm logic lưu ở đây
  //     console.log('Đã nhấn lưu');

  //     // Tạo formData từ các trường input
  //     const formData = new FormData();
  //     formData.append('common-name', document.getElementById('common-name').value);
  //     formData.append('scientific-name', document.getElementById('scientific-name').value);
  //     formData.append('pollen-size', document.getElementById('pollen-size').value);
  //     formData.append('order', document.getElementById('order').value);
  //     formData.append('family', document.getElementById('family').value);
  //     formData.append('genus', document.getElementById('genus').value);
  //     formData.append('pollen-shape', document.getElementById('pollen-shape').value);
  //     formData.append('pollen-surface', document.getElementById('pollen-surface').value);
  //     formData.append('part', document.getElementById('part').value);
  //     formData.append('aperture-type', document.getElementById('aperture-type').value);

  //     // Gửi yêu cầu PUT đến API
  //     const flowerId = '661d0377f7ed354ab1d17a09'; // Thay thế bằng id của hoa bạn muốn cập nhật
  //     fetch(`http://localhost:3456/flowers/${flowerId}`, {
  //       method: 'PUT',
  //       body: formData
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Có lỗi khi cập nhật hoa');
  //       }
  //       console.log('Đã cập nhật hoa thành công');
  //       // Đóng modal
  //       const modal = document.querySelector('.modal_creatfl');
  //       if (modal) {
  //         modal.classList.remove('modal-open-add');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Lỗi khi cập nhật hoa:', error);
  //     });
  //   });
  // }
