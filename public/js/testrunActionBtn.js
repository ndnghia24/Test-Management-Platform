// =================== Action Button ===================
$(document).ready(function() {
    $('.bi-eye').click(function() {
        const row = $(this).closest('tr')[0];
        const testRun = JSON.parse(row.dataset.this);

        console.log(testRun);

        $('#view-test-run-modal').find('#test-run-name').val(testRun.testrun_title);
        $('#view-test-run-modal').find('#release').val(testRun.release);
        $('#view-test-run-modal').find('#assigned-to').val(testRun.assigned_to);
        $('#view-test-run-modal').find('#description').val(testRun.description);        

        $('#view-test-run-modal').modal('show');
    });
});