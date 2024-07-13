let data = {}

$(document).ready(function () {
    $('.back-button').click(function () {
        var backModal = $(this).data("back");
        $(this).closest(".modal").modal("hide");
        $(backModal).modal("show");
    });
});

$(document).ready(function () {
    $('.add-step').click(function () {
        var step = document.createElement("div");
        step.classList.add("row", "mb-3", "additional-step");
        step.innerHTML = `
            <div class="col-6">
                <label for="description">Description: </label>
                <textarea
                    name="description"
                    class="form-control"
                    placeholder="Description"
                    rows="4"></textarea>
            </div>
            <div class="col-6">
                <label for="expected-result">Expected Result: </label>
                <textarea
                    name="expected-result"
                    class="form-control"
                    placeholder="Expected Result"
                    rows="4"></textarea>
            </div>
        `;
        $(this).closest(".modal-content").find(".modal-body").append(step);
    })
});

function onModal1NextClick() {
    var testcaseName = document.getElementById("testcase-name");

    if (testcaseName.value.trim() === "") {
        $('#testcase-name').focus();
        $('#testcase-name').closest('div').find('p').remove();
        $("#testcase-name").closest("div").append('<p style="color: red;">Testcase Name is required</p>');
    } else {
        data.testcaseName = testcaseName.value;
        data.module_id = document.getElementById("module-select").value;
        data.description = document.getElementById("testcase-description").value;
        $('#modal1').modal('hide');
        $('#modal2').modal('show');
        $('#testcase-name').closest('div').find('p').remove();
    }
}

function onModal2NextClick() {
    var description = document.querySelector(".first-testcaseStep-description");
    var expectedResult = document.querySelector(".first-testcaseStep-expected-result");

    if (description.value === "") {
        description.focus();
        $('.first-testcaseStep-description').closest('div').find('p').remove();
        $('.first-testcaseStep-description').closest('div').append('<p style="color: red;">Description is required</p>');
    } else if (expectedResult.value === "") {
        expectedResult.focus();
        $('.first-testcaseStep-expected-result').closest('div').find('p').remove();
        $('.first-testcaseStep-expected-result').closest('div').append('<p style="color: red;">Expected Result is required</p>');
    } else {
        testcaseStep = [];
        var description = document.querySelectorAll("textarea[name='description']");
        var expectedResult = document.querySelectorAll("textarea[name='expected-result']");

        description.forEach((desc, index) => {
            testcaseStep.push({
                description: desc.value,
                expectedResult: expectedResult[index].value
            });
        });

        data.testcaseStep = testcaseStep;

        $('#modal2').modal('hide');
        $('#modal3').modal('show');
        $('#description').closest('div').find('p').remove();
        $('#expected-result').closest('div').find('p').remove();
    }
}

function onModal3NextClick() {
    linkingTestcase = [];

    $('#modal3 input[type=checkbox]:checked').each(function () {
        testcaseCode = ($(this).closest('tr').find('td.testcase-code'))[0].innerText;
        linkingTestcase.push(testcaseCode);
    });

    data.linkingTestcase = linkingTestcase;

    $('#modal3').modal('hide');
    $('#modal4').modal('show');
}

function onModal4SaveClick() {
    linkingRequirement = [];

    $('#modal4 input[type=checkbox]:checked').each(function () {
        requirementCode = $(this).closest('tr').find('td.requirement-code')[0].innerText;
        linkingRequirement.push(requirementCode);
    });

    data.linkingRequirement = linkingRequirement;

    if (user_id == -1) {
        showRightBelowToast("Error adding Testcase: Cannot identify user");
        return;
    }

    data.user_id = user_id;
    console.log(data);

    currentUrl = window.location.pathname;
    $.ajax({
        type: "POST",
        url: currentUrl + "/addTestcase",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data) {
            if (data.success) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                showRightBelowToast("Testcase added successfully");
            }
        },
        error: function (err) {
            if (err.responseJSON.error.name === "SequelizeUniqueConstraintError") {
                showRightBelowToast("Test case name already exists");
            } else if (err.responseJSON.error.name === "SequelizeDatabaseError") {
                showRightBelowToast("Test case name too long (max 255 characters)");
            }
        },
    })

    document.getElementById("testcase-name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("expected-result").value = "";
    document.querySelectorAll("input[type=checkbox]:checked").forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.value = "";
    });
    if (document.querySelector("#modal2 .additional-step")) {
        document.querySelector("#modal2 .additional-step").remove();
    }
}
