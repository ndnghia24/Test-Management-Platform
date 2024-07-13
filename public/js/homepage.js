//hover on add user element

// Get the add-user element
var addUserElements = document.querySelectorAll('.add-user');

if (addUserElements){
  addUserElements.forEach(function(addUserElement){
    // Add cursor pointer style
    addUserElement.style.cursor = 'pointer';
    
    // Add event listener for mouseenter (hover)
    addUserElement.addEventListener('mouseenter', function() {
        // Get the inner icon element
        var innerIcon = addUserElement.querySelector('i');
        // Get the inner text
        var innerText = addUserElement.querySelector('span');
    
        // Set color for inner icon
        innerIcon.style.color = 'var(--color-blue)';
        // Set color for inner text
        innerText.style.color = 'var(--color-blue)';
    });
    
    // Add event listener for mouseleave (hover end)
    addUserElement.addEventListener('mouseleave', function() {
        // Get the inner icon element
        var innerIcon = addUserElement.querySelector('i');
        // Get the inner text
        var innerText = addUserElement.querySelector('span');
    
        // Reset color for inner icon
        innerIcon.style.color = 'var(--color-black)';
        // Reset color for inner text
        innerText.style.color = 'var(--color-black)';
    });
    
    });
}

/* Home page click event*/

// click on project
const project_tags = document.getElementsByClassName('project-tag');

if (project_tags){
    for (let i = 0; i < project_tags.length; i++) {
        project_tags[i].addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior of the click event
            
            if (!event.currentTarget.contains(event.target)) {
                // The clicked element is a child of the project tag, perform the child action
                console.log('Clicked on child element:', event.target.id);
            }
            else{
                // The clicked element is the project tag itself, perform the parent action
                console.log('Clicked on parent element:', event.target.id);
            }
        });
        
    }
}   


// click on add user
const add_users = document.getElementsByClassName('add-user');

if (add_users){
    for (let i = 0; i < add_users.length; i++) {
        add_users[i].setAttribute('data-bs-toggle', 'modal');
        add_users[i].setAttribute('data-bs-target', '#modal-add-user');
    
        add_users[i].addEventListener('click', function(event) {
            if(event && event.stopPropagation) event.stopPropagation();
        });
    }
}


// click on delete project
const delete_projects = document.getElementsByClassName('delete-project');

if (delete_projects){
    for (let i = 0; i < delete_projects.length; i++) {
        delete_projects[i].setAttribute('data-bs-toggle', 'modal');
        delete_projects[i].setAttribute('data-bs-target', '#modal-delete-project');
    
        delete_projects[i].addEventListener('click', function(event) {
            if(event && event.stopPropagation) event.stopPropagation();
        });
    }
}



/* update issues onclick */
const save_change = document.getElementById('save-change-button');
const save_button = document.getElementById('save-button');

if (save_change){
    save_change.addEventListener('click', function() {
        alert('Changes saved successfully');
    });
    
    save_button.addEventListener('click', function() {
        alert('Changes saved successfully');
    });
}


//click on create project button -verify data
// Get the project name input field and the error message element
const projectNameInput = document.getElementById('projectNameInput');
const projectNameErrorEmpty = document.getElementById('projectNameError-1');
const projectNameErrorExist = document.getElementById('projectNameError-2');

// Add event listener to the project name input field to check if it's empty on input
projectNameInput.addEventListener('input', function() {
    const projectName = projectNameInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (projectName !== '') {
        projectNameErrorEmpty.style.display = 'none';
        projectNameErrorExist.style.display = 'none';
        projectNameInput.style.borderColor = '';
        projectNameInput.style.boxShadow = '';
    }
});

// Get the "Create" button element
const createButton = document.getElementById('create-project-button');

// Add click event listener to the "Create" button
createButton.addEventListener('click',async function() {
    //array of existing project names
    const existingProjects = ['Tiktok App', 'Facebook Lite', 'Instagram for Student', 'Tinder App', 'Alibaba App', 'Shoppe App'];

    // Get the value of the project name input field
    const projectName = projectNameInput.value.trim(); // Trim whitespace
    
    // Check if the project name is empty
    if (projectName === '') {
        // Show the error message
        projectNameErrorEmpty.style.display = 'block';
        // Optionally, you can also focus on the input field
        projectNameInput.focus();
        projectNameInput.style.borderColor = '#dc3545';
        projectNameInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }
    // Check if the project name already exists
    else if (existingProjects.includes(projectName)) {
        // Show the error message
        projectNameErrorExist.style.display = 'block';
        // Optionally, you can also focus on the input field
        projectNameInput.focus();
        projectNameInput.style.borderColor = '#dc3545';
        projectNameInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }

    // If the project name is not empty, continue with creating the project
    // Send a PUT request to update the issue
    const response = await fetch(`/home`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName}),
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the issue page
        window.location.href = `/home`;
    } else {
        // Handle errors, if any
        console.error('Failed to update the issue');
    }

    // Close the modal (if needed)
    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-create-project'));
    modal.hide();
    projectNameInput.value = ''; // Clear the project name input field
    alert('Project ' + projectName + ' created successfully');
});


/* Click on add-user save modal*/
const userEmailInput = document.getElementById('userEmailInput');
const userEmailErrorEmpty = document.getElementById('userEmailError-1');
const userEmailErrorExist = document.getElementById('userEmailError-2');
const userEmailErrorFormat = document.getElementById('userEmailError-3');

const userRoleInput = document.getElementById('userRoleInput');
const userRoleError = document.getElementById('userRoleError');

const saveAddUserButton = document.getElementById('save-add-user-button');

function validateEmail(email) {
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(String(email).toLowerCase());
}

// Add event listener to the user email input field to check if it's empty on input and true format
userEmailInput.addEventListener('input', function() {
    const email = userEmailInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (email !== '') {
        userEmailErrorEmpty.style.display = 'none';
        userEmailErrorExist.style.display = 'none';
        userEmailErrorFormat.style.display = 'none';
        userEmailInput.style.borderColor = '';
        userEmailInput.style.boxShadow = '';
    }
});

// Add event listener to the user role input field to check if it's empty on input
userRoleInput.addEventListener('input', function() {
    const role = userRoleInput.value.trim(); // Trim whitespace
    // Hide the error message if the project name is not empty
    if (role !== '') {
        userRoleError.style.display = 'none';
        userRoleInput.style.borderColor = '';
        userRoleInput.style.boxShadow = '';
    }
}
);

// Add click event listener to the "Save" button
saveAddUserButton.addEventListener('click', async function() {
    //array of existing project names
    const existingEmail = ['quocbao@gmail.com', 'ducnghia@gmail.com', 'thanhnghi@gmail.com'];

    // Get the value of the email input field
    const email = userEmailInput.value.trim();
    
    // Check if the project name is empty
    if (email === '') {
        // Show the error message
        userEmailErrorEmpty.style.display = 'block';
        // Optionally, you can also focus on the input field
        userEmailInput.focus();
        userEmailInput.style.borderColor = '#dc3545';
        userEmailInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }
    // Check if the project name already exists
    else if (existingEmail.includes(email)) {
        // Show the error message
        userEmailErrorExist.style.display = 'block';
        // Optionally, you can also focus on the input field
        userEmailInput.focus();
        userEmailInput.style.borderColor = '#dc3545';
        userEmailInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }
    else if (!validateEmail(email)) {
        // Show the error message
        userEmailErrorFormat.style.display = 'block';
        // Optionally, you can also focus on the input field
        userEmailInput.focus();
        userEmailInput.style.borderColor = '#dc3545';
        userEmailInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }
    else if (userRoleInput.value === '') {
        // Show the error message
        userRoleError.style.display = 'block';
        // Optionally, you can also focus on the input field
        userRoleInput.focus();
        userRoleInput.style.borderColor = '#dc3545';
        userRoleInput.style.boxShadow = '0 0 0 0.25rem rgba(220, 53, 69, 0.25)';
        return; // Exit the function early if the project name is empty
    }

    const role = userRoleInput.value.trim(); // Trim whitespace
    const projectId = parseInt(saveAddUserButton.getAttribute('data-project-id'));
    //send email of user to server
    // Send a POST request to add the user
    const response = await fetch(`/home`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role, projectId}),
    });

    // Check if the request was successful
    if (response.ok) {
        // Close the modal (if needed)
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-add-user'));
        modal.hide();
        userEmailInput.value = ''; // Clear the email input field
        userRoleInput.value = ''; // Clear the role select form input field
        alert('Add ' + email + ' to project successfully');
        // Redirect to the issue page
        window.location.href = `/home`;
    } else {
        // Handle errors, if any
        alert('Failed to add the user');
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-add-user'));
        modal.hide();
        console.error('Failed to add the user');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'link' that have the data-bs-toggle attribute
    document.querySelectorAll('.add-user').forEach(function(element) {
        element.addEventListener('click', function() {
            // Get the data-surface-id value from the clicked element
            const projectId = parseInt(this.getAttribute('data-project-id'));
            
            // Find the modal and set its data-surface-id attribute
            const saveButton = document.getElementById('save-add-user-button');
            if (saveButton) {
                saveButton.setAttribute('data-project-id', projectId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'link' that have the data-bs-toggle attribute
    document.querySelectorAll('.delete-project').forEach(function(element) {
        element.addEventListener('click', function() {
            // Get the data-surface-id value from the clicked element
            const projectId = parseInt(this.getAttribute('data-project-id'));
            
            // Find the modal and set its data-surface-id attribute
            const confirmButton = document.getElementById('confirmDeleteBtn');
            if (confirmButton) {
                confirmButton.setAttribute('data-project-id', projectId);
            }
        });
    });
});


// click on delete project modal
const deleteProjectButton = document.getElementById('confirmDeleteBtn');

deleteProjectButton.addEventListener('click', async function() {
    const projectId = parseInt(deleteProjectButton.getAttribute('data-project-id'));
    // Add your code to delete the project here
    // For example, you can submit a form, send an AJAX request, etc.
    const response = await fetch(`/home`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId}),
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the issue page
        window.location.href = `/home`;
        // Close the modal (if needed)
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-delete-project'));
        modal.hide();
        alert('Project deleted successfully');
    } else {
        // Handle errors, if any
        // get the error message from server

        alert('Failed to delete the project');
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-delete-project'));
        modal.hide();
        console.error('Failed to delete the project');
    }
});