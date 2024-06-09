$('document').ready(function () {
    $('i.fa-eye').click(function () {
        var requirementCode = $(this).data('requirement-code');

        $.ajax({
            url: window.location.href + '/getRequirement?requirementId=' + requirementCode,
            method: 'GET',
            success: function (data) {
                let jsonData = JSON.stringify(data);
                renderRequirementDetails(jsonData);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

function renderRequirementDetails(jsonData) {
    var data = JSON.parse(jsonData);

    var requirementName = data.requirement[0][0].requirement_name;
    var description = data.requirement[0][0].description;
    var requirementTypeName = data.requirement[0][0].requirement_type_name;

    $('#modalDetailsRequirement').modal('show');
    $('#modalDetailsRequirement .modal-title').text(requirementName + ' Details');
    $('#modalDetailsRequirement #requirement-title').val(requirementName).prop('readonly', true);
    $('#modalDetailsRequirement #requirement-type').val(requirementTypeName).prop('readonly', true);
    $('#modalDetailsRequirement #description').val(description).prop('readonly', true);
}
