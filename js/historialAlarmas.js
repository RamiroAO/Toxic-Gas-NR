var authTokenA = "eyJraWQiOiI2citXNEZianVQMmdvSGpqd3BSRTloU2tJV3JCNGdGdXVPK2ZqOVwvWHJaMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzOTkwNWZkMi1jNGM0LTQwMzYtYWJlNC1iYzcwM2JiZTBjMWEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImN1c3RvbTpDYWxsZSI6Ikp1YW4gZGUgRGlvcyBCYXRpeiIsImN1c3RvbTpDb2xvbmlhIjoiTGluZGF2aXN0YSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0JZb1NNd1l0SSIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImN1c3RvbTpDYXJnbyI6IlJhbWkiLCJjb2duaXRvOnVzZXJuYW1lIjoicmFtaXJvMTcxMC1hdC1ob3RtYWlsLmNvbSIsIm1pZGRsZV9uYW1lIjoiQWd1aWxhciBPcmRheiIsImN1c3RvbTpOdW0iOiIxOS1CLTIwMyIsImN1c3RvbTpFc3RhZG8iOiJHdXN0YXZvIEEuIE1hZGVybyIsImF1ZCI6IjQ3cjkxMXV2cGRkZTlqdDFhc2VycHZyczh2IiwiZXZlbnRfaWQiOiI1Y2M1OTJmYS03YTQ4LTQyMDctYWE3Mi05MmI5YjY4MjhmODMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYyMDc0OTc3NywibmFtZSI6IkluZWZhYmxlMSY3IiwicGhvbmVfbnVtYmVyIjoiKzUyNTU0MDM4Nzk5NiIsImV4cCI6MTYyMDc1MzM3NywiY3VzdG9tOk11bmljaXBpbyI6IkNETVgiLCJpYXQiOjE2MjA3NDk3NzcsImVtYWlsIjoicmFtaXJvMTcxMEBob3RtYWlsLmNvbSJ9.AsE-8bB31iOy0JcBp2otVdnNVQD9TPUgA0NltS472oEOVrRsEceImMWDvUr9vLea0ZanqJby7iYs3Rq44JQsFMdHH6yXbW1rqoVkpJQ19Usi5eOUoznB3k-QBC_R7ujn0cWAW53J5KvXCfxFwQIq9vCJCjvzN1lTOEXZS0xSPZ16IN0p4-r8DzFhBkzTvtfQimohudtZVtBQEvMUePbACr0NTeRJy6JU6bfdfA5dtLCxJdp8dbzDmJU2sgKIFQFVsnYicdm-N0O28oKaw_lsGkKLr0yBCfZfffY7AakaGleZ2r3xVCUOd6Qm9kLTOW8tKs2CHxBk3e7RCLkDvPpJew";
function requestDay() {
    var date = $('#datepicker').val();
    console.log(date)
    $.ajax({
        method: 'GET',
        url: _config.api.invokeUrl + '/ride',
        headers: {
            Authorization: authTokenA
        },
        data: JSON.stringify({
            fecha: date
        }),
        contentType: 'application/json',
        success: completeRequest,
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
            console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
            console.error('Response: ', jqXHR.responseText);
            alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
        }
    });
}

function completeRequest(result) {
    var unicorn;
    var pronoun;
    console.log('Response received from API: ', result);
    unicorn = result.Unicorn;
    pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
    displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.');
    animateArrival(function animateCallback() {
        displayUpdate(unicorn.Name + ' has arrived. Giddy up!');
        WildRydes.map.unsetLocation();
        $('#request').prop('disabled', 'disabled');
        $('#request').text('Set Pickup');
    });
}