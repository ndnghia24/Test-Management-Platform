async function updateIssue(element) {
    // Get the selected status from the dropdown
    const statusDropdown = document.getElementById('status-dropdown');
    const status = statusDropdown.options[statusDropdown.selectedIndex].value;
    const issueId = parseInt(element.dataset.issueId);
    const projectId = parseInt(element.dataset.projectId);
    const permissions_priority = JSON.parse(element.dataset.permissionPriority);
    const permissions_description = JSON.parse(element.dataset.permissionDescription);
    let priority = null;
    if (permissions_priority){
        const priorityDropdown = document.getElementById('priority-dropdown');
        priority = priorityDropdown.options[priorityDropdown.selectedIndex].value;
    }
    let description = null;
    if (permissions_description){
        description = document.getElementById('description-input').value.trim();
    }
    const comment = document.getElementById('comment-input').value.trim();

    // Send a PUT request to update the issue
    const response = await fetch(`/project/${projectId}/issues/editIssue?issueId=${issueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, comment, priority, description}),
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the issue page
        window.location.href = `/project/${projectId}/issues/getIssue?issueId=${issueId}`;
    } else {
        // Handle errors, if any
        console.error('Failed to update the issue');
    }
}

function updateStatusColor(element) {
    // Get the selected status from the dropdown
    const statusDropdown = document.getElementById('status-dropdown');
    const status = statusDropdown.options[statusDropdown.selectedIndex].value;

    // Get the color map
    const statusColorMap = JSON.parse(statusDropdown.dataset.colorMap);
    // console.log(statusColorMap);

    // Remove all existing color classes
    Object.values(statusColorMap).forEach(colorClass => {
        statusDropdown.classList.remove(colorClass);
        // console.log(colorClass);
    });

    // Add the new color class
    const newColorClass = statusColorMap[status] || 'color-deep-violet';
    statusDropdown.classList.add(newColorClass);
    // console.log('newColorClass', newColorClass);
}

document.addEventListener('DOMContentLoaded', updateStatusColor);

function updatePriorityColor(element) {
    // Get the selected status from the dropdown
    const priorityDropdown = document.getElementById('priority-dropdown');
    const priority = priorityDropdown.options[priorityDropdown.selectedIndex].value;

    // Get the color map
    const priorityColorMap = JSON.parse(priorityDropdown.dataset.colorMap);
    // console.log(statusColorMap);

    // Remove all existing color classes
    Object.values(priorityColorMap).forEach(colorClass => {
        priorityDropdown.classList.remove(colorClass);
        // console.log(colorClass);
    });

    // Add the new color class
    const newColorClass = priorityColorMap[priority] || 'color-deep-violet';
    priorityDropdown.classList.add(newColorClass);
    // console.log('newColorClass', newColorClass);
}

document.addEventListener('DOMContentLoaded', updatePriorityColor);