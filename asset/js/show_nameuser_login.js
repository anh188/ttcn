document.addEventListener('DOMContentLoaded', function() {
  // Hàm fetch thông tin người dùng sau khi đăng nhập từ API
  function fetchUserInfoFromAPI(token) {
      fetch('http://localhost:3456/auth/me', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(responseData => {
          console.log('API Response:', responseData);
          if (responseData.error === false) {
              displayUserInfoFromAPI(responseData.data);
          } else {
              throw new Error(responseData.message);
          }
      })
      .catch(error => {
          console.error('Error fetching user info from API:', error);
      });
  }

  // Hàm hiển thị thông tin người dùng từ phản hồi API
  function displayUserInfoFromAPI(userData) {
      // Lấy thẻ hiển thị tên người dùng từ DOM
      const userInfoContainer = document.getElementById('nameusershow');
      const userava = document.querySelector('.profile-ava')
      // Thiết lập nội dung của thẻ hiển thị tên người dùng từ dữ liệu API
      userInfoContainer.textContent = userData.name;
      userava.src = userData.avatar || './asset/images.jpg';

  }

  // Lấy token từ localStorage
  const token = localStorage.getItem('accessToken');

  // Kiểm tra xem token có tồn tại không
  if (token) {
      // Nếu token tồn tại, gọi hàm fetchUserInfo để lấy thông tin tài khoản từ API
      fetchUserInfoFromAPI(token);
  } else {
      console.error('Token không tồn tại trong localStorage.');
  }
});