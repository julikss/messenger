/*const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);

async function registerUser(event) {
  event.preventDefault()
  const username = document.getElementById('username').value
  const passwd = document.getElementById('passwd').value

  const result = await fetch('/api/reg', {
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
*/
