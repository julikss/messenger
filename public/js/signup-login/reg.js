const form = document.getElementById('reg-form');

const registerUser = async(event) => {
    event.preventDefault()
    const username = document.getElementById('username').value
    const passwd = document.getElementById('passwd').value

    const result = await fetch('/registration', {
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

if (form) {
    form.addEventListener('submit', registerUser);
}