async function goToIssueDetail(element) {
    const issueId = parseInt(element.dataset.issueId);

    // Send a GET request with the query string
    const response = await fetch(`/project/1/issues/getIssue?issueId=${issueId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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
