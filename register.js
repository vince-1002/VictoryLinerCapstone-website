// Function to generate a unique ID
function generateUniqueId() {
    return 'USER-' + Math.floor(Math.random() * 1000000); // Generates a unique ID like 'USER-123456'
}

document.getElementById('registerForm').onsubmit = function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;

    const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!strongPassword.test(password)) {
        alert('Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    // Proceed with form submission if the password is valid
    // Existing form submission code...
};


// Example function to save registration info
document.getElementById('registerForm').onsubmit = function(event) {
    event.preventDefault();

    // Create a new user object with a unique ID
    const user = {
        id: generateUniqueId(),
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name="gender"]:checked').value // Get the selected gender
    };

    // Retrieve existing users or create a new array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user); // Add the new user to the array

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration Successful! Your ID is ' + user.id);

    // Save user data for login
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page
    window.location.href = 'login.html';
};