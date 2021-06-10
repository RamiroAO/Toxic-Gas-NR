/*global WildRydes _config AmazonCognitoIdentity AWSCognito*/

var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
    var signinUrl = '/index.html';

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
        _config.cognito.userPoolClientId &&
        _config.cognito.region)) {
        $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    WildRydes.signOut = function signOut() {
        userPool.getCurrentUser().signOut();
    };

    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });

    /*
     * Cognito User Pool functions
     */

    function register(email, selfName, middle, phone, cargo, area, colonia, calle, num, estado, municipio, password, onSuccess, onFailure) {
        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: email
        };

        var dataName = {
            Name: 'name',
            Value: selfName
        };

        var dataMiddle = {
            Name: 'middle_name',
            Value: middle
        };

        var dataPhone = {
            Name: 'phone_number',
            Value: phone
        };

        var dataCargo = {
            Name: 'custom:Cargo',
            Value: cargo
        };

        var dataArea = {
            Name: 'custom:Area',
            Value: area
        };

        var dataColonia = {
            Name: 'custom:Colonia',
            Value: colonia
        };

        var dataCalle = {
            Name: 'custom:Calle',
            Value: calle
        };

        var dataNum = {
            Name: 'custom:Num',
            Value: num
        };

        var dataEstado = {
            Name: 'custom:Estado',
            Value: estado
        };

        var dataMunicipio = {
            Name: 'custom:Municipio',
            Value: municipio
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhone);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeMiddle = new AmazonCognitoIdentity.CognitoUserAttribute(dataMiddle);
        var attributeCargo = new AmazonCognitoIdentity.CognitoUserAttribute(dataCargo);
        var attributeArea = new AmazonCognitoIdentity.CognitoUserAttribute(dataArea);
        var attributeColonia = new AmazonCognitoIdentity.CognitoUserAttribute(dataColonia);
        var attributeCalle = new AmazonCognitoIdentity.CognitoUserAttribute(dataCalle);
        var attributeNum = new AmazonCognitoIdentity.CognitoUserAttribute(dataNum);
        var attributeEstado = new AmazonCognitoIdentity.CognitoUserAttribute(dataEstado);
        var attributeMunicipio = new AmazonCognitoIdentity.CognitoUserAttribute(dataMunicipio);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhone);
        attributeList.push(attributeName);
        attributeList.push(attributeMiddle);
        attributeList.push(attributeCargo);
        attributeList.push(attributeArea);
        attributeList.push(attributeColonia);
        attributeList.push(attributeCalle);
        attributeList.push(attributeNum);
        attributeList.push(attributeEstado);
        attributeList.push(attributeMunicipio);

        userPool.signUp(toUsername(email), password, attributeList, null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    function signin(email, password, onSuccess, onFailure) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password
        });

        var cognitoUser = createCognitoUser(toUsername(email));
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    }

    function verify(email, code, onSuccess, onFailure) {
        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: toUsername(email),
            Pool: userPool
        });
    }

    function toUsername(email) {
        return email.replace('@', '-at-');
    }

    function hashCode(email) {
        var hash = 0, i, chr;
        if (email.length === 0) return hash;
        for (i = 0; i < email.length; i++) {
          chr   = email.charCodeAt(i);
          hash  = ((hash << 3) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      };

    /*
     *  Event Handlers
     */

    $(function onDocReady() {
        $('#signinForm').submit(handleSignin);
        $('#registrationForm').submit(handleRegister);
        $('#verifyForm').submit(handleVerify);
    });

    function handleSignin(event) {
        var email = $('#emailInputSignin').val();
        var password = $('#passwordInputSignin').val();
        event.preventDefault();
        signin(email, password,
            function signinSuccess() {
                document.cookie = "usr="+hashCode(email);
                window.location.href = 'monitoreoVideo.html';
            },
            function signinError(err) {
                if (err.toString().includes("User is not confirmed.")) {
                    window.location.href = "verificarUsuarios.html?email=" + email;
                } else {
                    alert(err);
                }
            }
        );
    }

    function handleRegister(event) {
        var email = $('#emailInputRegister').val();
        var selfName = $('#nameInputRegister').val();
        var middle = $('#middleInputRegister').val();
        var phone = $('#phoneInputRegister').val();
        var cargo = $('#cargoInputRegister').val();
        var area = $('#areaInputRegister').val();
        var colonia = $('#coloniaInputRegister').val();
        var calle = $('#calleInputRegister').val();
        var num = $('#numInputRegister').val();
        var estado = $('#estadoInputRegister').val();
        var municipio = $('#municipioInputRegister').val();
        var password = $('#passwordInputRegister').val();

        var onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            /*var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
            if (confirmation) {
                window.location.href = 'verify.html';
            }*/
            $.ajax({
                method: 'POST',
                url: _config.api.invokeUrl + "/modificarcognito",
                data: JSON.stringify({
                    attributes: {
                        "Name": "email_verified",
                        "Value": true
                    },
                    userName: cognitoUser
                }),

                success: window.location.href = 'administrador.html',
                error: function ajaxError(jqXHR, textStatus, errorThrown) {
                    console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                    console.error('Response: ', jqXHR.responseText);
                    alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
                }
            });
        };
        var onFailure = function registerFailure(err) {
            alert(err);
        };
        event.preventDefault();
        register(email, selfName, middle, phone, cargo, area, colonia, calle, num, estado, municipio, password, onSuccess, onFailure);
    }

    function handleVerify(event) {
        var email = window.location.search.substr(1).split("=")[1];
        var code = $('#codigo').val();
        event.preventDefault();
        verify(email, code,
            function verifySuccess(result) {
                console.log('call result: ' + result);
                console.log('Successfully verified');
                window.location.href = 'monitoreoVideo.html';
            },
            function verifyError(err) {
                alert(err);
            }
        );
    }
}(jQuery));
