const { joinSQLFragments } = require("sequelize/lib/utils/join-sql-fragments");

Dropzone.options.myDropzone = {
    url: '/path/to/upload/handler', // replace this with your upload handler URL
    maxFilesize: 2, // Maximum file size in MB
    acceptedFiles: 'image/*,application/pdf,.psd', // Accepted file types
};

function handleModalInput() {
    document.querySelector('#modalAddRequirementType .btn-primary').addEventListener('click', function() {
        var releaseSelect = document.querySelector('#modalAddRequirementType select[name="release-selection"]');
        var requirementTypeInput = document.querySelector('#modalAddRequirementType input[name="requirement-type"]');
        var descriptionTextarea = document.querySelector('#modalAddRequirementType textarea[name="description"]');

        // Get values
        var release = releaseSelect.value;
        var requirementType = requirementTypeInput.value;
        var description = descriptionTextarea.value;
        var alertMessageRequirementType = document.querySelector('#alertMessageRequirementType');

        // Validate requirement type
        if (requirementType === '') {
            alertMessageRequirementType.textContent = 'Requirement type is required';
            alertMessageRequirementType.style.display = 'block';
            return;
        } else {
            // export to json
            var data = {
                release: release,
                requirementType: requirementType,
                description: description
            };

            alertMessageRequirementType.textContent = '';
            alertMessageRequirementType.style.display = 'none';

            alert('Data: ' + JSON.stringify(data));
        }
    });

    document.querySelector('#modalAddRequirement .btn-primary').addEventListener('click', function() {
        var requirementTitleInput = document.querySelector('#modalAddRequirement input[name="requirement-title"]');
        var requirementTypeSelect = document.querySelector('#modalAddRequirement select[name="requirement-type-selection"]');
        var descriptionTextarea = document.querySelector('#modalAddRequirement textarea[name="description"]');
        var alertMessageRequirementTitle = document.querySelector('#alertMessageRequirementTitle');

        // Get values
        var requirementTitle = requirementTitleInput.value;
        var requirementType = requirementTypeSelect.value;
        var description = descriptionTextarea.value;

        // Validate requirement title
        if (requirementTitle === '') {
            alertMessageRequirementTitle.textContent = 'Requirement title is required';
            alertMessageRequirementTitle.style.display = 'block';
            return;
        }

        // export to json
        var data = {
            requirementTitle: requirementTitle,
            requirementType: requirementType,
            description: description
        };

        alertMessageRequirementTitle.textContent = '';
        alertMessageRequirementTitle.style.display = 'none';

        alert('Data: ' + JSON.stringify(data));
    });
}

$(document).ready(function() {
    handleModalInput();
});