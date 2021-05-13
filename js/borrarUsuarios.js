var username;
$(document).ready(function () {
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + "/usuarioscognito",
        success: completeRequest,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
        }
    });

    function completeRequest(result) {
        var i = parseInt(window.location.search.substr(1).substring(5,10));
        var users = result.Users;
        username = users[i].Username;
        $("#usuario").text(users[i].Attributes[9].Value +" "+users[i].Attributes[6].Value);
        console.log(result);      
    }

});

function actualizar() {
    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + "/eliminarcognito",
        data: JSON.stringify({
            userName: username
        }),
        success: exitoHREF,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
        }
    });

}

function exitoHREF(){
    alert("Usuario Eliminado con éxito")
    location.href='administrador.html';
}