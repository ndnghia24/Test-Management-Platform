// Dropzone.options.myDropzone = {
//     url: '/path/to/upload/handler', // replace this with your upload handler URL
//     maxFilesize: 2, // Maximum file size in MB
//     acceptedFiles: 'image/*,application/pdf,.psd', // Accepted file types
// };

function handleModalInput() {
    document.querySelector('#modalAddModules .btn-primary').addEventListener('click', function() {
        var modulesNameInput = document.querySelector('input[name="modules-name"]');
        var alertMessage = document.querySelector('#alertMessage');

        var modulesName = modulesNameInput.value;
        if (modulesName === '') {
            alertMessage.textContent = 'Please enter a module name.';
            alertMessage.style.display = 'block';
            return;
        }
        var modules = {
            name: modulesName
        };
        var modulesJson = JSON.stringify(modules);

        alertMessage.textContent = '';
        alertMessage.style.display = 'none';

        alert(modulesJson);
    });
}

$(document).ready(function() {
    handleModalInput();
});