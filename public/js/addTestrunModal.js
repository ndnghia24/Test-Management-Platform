$(document).ready(function () {
    $('.back-button').click(function () {
        $('#modal1').modal('show');
        $('#modal2').modal('hide');
    });
    $('.all-testcase-checkbox').change(function () {
        if (this.checked) {
            $('.testcase-checkbox').prop('checked', true);
        } else {
            $('.testcase-checkbox').prop('checked', false);
        }
    });
});

function onSaveButtonClick() {
    var checked_testcases = document.querySelectorAll('.testcase-checkbox:checked');
    if (checked_testcases.length === 0) {
        $('.testcase-checkbox').closest('div').find('p').remove();
        $('.testcase-checkbox').closest('div').append('<p style = "color:red;">At least 1 testcase is required</p>');
    } else {
        $('.testcase-checkbox').closest('div').find('p').remove();
        $('.testcase-checkbox').prop('checked', false);
        document.getElementById("test-run-name").value = "";
        document.getElementById("release").value = "release1";
        document.getElementById("assigned-to").value = "nghia";
        document.getElementById("description").value = "";
        $('#modal2').modal('hide');
        alert('Test run is saved successfully');
    }
}

function onNextStepClick() {
    if (document.getElementById("test-run-name").value === "") {
        $('#test-run-name').focus();
        $('#test-run-name').closest('div').find('p').remove();
        $('#test-run-name').closest('div').append('<p style = "color:red;">Test run name is required</p>');
    } else {
        $('#modal1').modal('hide');
        $('#modal2').modal('show');
        $('#test-run-name').closest('div').find('p').remove();
    }
}