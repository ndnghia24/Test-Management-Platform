
// -------------------------------------------------- EDIT --------------------------------------------------

$('document').ready(function () {
    $('i.bi-pencil').click(function () {

        if (!canEditTestplan()) {
            showRightBelowToast('You do not have permission to edit this Test Plan');
            return;
        }

        let row = $(this).closest('tr');
        let planCode = row.find('.test-plan-code').text();
        let planName = row.find('.test-plan-name').text();
        let planDescription = row.find('.test-plan-description').text();

        let release = row.find('.release')[0].dataset.releaseId;
        
        $('#edit-test-plan')[0].dataset.testplanCode = planCode;
        $('#edit-test-plan').modal('show');

        $('#edit-test-plan').find('#test-plan-name').val(planName);
        $('#edit-test-plan').find('#test-plan-description').val(planDescription);
        $('#edit-test-plan').find('#release').val(release);
    });
});

$('document').ready(function () {
    $('.edit-test-plan-save-btn').click(function () {
        let modal = $('#edit-test-plan');
        let planName = modal.find('#test-plan-name').val();
        let planDescription = modal.find('#test-plan-description').val();
        let release = modal.find('#release').val();
        let planCode = modal[0].dataset.testplanCode;

        // Test plan name cannot be empty
        if (planName === '') {
            showRightBelowToast('Test Plan name cannot be empty');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: window.location.pathname + '/editTestPlan?planCode=' + planCode,
            data: JSON.stringify({ name: planName, description: planDescription, release: release }),
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    showRightBelowToast('Test Plan updated successfully');
                }
            },
            error: function (data) {
                showRightBelowToast('Error updating Test Plan');
            },
        });
    });
});


// ----------------------------------------------DELETE------------------------------------------------------------

$('document').ready(function () {
    $('i.bi-trash').click(function () {

        if (!canDeleteTestplan()) {
            showRightBelowToast('You do not have permission to delete this Test Plan');
            return;
        }

        let row = $(this).closest('tr');
        let planCode = row.find('.test-plan-code').text();

        $('#delete-test-plan')[0].dataset.testplanCode = planCode;
        $('#delete-test-plan').modal('show');
    });
});

$('document').ready(function () {
    $('.delete-test-plan-btn').click(function () {
        let planCode = $('#delete-test-plan')[0].dataset.testplanCode;

        $.ajax({
            type: 'DELETE',
            url: window.location.pathname + '/deleteTestPlan?planCode=' + planCode,
            success: function (data) {
                if (data.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    showRightBelowToast('Test Plan deleted successfully');
                }
            },
            error: function (data) {
                showRightBelowToast('Error deleting Test Plan');
            },
        });
    });
});


// -------------------------------------------VIEW TESTCASES---------------------------------------------------
$('document').ready(function () {
    $('i.bi-eye').click(function () {

        if (!canViewTestplan()) {
            showRightBelowToast('You do not have permission to view Test Cases');
            return;
        }

        let row = $(this).closest('tr');
        let planName = row.find('.test-plan-name').text();
        let planDescription = row.find('.test-plan-description').text();
        let release = row.find('.release')[0].dataset.releaseId;

        let modal = $('#show-test-plan');
        modal.find('#test-plan-name').val(planName);
        modal.find('#test-plan-description').val(planDescription);
        modal.find('#release').val(release);        

        modal.modal('show');
    });
});

$(document).ready(function() {
    $('.release-dropdown-menu').on('click', '.release-item', function() {
        var releaseName = $(this).data('name');
        console.log('Selected release:', releaseName);

        window.location.href = window.location.pathname + '?release=' + releaseName;
    });
});