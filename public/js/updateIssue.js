async function updateIssue(element) {
    // Get the selected status from the dropdown
    const statusDropdown = document.getElementById('status-dropdown');
    const status = statusDropdown.options[statusDropdown.selectedIndex].value;
    const issueId = parseInt(element.dataset.issueId);


    // Send a PUT request to update the issue
    const response = await fetch(`/project/1/issues/editIssue?issueId=${issueId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    // Check if the request was successful
    if (response.ok) {
        // Redirect to the issue page
        window.location.href = `/project/1/issues/getIssue?issueId=${issueId}`;
    } else {
        // Handle errors, if any
        console.error('Failed to update the issue');
    }
}
