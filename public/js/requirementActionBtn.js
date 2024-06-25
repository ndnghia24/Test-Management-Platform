$('document').ready(function () {
    // Click event for 'eye' icon
    $('i.fa-eye').click(function () {
        var requirementCode = $(this).data('requirement-code');

        $.ajax({
            url: window.location.href + '/getRequirement?requirementId=' + requirementCode,
            method: 'GET',
            success: function (data) {
                renderRequirementDetails(data); // No need to JSON.stringify data here
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    // Click event for 'trash' icon
    $('i.fa-trash').click(function () {
        var requirementCode = $(this).data('requirement-code');

        $.ajax({
            url: window.location.href + '/deleteRequirement?requirementId=' + requirementCode,
            method: 'DELETE',
            success: function (response) {
                if (response.success) {
                    console.log('Requirement deleted successfully');
                } else {
                    console.error('Error deleting requirement:', response.error);
                }
                // Reload the page
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting requirement:', error);
            }
        });
    });
});

function renderRequirementDetails(jsonData) {
    try {
        // Check if jsonData is already an object
        var data = typeof jsonData === 'object' ? jsonData : JSON.parse(jsonData);

        var requirementName = data.requirement[0][0].requirement_name;
        var description = data.requirement[0][0].description;
        var requirementTypeName = data.requirement[0][0].requirement_type_name;

        $('#modalDetailsRequirement .modal-title').text(requirementName + ' Details');
        $('#modalDetailsRequirement #requirement-title').val(requirementName).prop('readonly', true);
        $('#modalDetailsRequirement #requirement-type').val(requirementTypeName).prop('readonly', true);
        $('#modalDetailsRequirement #description').val(description).prop('readonly', true);
        $('#modalDetailsRequirement').modal('show');
    } catch (e) {
        // Handle parsing error
        console.error('Error parsing JSON:', e);
        // Optionally, alert or log the error
        alert('Error parsing JSON data.');
    }
}


$('document').ready(function () {
    // Handle the click event on the edit button
    let requirementCode = '';

    $('i.fa-pencil').click(function () {
        requirementCode = $(this).closest('tr').find('.requirement-code').text();

        $.ajax({
            url: window.location.href + '/getRequirement?requirementId=' + requirementCode,
            method: 'GET',
            success: function (data) {
                let requirement = data.requirement[0][0];
                $('#edit-requirement-title').val(requirement.requirement_name).prop('readonly', true);;
                $('#edit-requirement-type').val(requirement.requirement_type_name).prop('readonly', true);;
                $('#edit-description').val(requirement.description);

                $('#modalEditRequirement').modal('show');
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    // Handle the form submission for editing a requirement
    $('#edit-requirement-form').submit(function (e) {
        e.preventDefault();

        var requirementData = {
            description: $('#edit-description').val()
        };

        $.ajax({
            url: window.location.href + '/editRequirement?requirementId=' + requirementCode,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requirementData),
            success: function (response) {
                $('#modalEditRequirement').modal('hide');
                location.reload()
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});


$(document).ready(function () {
    // Function to load requirement types
    function loadRequirementTypes() {
        $.ajax({
            url: window.location.href + '/getRequirementType',
            method: 'GET',
            success: function (data) {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                var requirementTypes = data.requirementTypes;
                var select = $('#requirement-type-selection');
                select.empty();
                requirementTypes.forEach(function (type) {
                    select.append(new Option(type.name, type.requirement_type_id));
                });
            },
            
            error: function (error) {
                console.log('Error fetching requirement types:', error);
            }
        });
    }

    // Call the function to load requirement types when modal is opened
    $('#modalAddRequirement').on('show.bs.modal', function () {
        loadRequirementTypes();
    });

    // Save button click handler
    $('#saveRequirementBtn').click(function () {
        var title = $('#requirement-title').val();
        var typeId = $('#requirement-type-selection').val();
        var description = $('#add-description').val();

        console.log('Title:', title);
        console.log('Type ID:', typeId);
        console.log('Description:', description);

        // localhost:3000/project/1/requirement, i want to get the 1 by splitting the URL and get the second last element
        var urlParts = window.location.href.split('/');
        var projectId = urlParts[urlParts.length - 2];

        $.ajax({
            url: window.location.href + '/addRequirement',
            method: 'POST',
            data: {
                name: title,
                requirement_type_id: typeId,
                description: description,
                project_id: projectId
            },
            success: function (response) {
                $('#modalAddRequirement').modal('hide');
            },
            error: function (error) {
                console.log('Error saving requirement:', error);
            }
        });
    });
});

// Wait for the DOM to be fully loaded
$(document).ready(function() {
    // When the 'Save' button inside the modal is clicked
    $('#modalAddRequirementType').on('click', '.btn-primary', function() {
        var requirementTypeName = $('#requirement-type').val().trim();
        var description = $('#description').val().trim();

        // Validate input (you may want to add more validation here)
        if (!requirementTypeName) {
            $('#alertMessageRequirementType').text('Please enter Requirement Type').show();
            return;
        }

        // Prepare data to be sent to the server
        var data = {
            requirement_type_name: requirementTypeName,
            description: description
        };

        // Send AJAX request to the server
        $.ajax({
            type: 'POST',
            url: window.location.href + '/addRequirementType',
            data: data,
            success: function(response) {
                if (response.success) {
                    // Close the modal
                    $('#modalAddRequirementType').modal('hide');
                    // Reload the page
                    location.reload();
                } else {
                    console.error('Error adding requirement type:', response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error adding requirement type:', error);
                // Handle error (show error message, etc.)
            }
        });
    });
});

