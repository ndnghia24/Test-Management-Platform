$('document').ready(function () {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const showOption = searchParams.get('showOption');
    const sortOption = searchParams.get('sortOption');

    if (showOption) {
        $('select[name="show"]').val(showOption);
    }

    if (sortOption) {
        $('select[name="sort"]').val(sortOption);
    }
});

$('document').ready(function () {
    $('i.bi-trash').click(function () {
        var curRow = $(this).closest('tr');
        var testcaseId = curRow.find('.testcase-code').text();
        $('#delete-test-case-modal')[0].dataset.testcaseCode = testcaseId;
        $('#delete-test-case-modal').modal('show');
    });

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
    });

    $('i.bi-pencil').click(function () {
        var testcaseId = $(this).closest('tr').find('.testcase-code').text();

        fetch(window.location.pathname + '/getTestCase?testcaseId=' + testcaseId)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    $('#edit-test-case')[0].dataset.testcaseId = testcaseId;
                    renderTestCaseDetailsForEdit(data);
                    var biTrash = $('.test-case-step-body-table').find('.bi-trash');
                    for (let i = 0; i < biTrash.length; i++) {
                        biTrash[i].addEventListener('click', function () {
                            this.closest('tr').remove();
                        });
                    }
                } else {
                    showRightBelowToast('Error getting Test Case information');
                }
            });

    });

    $('.test-case-overview-apply').click(function () {
        var testcaseId = $('#edit-test-case')[0].dataset.testcaseId;
        var testcaseName = $('#test-case-name').val();
        var testcaseModule = $('#test-case-module').val();
        var testcaseDescription = $('#test-case-description').val();

        $.ajax({
            url: window.location.pathname + '/editTestCaseOverview?testcaseId=' + testcaseId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                testcaseName,
                testcaseModule,
                testcaseDescription
            }),
            success: function (data) {
                if (data.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    showRightBelowToast('Test Case updated successfully');
                } else {
                    showRightBelowToast('Error updating Test Case');
                }
            }
        });
    });

    $('.test-case-step-add-step').click(function () {
        var modal = $('#edit-test-case');
        var stepRow = `<tr>
            <td>
                <textarea type="text" id="test-case-step-edit-description" class="form-control step" rows="4"></textarea>
            </td>
            <td>
                <textarea type="text" id="test-case-step-result" class="form-control step" rows="4"></textarea>
            </td>
            <td><i class ="bi bi-trash hover-icon text-danger" style="font-size: 25px;"></i></td> `;
        modal.find('.test-case-step-body-table').append(stepRow);

        var biTrash = $('.test-case-step-body-table').find('.bi-trash');
        for (let i = 0; i < biTrash.length; i++) {
            biTrash[i].addEventListener('click', function () {
                this.closest('tr').remove();
            });
        }
    });

    $('.test-case-step-apply').click(function () {
        var description = document.querySelectorAll('#test-case-step-edit-description');
        var result = document.querySelectorAll('#test-case-step-result');

        console.log(description);

        var step = [];

        description.forEach((element, index) => {
            step.push({
                description: element.value,
                result: result[index].value
            });
        });

        var testcaseId = $('#edit-test-case')[0].dataset.testcaseId;

        $.ajax({
            url: window.location.pathname + '/editTestCaseStep?testcaseId=' + testcaseId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({steps: step}),
            success: function (data) {
                if (data.success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    showRightBelowToast('Test Case updated successfully');
                } else {
                    showRightBelowToast('Error updating Test Case');
                }
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
    let module_id = data.testcase.module_id;

    fetch(window.location.pathname.split('/testcase')[0] + '/module/getModule')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            modal.find('#test-case-module').empty();
            data.modules.forEach(module => {
                let option = `<option value="${module.module_id}">${module.name}</option>`;
                modal.find('#test-case-module').append(option);
            });
            modal.find('#test-case-module').val(module_id);
        });

    modal.find('.test-case-step-body-table').empty();
    steps.forEach((step, index) => {
        let stepRow = `<tr>
            <td>
                <textarea type="text" id="test-case-step-edit-description" class="form-control step" rows="4">${step.step_description}</textarea>
            </td>
            <td>
                <textarea type="text" id="test-case-step-result" class="form-control step" rows="4">${step.step_result}</textarea>
            </td>
            <td><i class ="bi bi-trash hover-icon text-danger" style="font-size: 25px;"></i></td>
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
}

$('document').ready(function () {
    $('.filter-icon').click(function () {
        var showOption = $('select[name="show"]').val();
        var sortOption = $('select[name="sort"]').val();
        
        window.location.href = window.location.pathname + '?showOption=' + showOption + '&sortOption=' + sortOption;
    });

    $('#search-input-title').on('keydown', function (e) {
        if (e.key === 'Enter') {
            var showOption = $('select[name="show"]').val();
            var sortOption = $('select[name="sort"]').val();
            var search = $('#search-input-title').val();
            window.location.href = window.location.pathname + '?showOption=' + showOption + '&sortOption=' + sortOption + '&search=' + search;
        }
    });
});
