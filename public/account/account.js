'use strict';

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');
const deleteButton = document.getElementById('delete');

const deleteAccount = async event => {
  event.preventDefault();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username
    })
  };
  const result = await fetch('/auth/account/:username')
    .then(res => res.json());
};

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

if (deleteButton) {
  deleteButton.addEventListener('click', deleteAccount);
}
