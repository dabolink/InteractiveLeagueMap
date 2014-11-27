$(document).ready(function(){
    $('#wardDrop').click(function () {
        $("#sub-menu1").toggle('wiggle');
        $('#sub-menu2').hide('wiggle');
        $('#sub-menu3').hide('wiggle');
    });
});

function hideDropdown(){
    $("#sub-menu1").toggle('wiggle');
}