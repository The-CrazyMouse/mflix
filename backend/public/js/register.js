document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Capture form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Print the values to the console for debugging
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Make the fetch request
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email, password })
    });

    // Print the response for debugging
    console.log('Response Status:', response.status);
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    // Handle the response
    if (response.ok) {
        alert('User registered successfully!');
        window.location.href = 'login.html';  // Redirect to login page after successful registration
    } else {
        alert(responseData.message);  // Show error message
    }
});

