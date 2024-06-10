async function goToIssueDetail(element) {
    const issueId = parseInt(element.dataset.issueId);
    const projectId = parseInt(element.dataset.projectId);
    // Send a GET request with the query string
    const response = await fetch(`/project/${projectId}/issues/getIssue?issueId=${issueId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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

async function sendFilterRequest(element){
    const projectId = parseInt(element.dataset.projectId);
    
    const statusDropdown = document.getElementById('status-filter');
    const status = statusDropdown.options[statusDropdown.selectedIndex].value;

    const priorityDropdown = document.getElementById('priority-filter');
    const priority = priorityDropdown.options[priorityDropdown.selectedIndex].value;

    const assignedToDropdown = document.getElementById('assignedTo-filter');
    const assignedTo = assignedToDropdown.options[assignedToDropdown.selectedIndex].textContent;;

    const createdByDropdown = document.getElementById('createdBy-filter');
    const createdBy = createdByDropdown.options[createdByDropdown.selectedIndex].textContent;;

    let query = '';
    if(status){
        query += `status=${status}&`;
    }
    if(priority){
        query += `priority=${priority}&`;
    }
    if(createdBy){
        query += `createdBy=${createdBy}&`;
    }
    if(assignedTo){
        query += `assignedTo=${assignedTo}&`;
    }

    // Send a GET request with the query string
    const response = await fetch(`/project/${projectId}/issues?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the issue page with the query string
        window.location.href = `/project/${projectId}/issues?${query}`;
    } else {
        // Handle errors, if any
        console.error('Failed to update the issue');
    }
}
