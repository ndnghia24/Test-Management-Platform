function handleModalInput() {
    document.querySelector('#modalAddUser .btn-primary').addEventListener('click', function() {
        var emailInput = document.querySelector('input[name="user-name"]');
        var roleSelect = document.querySelector('select[name="user-role"]');
        var alertMessage = document.querySelector('#alertMessage');

        // Validate email
        var email = emailInput.value;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            alertMessage.textContent = 'Please enter a valid email.';
            alertMessage.style.display = 'block';
            return;
        }

        var role = roleSelect.value;
        var user = {
            email: email,
            role: role
        };
        var userJson = JSON.stringify(user);

        alertMessage.textContent = '';
        alertMessage.style.display = 'none';

        alert(userJson);
    });
}

$(document).ready(function() {
    handleModalInput();
});