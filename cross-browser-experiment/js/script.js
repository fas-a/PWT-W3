document.addEventListener('DOMContentLoaded', function () {
    // Progressive Enhancement: Basic form that upgrades with JS
    const form = document.getElementById('simple-form');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            messageDiv.innerText = `Thank you, ${name}, for submitting the form!`;
        });
    }

    // Graceful Degradation: Using modern feature (Array.from)
    try {
        let arr = Array.from('Modern Browser Check');
        console.log(arr);
        document.getElementById('modern-feature').innerText = 'Modern JavaScript is supported!';
    } catch (error) {
        console.log('Array.from is not supported in this browser.');
    }
});
