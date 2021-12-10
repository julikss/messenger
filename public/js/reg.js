const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event) {
  event.preventDefault()
  const username = document.getElementById('username')
  const passwd = document.getElementById('passwd')

  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      passwd
    })
  }).then((res) => res.json())

}
