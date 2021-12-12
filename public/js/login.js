const loginForm = document.getElementById('login');

const loginUser = async(someEvent) => {
    someEvent.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(result => result.json());

    /*if (res.status == 'done') {

    }*/
}

loginForm.addEventListener('submit', loginUser);