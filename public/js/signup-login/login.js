const form = document.getElementById('login');

const loginUser = async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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

    const result = await fetch('/auth/api/login', options)
        .then(res => res.json());

    if (result.message == 'Correct Password') {
        document.location = './chat.html';
    } else {
        console.log(result);
    }

}

if (form) {
    form.addEventListener('click', loginUser);
}