let data = {};

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
    if (user_id == -1) {
        $.ajax({
            type: "GET",
            url: window.location.pathname.split("/")[0] + '/auth/info',
            success: function (response) {
                console.log(response);
                user_id = response.user_id;

                data.user_id = user_id;

                var checked_testcases = document.querySelectorAll('.testcase-checkbox:checked');
                if (checked_testcases.length === 0) {
                    $('.testcase-checkbox').closest('div').find('p').remove();
                    $('.testcase-checkbox').closest('div').append('<p style = "color:red;">At least 1 testcase is required</p>');
                } else {
                    data.testcases = [];
                    checked_testcases.forEach(testcase => {
                        const row = $(testcase).closest('tr').children();
                        data.testcases.push({
                            testcase_id: row.eq(1).text(),
                            testcase_name: row.eq(2).text(),
                        });
                    });
                    $('.testcase-checkbox').closest('div').find('p').remove();
                    $('.testcase-checkbox').prop('checked', false);
                    document.getElementById("test-run-name").value = "";
                    document.getElementById("release").selectedIndex = 0;
                    document.getElementById("assigned-to").selectedIndex = 0;
                    document.getElementById("description").value = "";
                    
                    let projectId = window.location.pathname.split('/')[2];
            
                    $.ajax({
                        type: "POST",
                        url: "/project/" + projectId + "/testrun/addTestRun",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (response) {
                            setTimeout(() => {
                                window.location.href = window.location.pathname;
                            }, 1500);
                            showRightBelowToast("Test run added successfully");
                        },
                        error: function (err) {
                            if (err.responseJSON.error.name === "SequelizeUniqueConstraintError") {
                                showRightBelowToast("Test run name already exists");
                            } else if (err.responseJSON.error.name === "SequelizeDatabaseError") {
                                showRightBelowToast("Test run name too long (max 255 characters)");
                            }
                        }
                    }); 
            
                    $('#modal2').modal('hide');
                }
            },
            error: function (err) {
                showRightBelowToast("Error fetching user data");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
    }
}

function onNextStepClick() {
    if (document.getElementById("test-run-name").value.trim() === "") {
        $('#test-run-name').focus();
        $('#test-run-name').closest('div').find('p').remove();
        $('#test-run-name').closest('div').append('<p style = "color:red;">Test run name is required</p>');
    } else {
        data.test_run_name = document.getElementById("test-run-name").value;
        data.release = document.getElementById("release").value;
        data.assigned_to = document.getElementById("assigned-to").value;
        data.description = document.getElementById("description").value;
        console.log(data);
        $('#modal1').modal('hide');
        $('#modal2').modal('show');
        $('#test-run-name').closest('div').find('p').remove();
    }
}