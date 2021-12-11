const loginForm = getElementById('login');
loginForm.addEventListener('click', loginUser);

const loginUser = async(someEvent) => {
    someEvent.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');

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