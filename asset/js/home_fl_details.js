document.addEventListener('DOMContentLoaded', function() {
  const selectedFlower = JSON.parse(sessionStorage.getItem('selectedFlower'));
  if (selectedFlower) {
      console.log('Thông tin loài hoa:', selectedFlower);

      // Set flower details
      document.getElementById('tenKhoaHoc').textContent = selectedFlower.science_name || '';
      document.getElementById('tenThuongGoi').textContent = selectedFlower.name || '';
      document.getElementById('bo').textContent = selectedFlower.set_id?.name || '';
      document.getElementById('ho').textContent = selectedFlower.surname_id?.name || '';
      document.getElementById('chi').textContent = selectedFlower.genus_id?.name || '';
      document.getElementById('hinhDangPhanHoa').textContent = selectedFlower.shape_id?.name || '';
      document.getElementById('kichThuocPhanHoa').textContent = selectedFlower.size || '';
      document.getElementById('dacDiem').textContent = selectedFlower.characteristics || '';
      document.getElementById('beMatPhanHoa').textContent = selectedFlower.surface_id?.name || '';
      // document.getElementById('phan').textContent = selectedFlower.part_id?.name || '';
      document.getElementById('loaiDoKhau').textContent = selectedFlower.aperture_id?.name || '';

      const downloadlink = document.getElementById('linkdownload');
      downloadlink.href = selectedFlower.downloadlink || '#';
      downloadlink.target = "_blank";

      // Set flower images
      const flowerImagesWrapper = document.getElementById('flowerImagesWrapper');
      const flowerImagesThumbs = document.getElementById('flowerImagesThumbs');
      selectedFlower.flower_images.forEach(image => {
          const mainSlide = document.createElement('div');
          mainSlide.classList.add('swiper-slide');
          const mainImg = document.createElement('img');
          mainImg.src = image;
          mainImg.alt = 'Flower Image';
          mainSlide.appendChild(mainImg);
          flowerImagesWrapper.appendChild(mainSlide);

          const thumbSlide = document.createElement('div');
          thumbSlide.classList.add('swiper-slide');
          const thumbImg = document.createElement('img');
          thumbImg.src = image;
          thumbImg.alt = 'Flower Image';
          thumbSlide.appendChild(thumbImg);
          flowerImagesThumbs.appendChild(thumbSlide);
      });

      // Set pollen grain images
      const pollenImagesWrapper = document.getElementById('pollenImagesWrapper');
      const pollenImagesThumbs = document.getElementById('pollenImagesThumbs');
      selectedFlower.pollen_grain_images.forEach(image => {
          const mainSlide = document.createElement('div');
          mainSlide.classList.add('swiper-slide');
          const mainImg = document.createElement('img');
          mainImg.src = image;
          mainImg.alt = 'Pollen Image';
          mainSlide.appendChild(mainImg);
          pollenImagesWrapper.appendChild(mainSlide);

          const thumbSlide = document.createElement('div');
          thumbSlide.classList.add('swiper-slide');
          const thumbImg = document.createElement('img');
          thumbImg.src = image;
          thumbImg.alt = 'Pollen Image';
          thumbSlide.appendChild(thumbImg);
          pollenImagesThumbs.appendChild(thumbSlide);
      });

      // Initialize Swiper for flower images
      var flowerThumbsSwiper = new Swiper('.flower-images-container .mySwiper', {
          loop: true,
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true,
      });
      var flowerMainSwiper = new Swiper('.flower-images-container .mySwiper2', {
          loop: true,
          spaceBetween: 10,
          navigation: {
              nextEl: '.flower-images-container .swiper-button-next',
              prevEl: '.flower-images-container .swiper-button-prev',
          },
          thumbs: {
              swiper: flowerThumbsSwiper,
          },
      });

      // Initialize Swiper for pollen images
      var pollenThumbsSwiper = new Swiper('.pollen-images-container .mySwiper', {
          loop: true,
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true,
      });
      var pollenMainSwiper = new Swiper('.pollen-images-container .mySwiper2', {
          loop: true,
          spaceBetween: 10,
          navigation: {
              nextEl: '.pollen-images-container .swiper-button-next',
              prevEl: '.pollen-images-container .swiper-button-prev',
          },
          thumbs: {
              swiper: pollenThumbsSwiper,
          },
      });

      // Modal functionality
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      const modalImg = document.getElementById("modalImage");
      const modalCT = document.getElementById("modal-content");

      pollenImagesWrapper.addEventListener('click', function(event) {
          if (event.target.tagName === 'IMG') {
              modal.style.display = "block";
              modalImg.src = event.target.src;
          }
      });

      span.onclick = function() {
          modal.style.display = "none";
      }

      window.onclick = function(event) {
          if (event.target === modalCT) {
              modal.style.display = "none";
          }
      }
      modal.addEventListener('click', function(event) {
        if (event.target !== modalImg) {
            modal.style.display = "none";
        }
    });
  } else {
      console.error('No flower data found in sessionStorage.');
  }
});