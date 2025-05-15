document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:4040/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
		console.log('Token JWT:', data.token);
        localStorage.setItem('token', data.token);  // Store token in local storage
        window.location.href = 'search.html';  // Redirect to the search page
    } else {
        const error = await response.json();
        alert(error.message);
    }
});

