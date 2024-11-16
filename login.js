function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => (u.email === username || u.username === username) && u.password === password);

    if (user) {
        if (user.deleted) {
            alert('Your account has been deleted. Please contact support for assistance.');
            return;
        }
        // Save user session data
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to user dashboard
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleText = document.getElementById('toggle-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleText.textContent = 'Hide Password';
    } else {
        passwordField.type = 'password';
        toggleText.textContent = 'Show Password';
    }
}