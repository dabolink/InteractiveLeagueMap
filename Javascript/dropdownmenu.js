$(document).ready(function(){
    $('#wardDrop').click(function () {
        $("#sub-menu1").toggle('wiggle');
        $('#sub-menu2').hide('wiggle');
        $('#sub-menu3').hide('wiggle');
    });
    $('#Drop2').click(function () {
        $("#sub-menu2").toggle('wiggle');
        $('#sub-menu1').hide('wiggle');
        $('#sub-menu3').hide('wiggle');
    });
    $('#Drop3').click(function () {
        $("#sub-menu3").toggle('wiggle');
        $('#sub-menu2').hide('wiggle');
        $('#sub-menu1').hide('wiggle');

    });
});