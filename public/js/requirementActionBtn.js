function renderRequirementDetails(jsonData) {
    try {
        // Check if jsonData is already an object
        var data = typeof jsonData === 'object' ? jsonData : JSON.parse(jsonData);

        var requirementName = data.requirement[0][0].requirement_name;
        var description = data.requirement[0][0].description;
        var requirementTypeName = data.requirement[0][0].requirement_type_name;

        $('#modalDetailsRequirement .modal-title').text(requirementName + ' Details');
        $('#modalDetailsRequirement #requirement-title').val(requirementName);
        $('#modalDetailsRequirement #requirement-type').val(requirementTypeName);
        $('#modalDetailsRequirement #description').val(description);

        // Clear previous test cases
        $('#testCaseTableBody').empty();

        // Append test cases
        var testCaseTableBody = $('#testCaseTableBody');
        if (data.requirement[0][0].test_cases && data.requirement[0][0].test_cases.length > 0) {
            var testCases = data.requirement[0][0].test_cases;
            testCases.forEach((testCase, index) => {
                var row = $('<tr>');
                row.append($('<td>').text(testCase.testcase_id));
                row.append($('<td>').text(testCase.name));
                testCaseTableBody.append(row);

                // Add overflow-y: auto after 5 rows
                if (index === 4 && testCases.length > 5) {
                    testCaseTableBody.css('max-height', '200px');
                    testCaseTableBody.css('overflow-y', 'auto');
                }
            });
        } else {
            var row = $('<tr>').append($('<td colspan="2">').text('No test cases linked to this requirement.'));
            testCaseTableBody.append(row);
        }

        $('#modalDetailsRequirement').modal('show');
    } catch (e) {
        // Handle parsing error
        console.error('Error parsing JSON:', e);
        // Optionally, alert or log the error
        alert('Error parsing JSON data.');
    }
}


// Function to show toast
function showToast(title, message, className) {
    const toastContainer = document.getElementById('toastContainer');
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center text-white ${className} border-0`;
    toastElement.role = 'alert';
    toastElement.ariaLive = 'assertive';
    toastElement.ariaAtomic = 'true';

    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong>: ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastElement);

    const bsToast = new bootstrap.Toast(toastElement);
    bsToast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Function to show success toast
function showSuccessToast(message) {
    showToast('Success', message, 'bg-success');
}

// Function to show error toast
function showErrorToast(message) {
    showToast('Error', message, 'bg-danger');
}

$(document).ready(function () {
    // Function to check and show stored toast messages
    function checkStoredToasts() {
        if (localStorage.getItem('successToast')) {
            showSuccessToast(localStorage.getItem('successToast'));
            localStorage.removeItem('successToast');
        }
        if (localStorage.getItem('errorToast')) {
            showErrorToast(localStorage.getItem('errorToast'));
            localStorage.removeItem('errorToast');
        }
    }

    // Check for stored toasts when page loads
    checkStoredToasts();

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
                    localStorage.setItem('successToast', 'Requirement deleted successfully');
                    location.reload(); // Reload the page on success
                } else {
                    localStorage.setItem('errorToast', 'Error deleting requirement: ' + response.error);
                    location.reload(); // Reload the page on error
                }
            },
            error: function (error) {
                console.error('Error deleting requirement:', error);
                localStorage.setItem('errorToast', 'Error deleting requirement: ' + error.responseText);
                location.reload(); // Reload the page on error
            }
        });
    });

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
                localStorage.setItem('successToast', 'Requirement edited successfully');
                location.reload(); // Reload the page on success
            },
            error: function (error) {
                console.error('Error editing requirement:', error);
                localStorage.setItem('errorToast', 'Error editing requirement: ' + error.responseText);
                location.reload(); // Reload the page on error
            }
        });
    });

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

        if (!title) {
            $('#alertMessageRequirementTitle').text('Please enter Requirement Title').show();
            return;
        }

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
                localStorage.setItem('successToast', 'Requirement added successfully');
                location.reload(); // Reload the page on success
            },
            error: function (error) {
                console.error('Error saving requirement:', error);
                localStorage.setItem('errorToast', 'Error saving requirement: ' + error.responseText);
                location.reload(); // Reload the page on error
            }
        });
    });

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
                    localStorage.setItem('successToast', 'Requirement type added successfully');
                    location.reload(); // Reload the page on success
                } else {
                    console.error('Error adding requirement type:', response.error);
                    localStorage.setItem('errorToast', 'Error adding requirement type: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error adding requirement type:', error);
                localStorage.setItem('errorToast', 'Error adding requirement type: ' + error.responseText);
                location.reload(); // Reload the page on error
            }
        });
    });
});
