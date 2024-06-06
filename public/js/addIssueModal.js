const saveAddIssueButton = document.getElementById('save-add-issue-button');

const titleInput = document.getElementById('issue-title-input');
const priorityInput = document.getElementById('issue-priority-input');
const statusInput = document.getElementById('issue-status-input');
const assignInput = document.getElementById('issue-assign-input');

const titleError = document.getElementById('issue-title-error');
const priorityError = document.getElementById('issue-priority-error');
const statusError = document.getElementById('issue-status-error');
const assignErrorNotSpecify = document.getElementById('issue-assign-error-1');
const assignErrorIncorrectUser = document.getElementById('issue-assign-error-2');

titleInput.addEventListener('input', function() {
    const title = titleInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (title !== '') {
        titleError.style.display = 'none';
        titleInput.style.borderColor = '';
        titleInput.style.boxShadow = '';
    }
});

priorityInput.addEventListener('input', function() {
    const priority = priorityInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (priority !== '') {
        priorityError.style.display = 'none';
        priorityInput.style.borderColor = '';
        priorityInput.style.boxShadow = '';
    }
}
);

statusInput.addEventListener('input', function() {
    const status = statusInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (status !== '') {
        statusError.style.display = 'none';
        statusInput.style.borderColor = '';
        statusInput.style.boxShadow = '';
    }
}
);

assignInput.addEventListener('input', function() {
    const assign = assignInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (assign !== '') {
        assignErrorNotSpecify.style.display = 'none';
        assignErrorIncorrectUser.style.display = 'none';
        assignInput.style.borderColor = '';
        assignInput.style.boxShadow = '';
    }
});

// Add click event listener to the "Save" button
saveAddIssueButton.addEventListener('click', function() {
    const title = titleInput.value.trim();
    const priority = priorityInput.value.trim();
    const status = statusInput.value.trim();
    const asign = assignInput.value.trim();

    // Check if the project name is empty
    if (title === '') {
        // Show the error message
        titleError.style.display = 'block';
        // Optionally, you can also focus on the input field
        titleInput.focus();
        titleInput.style.borderColor = '#dc3545';
        titleInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return;
    }

    if (priority === '') {
        // Show the error message
        priorityError.style.display = 'block';
        // Optionally, you can also focus on the input field
        priorityInput.focus();
        priorityInput.style.borderColor = '#dc3545';
        priorityInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return;
    }

    if (status === '') {
        // Show the error message
        statusError.style.display = 'block';
        // Optionally, you can also focus on the input field
        statusInput.focus();
        statusInput.style.borderColor = '#dc3545';
        statusInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return;
    }

    if (status !== 'Opened' && asign === '') {
        // Show the error message
        assignErrorNotSpecify.style.display = 'block';
        // Optionally, you can also focus on the input field
        assignInput.focus();
        assignInput.style.borderColor = '#dc3545';
        assignInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return;
    } 
    else if (asign !== ''){
        const existingUsers = ['BaoNinh', 'Nghia Nguyen', 'Nghi Do'];
        if (!existingUsers.includes(asign)) {
            // Show the error message
            assignErrorIncorrectUser.style.display = 'block';
            // Optionally, you can also focus on the input field
            assignInput.focus();
            assignInput.style.borderColor = '#dc3545';
            assignInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
            return;
        }
    }

    // Add the code to save the issue here
    // Hide the modal
    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-add-issue'));
    modal.hide();
    // Optionally, you can also reset the input field
    titleInput.value = '';
    priorityInput.value = '';
    statusInput.value = '';
    assignInput.value = '';
    // Show a success message
    alert('Issue ' + title + ' created successfully');
}
);

