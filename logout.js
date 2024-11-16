function logout() {
    // Remove only the active user session
    localStorage.removeItem('activeUser');

    // Redirect to login page
    window.location.href = 'login.html';
}
