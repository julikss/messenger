const form = document.getElementById('reg-form');

const registerUser = async(event) => {
    event.preventDefault()
    const email = document.getElementById('reg-form').value
    const username = document.getElementById('username').value
    const passwd = document.getElementById('passwd').value

    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      username,
      passwd
    })
  };

  const result = await fetch('/auth/registration', options)
      .then(res => res.json());
      if (result.message == 'Successfully') {
          document.location = './chat.html';
      } else if (result.message == 'Username is already taken') {
          alert('user is already logged in');
      } else {
          alert('Try again');
      }
}

if (form) {
    form.addEventListener('submit', registerUser);
}
