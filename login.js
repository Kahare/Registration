// add eventListener to login form
document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    //values to be stored by elementId
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        password
    };

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Login successful!');
            // Save user data in localStorage or redirect to another page
            localStorage.setItem('user', JSON.stringify(result));
            window.location.href = 'dashboard.html'; // Redirect after successful login
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again later.');
    }
});
