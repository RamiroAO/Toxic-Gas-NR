(function scopeWrapper($) {
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    var userData = {
        Username: window.location.search.substr(1).split("=")[1],
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
        onSuccess: function (result) {
        },
        onFailure: function (err) {
            alert(err);
        }
    });

    function handleRecover(event) {
        var verificationCode = $('#codigo').val();
        var newPassword1 = $('#pass1').val();
        var newPassword2 = $('#pass2').val();
        event.preventDefault();
        if(newPassword1 === newPassword2){
            cognitoUser.confirmPassword(verificationCode, newPassword1, {
                onSuccess: function (result) {
                    alert("contraseña modificada exitosamente");
                    window.location.href = 'index.html';
                },
                onFailure: function (err) {
                    alert(err);
                }
            });
        } else {
            alert("Error");
        }
    }

    $(function onDocReady() {
        $('#recoPassForm').submit(handleRecover);
    });
}(jQuery));