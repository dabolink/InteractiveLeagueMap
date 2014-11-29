$(document).ready(function(){
    $('#wardDrop').click(function () {
        $("#sub-pingDrop").hide('wiggle');
        $("#sub-wardDrop").toggle('wiggle');
    });
    $('#pingDrop').click(function () {
        $("#sub-wardDrop").hide('wiggle');
        $("#sub-pingDrop").toggle('wiggle');
    });
});

function hideDropdown(s){
    $("#sub-" + s).hide('wiggle');
}