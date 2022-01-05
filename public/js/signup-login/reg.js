const form = document.getElementById('reg-form');

const registerUser = async(event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('passwd').value

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

  const result = await fetch('/auth/registration', options)
      .then(res => res.json());
     if (result.message == 'Successfully') {
          document.location = './chat.html';
      } else if (result.message == 'Username is already taken') {
          alert('user is already logged in');
      } else {
          alert('Try again');
      }
    /*  if (result.candidate = result.User.findOne({ username }) ) {
           alert('user is already logged in');
       }
       else {
            document.location = './chat.html';
       }*/

}

if (form) {
    form.addEventListener('click', registerUser);
}
