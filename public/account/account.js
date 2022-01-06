'use strict';

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

imgDiv.addEventListener('mouseenter', () => {
  uploadBtn.style.display = 'block';
});

imgDiv.addEventListener('mouseleave', () => {
  uploadBtn.style.display = 'none';
});

file.addEventListener('change', function() {
  const choosedFile = this.files[0];

  if (choosedFile) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.setAttribute('src', reader.result);
    });

    reader.readAsDataURL(choosedFile);
  }
});
