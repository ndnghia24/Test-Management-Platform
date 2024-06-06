function onSaveButtonClick() {
    var testPlanName = document.getElementById("test-plan-name");
    var release = document.getElementById("release");
    var description = document.getElementById("description");

    if (testPlanName.value.length == 0) {
        $("#test-plan-name").focus();
        $("#test-plan-name").closest("div").find("p").remove();
        $("#test-plan-name").closest("div").append('<p style = "color: red">Plan\'s Name is required</p>');
    } else if (description.value.length == 0) {
        $("#description").focus();
        $("#description").closest("div").find("p").remove();
        $("#description").closest("div").append('<p style = "color: red">Description is required</p>');
    } else {
        data = {
            name: testPlanName.value,
            release: release.value,
            description: description.value,
        };

        let currentUrl = window.location.pathname;

        console.log(data);
        console.log(currentUrl + "/addTestPlan");

        $.ajax({
            type: "POST",
            url: currentUrl + "/addTestPlan",
            data: data,
            success: function (data) {
                if (data.success) {
                    alert("Test Plan added successfully");
                    window.location.reload();
                } else {
                    alert("Error adding Test Plan");
                    console.log(data);
                }
            },
            error: function (data) {
                alert("Error adding Test Plan");
                console.log(data);
            },
        });

        testPlanName.value = "";
        release.value = 1;
        description.value = "";
        $("#test-plan-name").closest("div").find("p").remove();
        $("#description").closest("div").find("p").remove();
        modal = bootstrap.Modal.getInstance(document.getElementById("modalId"));
        modal.hide();
    }
}