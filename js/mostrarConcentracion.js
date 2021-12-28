
$(document).ready(async function () {
    var cons = [];
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
        var sum = 0;
        for (var i = 0; i < cons.length; i++) {
            sum += parseFloat(cons[i], 10);
        }
        //console.log(cons);
        var avg = sum / cons.length;

        $('#IDsen1').text(cons[0]);
        $('#IDsen2').text(cons[1]);
        $('#IDsen3').text(cons[2]);
        $('#IDsen4').text(cons[3]);
        $('#IDavg').text(avg);
    }

    function completeRequest(result) {
        var items = JSON.parse(result.body).Items;
        items.forEach(function (elemento, indice, array) {
            cons.push(elemento.ppm.N);
        })
        //console.log(cons);
        //console.log(result);
        if(cons.length === 4){
            mostrarConcentracion();
            cons = [];
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});