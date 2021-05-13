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
        $("#Calle").val(users[i].Attributes[2].Value);
        $("#Colonia").val(users[i].Attributes[3].Value);
        $("#Cargo").val(users[i].Attributes[5].Value);
        $("#Nombre").text(users[i].Attributes[9].Value +" "+users[i].Attributes[6].Value);
        $("#Num").val(users[i].Attributes[7].Value);
        $("#Estado").val(users[i].Attributes[8].Value);
        $("#Telefono").val(users[i].Attributes[10].Value);
        $("#Area").val(users[i].Attributes[11].Value);
        $("#Municipio").val(users[i].Attributes[12].Value);
        $("#Email").val(users[i].Attributes[13].Value);
        username = users[i].Username;
        console.log(result);      
    }

});

/*
    [
      {
        Name: 'YOUR_USER_ATTRIBUTE_NAME',
        Value: 'YOUR_USER_ATTRIBUTE_VALUE'
      }
    ]
*/

function actualizar() {
    var attr = [];
    attr.push({
        "Name": "custom:Calle",
        "Value": $("#Calle").val()
    })
    attr.push({
        "Name": "custom:Colonia",
        "Value": $("#Colonia").val()
    })
    attr.push({
        "Name": "custom:Cargo",
        "Value": $("#Cargo").val()
    })
    attr.push({
        "Name": "custom:Num",
        "Value": $("#Num").val()
    })
    attr.push({
        "Name": "custom:Estado",
        "Value": $("#Estado").val()
    })
    attr.push({
        "Name": "phone_number",
        "Value": $("#Telefono").val()
    })
    attr.push({
        "Name": "custom:Area",
        "Value": $("#Area").val()
    })
    attr.push({
        "Name": "email",
        "Value": $("#Email").val()
    })
    attr.push({
        "Name": "custom:Municipio",
        "Value": $("#Municipio").val()
    })

    console.log(attr);

    $.ajax({
        method: 'POST',
        url: _config.api.invokeUrl + "/modificarcognito",
        data: JSON.stringify({
            attributes: attr,
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
    alert("Usuario Modificado con éxito")
    location.href='administrador.html';
}