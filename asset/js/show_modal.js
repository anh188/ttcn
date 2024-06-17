document.addEventListener("DOMContentLoaded", function() {
  // Tìm phần tử button với ID addFlowerBtn
  const addFlowerBtn = document.getElementById('addFlowerBtn');
  const updateFlowerBtn = document.getElementsByClassName('btn-warning');
   // Tìm phần tử modal với class modal_creatfl
   const modal = document.querySelector('.modal_creatfl');
   const modalContainer= document.querySelector('.js-modal-container')
   const btnUpdatedFlower = document.querySelector('.btn_update_cr_flower');
   const btnsaveFlower = document.querySelector('.btn_save_cr_flower');

   // Thêm sự kiện click cho button
   addFlowerBtn.addEventListener('click', function() {
  btnUpdatedFlower.classList.add('d-none');
       // Thêm class modal-open-add vào modal
       modal.classList.add('modal-open-add');
   });

  //  updateFlowerBtn.addEventListener('click', function() {
  //   btnsaveFlower.classList.add('d-none');
  //        // Thêm class modal-open-add vào modal
  //       //  modal.classList.add('modal-open-add');
  //    });
  

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
     modal.classList.remove('modal-open-add');
   });
 })