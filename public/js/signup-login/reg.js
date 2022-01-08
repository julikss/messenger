'use strict';

const form = document.getElementById('reg-form');

const registerUser = async event => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('passwd').value;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      username,
      password
    })
  };

  const { message } = await fetch('/auth/registration', options)
    .then(res => res.json());

  if (message === 'Successfully') {
    document.location = './login.html';
  } else if (message === 'Username is already taken') {
    alert('user is already logged in');
  } else {
    alert('Try again');
  }

};

if (form) {
  form.addEventListener('click', registerUser);
}
