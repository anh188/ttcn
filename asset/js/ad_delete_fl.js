function confirmDelete(flowerId) {
  if (confirm('Bạn có chắc chắn muốn xóa loài hoa này?')) {
      deleteFlower(flowerId);
  }
}

function deleteFlower(flowerId) {
const token = localStorage.getItem('accessToken');

// Hiển thị thông báo hoặc spinner ngay khi người dùng nhấn nút
showNotification('Đang xóa dữ liệu...');

fetch(`http://localhost:3456/flowers/${flowerId}`, {
method: 'DELETE',
headers: {
  'Authorization': `Bearer ${token}`
}
})
.then(response => {
if (!response.ok) {
  throw new Error('Failed to delete flower');
}
return response.json();
})
.then(result => {
console.log(result);

if (result.status === 200 && !result.error) {
  showNotification('Xóa dữ liệu thành công');
  console.log('Calling fetchAndDisplayFlowers');
  fetchAndDisplayFlowers(); // Reload the data to update the table
} else {
  showNotification('Failed to delete flower');
}
})
.catch(error => {
console.error('Error deleting flower:', error);
showNotification('Error deleting flower');
});
}

function fetchAndDisplayFlowers() {
console.log('Fetching and displaying flowers');
// Thêm mã fetch dữ liệu và cập nhật giao diện tại đây
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
      notification.style.display = 'none';
  }, 1000);
}