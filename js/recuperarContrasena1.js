function recuperarUuario(){
    var user = document.getElementById("squareInput").value;
    if(user){
        window.location.href = "recuperarPass2.html?user="+ user;
    }
}
