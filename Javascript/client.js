function serverPost(uri, keyPair, successFunction){

    $.ajax({
        url: '/' + uri,
        type: 'POST',
        contentType: 'application/json',
        data: keyPair,
        success: function(result){
            successFunction(result);
        },
        error: function(xhr){
            alert('There was a problem.\n' + xhr.responseText);
            if(xhr.status == 401){
                $.mobile.urlHistory.stack[0].url = '/';
                $.mobile.changePage("#login");
            }
        }})
}
serverPost('',{}, function(result){
    console.log(result.message);
})