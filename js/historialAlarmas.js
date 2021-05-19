
function requestDay() {
    var date = $('#datepicker').val();
    console.log(date)
    if (date != "") {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + "/pordiaalerta",
            data: JSON.stringify({
                fecha: date
            }),

            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }
}

function requestWeek() {
    var month = $('#dropdownMes').val();
    var week = $('#dropdownSem').val();
    var year = $('#textAhno').val();
    var date1;
    var date2;

    if (year != "") {

        if (Number(week) === 1) {
            date1 = year + "-" + month + "-" + "01";
            date2 = year + "-" + month + "-" + "07";
        } else if (Number(week) === 2) {
            date1 = year + "-" + month + "-" + "08";
            date2 = year + "-" + month + "-" + "15";
        } else if (Number(week) === 3) {
            date1 = year + "-" + month + "-" + "16";
            date2 = year + "-" + month + "-" + "22";
        } else if (Number(week) === 4) {
            date1 = year + "-" + month + "-" + "23";
            date2 = year + "-" + month + "-" + "30";
        }

        console.log(date1);
        console.log(date2);
        if (date1 != "" || date2 != "") {
            $.ajax({
                method: 'POST',
                url: _config.api.invokeUrl + "/porsemanaalerta",
                data: JSON.stringify({
                    fecha1: date1,
                    fecha2: date2
                }),

                success: completeRequest,
                error: function ajaxError(jqXHR, textStatus, errorThrown) {
                    console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
                }
            });
        }
    }
}

function requestMonth() {
    var datePre = $('#MesPi').val();
    var date;
    var res = datePre.split("/");
    date = res[1] + "-" + res[0];
    console.log(date);
    if (date != "") {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + "/pormesalerta",
            data: JSON.stringify({
                fecha: date
            }),

            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }
}

function completeRequest(result) {
    console.log(result);
    var textT = [];
    var items = JSON.parse(result.body).Items;
    items.forEach(function (elemento, indice, array) {
        var text = " ";
        text += "Sensor: " + elemento.Id_Sensor + " Fecha de Alarma: " + elemento.Fecha + " PPM: " + elemento.ppm + "\n\r";
        textT.push(text);
    })

    $('#IDalm').text(textT);
    console.log(result);
}