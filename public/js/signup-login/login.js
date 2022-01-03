const form = document.getElementById('login');

const loginUser = async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    }).then(res => res.json());

    console.log(result);

}

form.addEventListener('click', loginUser);
