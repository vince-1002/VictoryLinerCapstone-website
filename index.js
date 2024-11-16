document.querySelectorAll('[data-action="protected"]').forEach(button => {
    button.addEventListener('click', function() {
        // Display an alert with a sign-in prompt
        const signIn = confirm("You must sign in to access this feature. Click OK to go to the sign-in page.");
        if (signIn) {
            window.location.href = 'login.html';
        }
    });
});

document.querySelectorAll('.faq-item h3').forEach(item => {
item.addEventListener('click', () => {
const faqItem = item.parentElement;
faqItem.classList.toggle('active');

// Toggle visibility of the answer (paragraph inside the FAQ item)
const answer = faqItem.querySelector('p');
if (answer.style.display === 'block') {
 answer.style.display = 'none';
} else {
 answer.style.display = 'block';
}
});
});
