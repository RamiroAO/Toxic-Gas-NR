
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
        var users = result.Users;
        var tabla = "<table class='table table-hover'>" +
        "<thead> <tr> <th scope=col'>#</th> <th scope='col'>Nombre</th> <th scope='col'>Cargo</th>"+
        "<th scope='col'>Área</th> <th scope='col'>Acción</th> </tr> </thead> <tbody>";

        for(let i = 0; i < users.length; i++){
            tabla += "<tr><td>" + (parseInt(i)+1).toString() + "</td>" +
                "<td>" + users[i].Attributes[9].Value + " " + users[i].Attributes[6].Value + "</td>" +
                "<td>" + users[i].Attributes[5].Value  + "</td>" +
                "<td>" + users[i].Attributes[11].Value + "</td>" +
                "<td><a href='administrador3.html?user="+ i +"'>" + 
                "<i class='la la-edit la-3x text-center'></i></a>"+
                "<a href='borrarUser.html?user="+ i +"'>"+
                "<i class='la la-bitbucket la-3x text-center'></i></a>" +
            "</td> </tr>";
        }
        
        tabla += "</tbody></table>";
        console.log(result);
        //$("#miTabla").text(myTable);
        document.getElementById("miTabla").innerHTML = tabla;
    }
});