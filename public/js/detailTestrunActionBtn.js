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
            status: 1,
            priority: $('#priority').val(),
            issue_type: $('#issue-type').val(),
            assigned_to: $('#assigned-to').val(),
        };

        $.ajax({
            type: 'POST',
            url: window.location.pathname + '/addIssue',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                setTimeout(() => {
                    window.location.href = window.location.pathname;
                },1000);
                showRightBelowToast('Issue added successfully');
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
    const testcase_id = $('#modal2 .modal-scd-title').text().split(' - ')[1].trim();

    console.log($('#result-status'));

    $.ajax({
        type: 'POST',
        url: window.location.pathname + '/addResult',
        data: JSON.stringify({
            testcase_id: testcase_id,
            status: $('#result-status').val(),
        }),
        contentType: 'application/json',
        success: function (response) {
            if ($('#modal2 #result-status').val() === '4' || $('#modal2 #result-status').val() === '2'){
                showRightBelowToast('Please fill in the issue form to create a new issue');
                
                $('#modal1').find('.modal-scd-title').text($('#modal2 .modal-scd-title').text());

                $('#modal2').modal('hide');
                $('#modal1').modal('show');
            } else {
                setTimeout(() => {
                    window.location.href = window.location.pathname;
                });
                showRightBelowToast('Result added successfully');
            }
        }
    });

    document.getElementById('comment').value = '';
    document.getElementById('status').value = '1';
}

$('document').ready(function () {
    let curUrl = new URL(window.location.href);
    const number_of_row = curUrl.searchParams.get('limit') || 10;
    const feature = curUrl.searchParams.get('by') || 'tc.testcase_id';
    const sorting = curUrl.searchParams.get('order') || 'ASC';

    $('select.number-of-row').val(number_of_row);
    $('select.feature').val(feature);
    $('select.sorting').val(sorting);

    $('select.number-of-row').on('change',function () {
        curUrl.searchParams.set('limit', $(this).val());
        window.location.href = curUrl.href;
    });

    $('select.feature').on('change',function () {
        curUrl.searchParams.set('by', $(this).val());
        window.location.href = curUrl.href;
    });

    $('select.sorting').on('change',function () {
        curUrl.searchParams.set('order', $(this).val());
        window.location.href = curUrl.href;
    });

    $('#search-input-title').on('keydown', function (e) {
        if (e.key === 'Enter') {
            curUrl.searchParams.set('search', $(this).val());
            window.location.href = curUrl.href;
        }
    });
});