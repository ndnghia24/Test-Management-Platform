$('docuemnt').ready(function () {
    $('i.bi-trash').click(function () {
        var curRow = $(this).closest('tr');
        var testcaseId = curRow.find('.testcase-code').text();
        $('#delete-test-case-modal')[0].dataset.testcaseCode = testcaseId;
        $('#delete-test-case-modal').modal('show');
    });
});

$('document').ready(function () {
    $('.delete-test-case-btn').click(function () {
        var testcaseId = $('#delete-test-case-modal')[0].dataset.testcaseCode;
        let curUrl = window.location.pathname;
        $.ajax({
            url: curUrl + '/deleteTestCase?testcaseId=' + testcaseId,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    showRightBelowToast('Test Case deleted successfully');
                } else {
                    showRightBelowToast('Error deleting Test Case');
                }
            }
        });
    });
});

$('document').ready(function () {
    $('i.bi-eye').click(function () {
        var curRow = $(this).closest('tr');
        var testcaseId = curRow.find('.testcase-code').text();

        $.ajax({
            url: window.location.pathname + '/getTestCase?testcaseId=' + testcaseId,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                if (data.success) {
                    renderTestCaseDetails(data);
                } else {
                    showRightBelowToast('Error viewing Test Case');
                }
            }
        });
    })
});

$('document').ready(function () {
    $('i.bi-pencil').click(function () {
        var testcaseId = $(this).closest('tr').find('.testcase-code').text();

        fetch(window.location.pathname + '/getTestCase?testcaseId=' + testcaseId)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderTestCaseDetailsForEdit(data);
                } else {
                    showRightBelowToast('Error getting Test Case information');
                }
            });
    });
});

function renderTestCaseDetails(data) {
    let modal = $('#view-test-case');

    modal.find('#test-case-name').val(data.testcase.testcase_name);
    modal.find('#test-case-module').val(data.testcase.module_name);
    modal.find('#test-case-description').val(data.testcase.testcase_description);

    let steps = data.steps;

    modal.find('.test-case-step-body-table').empty();
    steps.forEach((step, index) => {
        let stepRow = `<tr>
            <td>${index + 1}</td>
            <td>${step.step_description}</td>
            <td>${step.step_result}</td>
        </tr>`;
        modal.find('.test-case-step-body-table').append(stepRow);
    });

    let linkingTestCases = data.linkingTestcases;

    modal.find('.test-case-linking-testcases-body-table').empty();
    linkingTestCases.forEach((linking, index) => {
        let linkRow = `<tr>
            <td>${linking.testcase_code}</td>
            <td>${linking.testcase_name}</td>
        </tr>`;
        modal.find('.test-case-linking-testcases-body-table').append(linkRow);
    });

    let linkingRequirements = data.linkingRequirements;

    modal.find('.test-case-linking-requirements-body-table').empty();
    linkingRequirements.forEach((linking, index) => {
        let linkRow = `<tr>
            <td>${linking.requirement_code}</td>
            <td>${linking.requirement_name}</td>
        </tr>`;
        modal.find('.test-case-linking-requirements-body-table').append(linkRow);
    });

    modal.modal('show');
}

function renderTestCaseDetailsForEdit(data) {
    let modal = $('#edit-test-case');

    modal.find('#test-case-name').val(data.testcase.testcase_name);
    modal.find('#test-case-module').val(data.testcase.module_name);
    modal.find('#test-case-description').val(data.testcase.testcase_description);

    let steps = data.steps;

    modal.find('.test-case-step-body-table').empty();
    steps.forEach((step, index) => {
        let stepRow = `<tr>
            <td>${index + 1}</td>
            <td>${step.step_description}</td>
            <td>${step.step_result}</td>
        </tr>`;
        modal.find('.test-case-step-body-table').append(stepRow);
    });

    let linkingTestCases = data.linkingTestcases;

    modal.find('.test-case-linking-testcases-body-table').empty();
    linkingTestCases.forEach((linking, index) => {
        let linkRow = `<tr>
            <td>${linking.testcase_code}</td>
            <td>${linking.testcase_name}</td>
            <td><i class ="bi bi-trash hover-icon text-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete test case"></i></td>
        </tr>`;
        modal.find('.test-case-linking-testcases-body-table').append(linkRow);
    });

    let linkingRequirements = data.linkingRequirements;

    modal.find('.test-case-linking-requirements-body-table').empty();
    linkingRequirements.forEach((linking, index) => {
        let linkRow = `<tr>
            <td>${linking.requirement_code}</td>
            <td>${linking.requirement_name}</td>
            <td><i class ="bi bi-trash hover-icon text-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete requirement"></i></td>
        </tr>`;
        modal.find('.test-case-linking-requirements-body-table').append(linkRow);
    });
    modal.modal('show');
    reActivateTooltips();
}