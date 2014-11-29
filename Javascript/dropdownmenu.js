$(document).ready(function(){
    $('#wardDrop').click(function () {
        $("#sub-wardDrop").toggle('wiggle');
    });
    $('#pingDrop').click(function () {
        $("#sub-pingDrop").toggle('wiggle');
    });
});

function hideDropdown(s){
    $("#sub-" + s).toggle('wiggle');
}