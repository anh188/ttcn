// validateEmail
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Lấy giá trị từ ô input
    var emailInput = document.getElementById('usernamelg').value;

    // Kiểm tra địa chỉ email
    if (emailInput == '') {
      document.getElementById('emailError').innerHTML = 'Requires email entry';
    }else if (!validateEmail(emailInput)) {
  // setError(emailEle, 'Yêu cầu nhập email');
      document.getElementById('emailError').innerHTML = 'Email address is not valid';
    } 
    else {
      document.getElementById('emailError').innerHTML = '';
      // Thực hiện gửi email hoặc xử lý logic khác ở đây
      alert('Email đã được gửi thành công!');

      // Xóa dữ liệu sau khi gửi thành công
      document.getElementById('usernamelg').value = '';
      document.getElementById('successMessage').style.display = 'block';
    }
  });

      // Hàm kiểm tra địa chỉ email
      function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
      }