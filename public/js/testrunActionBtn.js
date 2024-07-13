// =================== Action Button ===================
$(document).ready(function() {
    $('.bi-eye').click(function() {

        if (!canView()) {
            showRightBelowToast('You do not have permission to view this Test Run');
            return
        }

        const row = $(this).closest('tr')[0];
        const testRun = JSON.parse(row.dataset.this);

        console.log(testRun);

        $('#view-test-run-modal').find('#test-run-name').val(testRun.testrun_title);
        $('#view-test-run-modal').find('#release').val(testRun.release);
        $('#view-test-run-modal').find('#assigned-to').val(testRun.assigned_to);
        $('#view-test-run-modal').find('#description').val(testRun.description);        

        $('#view-test-run-modal').modal('show');
    });

    $('.bi-pencil').click(function() {

        if (!canEdit()) {
            showRightBelowToast('You do not have permission to edit this Test Run');
            return;
        }

        const row = $(this).closest('tr')[0];
        const testRun = JSON.parse(row.dataset.this);

        console.log(testRun);

        $('#edit-test-run-modal').find('#test-run-name').val(testRun.testrun_title);
        $('#edit-test-run-modal').find('#release').val(testRun.release);
        $('#edit-test-run-modal').find('#assigned-to').val(testRun.assigned_to);
        $('#edit-test-run-modal').find('#description').val(testRun.description);      
        $('#edit-test-run-modal')[0].dataset.testrunId = testRun.testrun_id;

        $('#edit-test-run-modal').modal('show');
    });

    $('.bi-trash').click(function() {

        if (!canDelete()) {
            showRightBelowToast('You do not have permission to delete this Test Run');
            return;
        }

        const row = $(this).closest('tr')[0];
        const testRun = JSON.parse(row.dataset.this);

        console.log(testRun);

        $('#delete-test-run-modal')[0].dataset.testrunId = testRun.testrun_id;

        $('#delete-test-run-modal').modal('show');
    });
});


// =================== Edit Modal ===================
$('document').ready(function() {
    $('#edit-test-run-modal').find('.apply-button').click(function() {
        const testRun = {
            testrun_id: $('#edit-test-run-modal')[0].dataset.testrunId,
            testrun_title: $('#edit-test-run-modal').find('#test-run-name').val(),
            release: $('#edit-test-run-modal').find('#release').val(),
            assigned_to: $('#edit-test-run-modal').find('#assigned-to').val(),
            description: $('#edit-test-run-modal').find('#description').val()
        };

        // Test run name cannot be empty

        if (testRun.testrun_title.trim() === '') {
            showRightBelowToast('Test run name cannot be empty');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: window.location.pathname + '/' + testRun.testrun_id + '/editTestRun',
            data: JSON.stringify(testRun),
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                showRightBelowToast('Test run updated successfully');
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

// =================== Delete Modal ===================
$('document').ready(function() {
    $('#delete-test-run-modal').find('.delete-test-run-btn').click(function() {
        const testRunId = $('#delete-test-run-modal')[0].dataset.testrunId;

        $.ajax({
            type: 'DELETE',
            url: window.location.pathname + '/' + testRunId + '/deleteTestRun',
            success: function(response) {
                console.log(response);
                showRightBelowToast('Test run deleted successfully');
                setTimeout(() => {location.reload();}, 1000);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});

$(document).ready(function() {
    $('.release-dropdown-menu').on('click', '.release-item', function() {
        var releaseName = $(this).data('name');
        console.log('Selected release:', releaseName);

        window.location.href = window.location.pathname + '?release=' + releaseName;
    });
});
