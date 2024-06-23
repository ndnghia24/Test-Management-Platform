$('document').ready(function () {
    $('.bug-icon').click(function () {
        $('#modal1').modal('show');

        var testcaseName = $(this).closest('tr').find('.testcase-name').text();
        var testcaseCode = $(this).closest('tr').find('.testcase-code').text();

        $('#modal1').find('.modal-scd-title').text(testcaseName + ' - ' + testcaseCode);
    });

    $('.result-icon').click(function () {
        $('#modal2').modal('show');

        var testcaseName = $(this).closest('tr').find('.testcase-name').text();
        var testcaseCode = $(this).closest('tr').find('.testcase-code').text();

        $('#modal2').find('.modal-scd-title').text(testcaseName + ' - ' + testcaseCode);
    });
});

function onSaveIssueClick() {
    if ($('#issue-name').val() === '') {
        $('#issue-name').focus();
        $('#issue-name').closest('div').find('p').remove();
        $('#issue-name').closest('div').append('<p style="color: red;">Issue name is required</p>');
        return;
    } else {
        const data = {
            issue_name: $('#issue-name').val(),
            testcase_id: $('#modal1 .modal-scd-title').text().split(' - ')[1],
            description: $('#comment').val(),
            status: $('#status').val(),
            priority: $('#priority').val(),
            issue_type: $('#issue-type').val()
        };

        $.ajax({
            type: 'POST',
            url: window.location.pathname + '/addIssue',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
            }
        });
        
        document.getElementById('issue-name').value = '';
        document.getElementById('comment').value = '';
        document.getElementById('status').value = '1';
        document.getElementById('priority').value = '1';
        $('#issue-name').closest('div').find('p').remove();
        $('#modal1').modal('hide');
    }
}

function onSaveResultClick() {
    alert('Result is saved');
    if ($('#modal2 #status').val() === '2') {
        alert('Please fill in the issue form to create a new issue');
        $('#modal2').modal('hide');
        $('#modal1').modal('show');
    } else {
        $('#modal2').modal('hide');
    }
    document.getElementById('comment').value = '';
    document.getElementById('status').value = '1';
}