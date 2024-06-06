$(document).ready(function () {
    $('.back-button').click(function () {
        var backModal = $(this).data("back");
        $(this).closest(".modal").modal("hide");
        $(backModal).modal("show");
    });
});

$(document).ready(function(){
    $('.add-step').click(function(){
        var step = document.createElement("div");
        step.classList.add("row", "mb-3","additional-step");
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

    if (testcaseName.value === "") {
        $('#testcase-name').focus();
        $('#testcase-name').closest('div').find('p').remove();
        $("#testcase-name").closest("div").append('<p style="color: red;">Testcase Name is required</p>');
    } else {
        $('#modal1').modal('hide');
        $('#modal2').modal('show');
        $('#testcase-name').closest('div').find('p').remove();
    }
}

function onModal2NextClick() {
    var description = document.getElementById("description");
    var expectedResult = document.getElementById("expected-result");

    if (description.value === "") {
        $('#description').focus();
        $('#description').closest('div').find('p').remove();
        $('#description').closest('div').append('<p style="color: red;">Description is required</p>');
    } else if (expectedResult.value === "") {
        $('#expected-result').focus();
        $('#expected-result').closest('div').find('p').remove();
        $('#expected-result').closest('div').append('<p style="color: red;">Expected Result is required</p>');
    } else {
        $('#modal2').modal('hide');
        $('#modal3').modal('show');
        $('#description').closest('div').find('p').remove();
        $('#expected-result').closest('div').find('p').remove();
    }
}

function onModal3NextClick() {
    $('#modal3').modal('hide');
    $('#modal4').modal('show');
}

function onModal4SaveClick() {
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
    alert("Testcase is added successfully");
}
