

// document.addEventListener('DOMContentLoaded', function () {
//   const trees = document.querySelectorAll('.gallery a');
//   const boFilter = document.getElementById('bo-filter');
//   const hoFilter = document.getElementById('ho-filter');
//   const kichThuocFilter = document.getElementById('kich-thuoc-filter');
//   const resultCount = document.getElementById('resultCount');
  
//   [boFilter, hoFilter, kichThuocFilter].forEach(filter => {
//     filter.addEventListener('change', filterTrees);
//   });

//   // Lấy tất cả các giá trị duy nhất cho các thuộc tính bộ, họ và kích thước từ các cây
//   const uniqueBo = [...new Set(Array.from(trees).map(tree => tree.dataset.bo))];
//   const uniqueHo = [...new Set(Array.from(trees).map(tree => tree.dataset.ho))];
//   const uniqueKichThuoc = [...new Set(Array.from(trees).map(tree => tree.dataset.kichThuoc))];

//   // Thêm các tùy chọn vào dropdown cho bộ
//   uniqueBo.forEach(bo => {
//     const option = document.createElement('option');
//     option.text = bo;
//     boFilter.add(option);
//   });

//   // Thêm các tùy chọn vào dropdown cho họ
//   uniqueHo.forEach(ho => {
//     const option = document.createElement('option');
//     option.text = ho;
//     hoFilter.add(option);
//   });

//   // Thêm các tùy chọn vào dropdown cho kích thước
//   uniqueKichThuoc.forEach(kichThuoc => {
//     const option = document.createElement('option');
//     option.text = kichThuoc;
//     kichThuocFilter.add(option);
//   });

//   // Lắng nghe sự kiện khi thay đổi bộ, họ hoặc kích thước
//   [boFilter, hoFilter, kichThuocFilter].forEach(filter => {
//     filter.addEventListener('change', filterTrees)
//   });

//   function filterTrees() {
//     const selectedBo = boFilter.value;
//     const selectedHo = hoFilter.value;
//     const selectedKichThuoc = kichThuocFilter.value;

//     let visibleCount = 0;

//     trees.forEach(tree => {
//       const bo = tree.dataset.bo;
//       const ho = tree.dataset.ho;
//       const kichThuoc = tree.dataset.kichThuoc;

//       // Kiểm tra xem cây có thỏa mãn các điều kiện lọc không
//       const isBoMatch = selectedBo === '' || selectedBo === bo;
//       const isHoMatch = selectedHo === '' || selectedHo === ho;
//       const isKichThuocMatch = selectedKichThuoc === '' || selectedKichThuoc === kichThuoc;

//       // Hiển thị hoặc ẩn cây tùy thuộc vào kết quả lọc
//       if (isBoMatch && isHoMatch && isKichThuocMatch) {
//         tree.style.display = 'block';
//         visibleCount++;
//       } else {
//         tree.style.display = 'none';
//       }
//     });
//     resultCount.textContent = `Số kết quả hiển thị: ${visibleCount}`;
//   }
// });


