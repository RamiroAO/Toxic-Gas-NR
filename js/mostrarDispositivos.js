
$(document).ready(async function () {
    var cons = [];
    var acc = [];
    while(true){
        for (var i = 1; i < 5; i++) {
            $.ajax({
                method: 'POST',
                url: _config.api.invokeUrl + "/concentracion",
                data: JSON.stringify({
                    sensor: i
                }),

                success: completeRequest,
                error: function ajaxError(jqXHR, textStatus, errorThrown) {
                    console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
                }
            });
            await sleep(200);
        }
        await sleep(200);
    }

    function mostrarConcentracion() {
        $('#EstSen1').css("color", cons[0]);
        $('#EstSen2').css("color", cons[1]);
        $('#EstSen3').css("color", cons[2]);
        $('#EstSen4').css("color", cons[3]);
        $('#AccSen1').html(acc[0]);
        $('#AccSen2').html(acc[1]);
        $('#AccSen3').html(acc[2]);
        $('#AccSen4').html(acc[3]);
    }

    function completeRequest(result) {
        var items = JSON.parse(result.body).Items;
        items.forEach(function (elemento, indice, array) {
            const date1 = new Date(elemento.Fecha.S);
            const date2 = new Date(Date.now());
            const diffTime = Math.abs(date2 - date1);
            //console.log(diffTime + " milliseconds");
            if(diffTime >= 45000){
                $('#EstSen'+elemento.Id_Sensor.N).css("color", "red");
                $('#AccSen'+elemento.Id_Sensor.N).html("Revisa tu conexión física");
            } else {
                $('#EstSen'+elemento.Id_Sensor.N).css("color", elemento.status.S);
                $('#AccSen'+elemento.Id_Sensor.N).html('<i class="la la-check-circle la-3x text-center" style="color: green;"></i>');
                
            }
        })
        //console.log(cons);
        //console.log(result);
        //if(cons.length === 4){
            //mostrarConcentracion();
          //  cons = [];
            //acc = [];
        //}
        //console.log(acc);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});