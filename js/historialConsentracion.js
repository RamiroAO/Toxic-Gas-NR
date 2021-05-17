google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

}

function requestDay() {
    var date = $('#datepicker').val();
    console.log(date)
    if (date != "") {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + "/pordia",
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
                url: _config.api.invokeUrl + "/porsemana",
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
            url: _config.api.invokeUrl + "/pormes",
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

function aveg(data) {
    var sum = 0;
    for (var i = 1; i < data.length; i++) {
        sum += parseFloat(data[i][1], 10);
    }
    
    var avg = sum / (data.length-1);
    return avg;
}

function completeRequest(result) {
    var dat1 = [['Fecha', 'Sensor 1']];
    var dat2 = [['Fecha', 'Sensor 2']];
    var dat3 = [['Fecha', 'Sensor 3']];
    var dat4 = [['Fecha', 'Sensor 4']];
    var items = JSON.parse(result.body).Items;

    items.forEach(function (elemento, indice, array) {
        var datAux = [];
        if (elemento.Id_Sensor === 1) {
            datAux.push(elemento.Fecha);
            datAux.push(elemento.ppm);
            dat1.push(datAux);
        } else if (elemento.Id_Sensor === 2) {
            datAux.push(elemento.Fecha);
            datAux.push(elemento.ppm);
            dat2.push(datAux);
        } else if (elemento.Id_Sensor === 3) {
            datAux.push(elemento.Fecha);
            datAux.push(elemento.ppm);
            dat3.push(datAux);
        } else if (elemento.Id_Sensor === 4) {
            datAux.push(elemento.Fecha);
            datAux.push(elemento.ppm);
            dat4.push(datAux);
        }
    })

    var data1 = google.visualization.arrayToDataTable(dat1);
    var data2 = google.visualization.arrayToDataTable(dat2);
    var data3 = google.visualization.arrayToDataTable(dat3);
    var data4 = google.visualization.arrayToDataTable(dat4);

    var options = {
        title: 'Historial de concentracion',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart1 = new google.visualization.LineChart(document.getElementById('curve_chart1'));
    var chart2 = new google.visualization.LineChart(document.getElementById('curve_chart2'));
    var chart3 = new google.visualization.LineChart(document.getElementById('curve_chart3'));
    var chart4 = new google.visualization.LineChart(document.getElementById('curve_chart4'));
    console.log(dat1);
    if (dat1.length > 1) {
        var avvg = aveg(dat1);
        var text = "El promedio de concentración del SENSOR 1 es: " + avvg.toString();
        $('#Idavg1').text(text);
        chart1.draw(data1, options);
    }
    if (dat2.length > 1) {
        var avvg = aveg(dat2);
        var text = "El promedio de concentración del SENSOR 2 es: " + avvg.toString();
        $('#Idavg2').text(text);
        chart2.draw(data2, options);
    }
    if (dat3.length > 1) {
        var avvg = aveg(dat3);
        var text = "El promedio de concentración del SENSOR 3 es: " + avvg.toString();
        $('#Idavg3').text(text);
        chart3.draw(data3, options);
    }
    if (dat4.length > 1) {
        var avvg = aveg(dat4);
        var text = "El promedio de concentración del SENSOR 4 es: " + avvg.toString();
        $('#Idavg4').text(text);
        chart4.draw(data4, options);
    }

    console.log(result);
}