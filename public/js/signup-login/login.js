'use strict';

const form = document.getElementById('login');

const loginUser = async event => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const room = document.getElementById('room').value;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  };

  const { message } = await fetch('/auth/api/login', options)
    .then(res => res.json());

  if (message === 'Correct Password') {
    document.location = `./chat.html?username=${username}&room=${room}`;
  } else if (message === 'User not found') {
    alert('Wrong username!');
  } else {
    alert('Wrong password!');
    //console.log(result);
  }
};

if (form) {
  form.addEventListener('click', loginUser);
}
