// add eventListener to signup form
document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents form from reloading after submitting

    //get element values by their id
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    //values to be stored in json.db
    const userData = {
        firstName,
        lastName,
        email,
        dob,
        password
    };

    //json API URL
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Sign up successful! You can now log in.');
            // Optionally redirect to login page
            window.location.href = 'login.html';
        } else {
            const error = await response.json();
            alert(`Sign up failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again later.');
    }
});
