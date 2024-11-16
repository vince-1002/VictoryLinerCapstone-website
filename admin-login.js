        // Toggle password visibility
        function togglePassword() {
            const passwordField = document.getElementById('adminPassword');
            const togglePasswordBtn = document.querySelector('.toggle-password');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                togglePasswordBtn.textContent = 'Hide Password';
            } else {
                passwordField.type = 'password';
                togglePasswordBtn.textContent = 'Show Password';
            }
        }

        // Login form validation
        document.getElementById('adminLoginForm').onsubmit = function(event) {
            event.preventDefault();
            // Example admin credentials (for demonstration purposes only)
            const adminUsername = 'admin';
            const adminPassword = 'password';

            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;

            if (username === adminUsername && password === adminPassword) {
                alert('Admin Login Successful!');
                window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
            } else {
                alert('Invalid credentials. Please try again.');
            }
        };