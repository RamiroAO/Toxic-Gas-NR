var coe = document.cookie;
$.getJSON("admin\\admins.json", function (json) {
    if (Object.values(json.admins).indexOf(coe.split("=")[1]) >= 0) {
        document.getElementById("admin").innerHTML = "<li class='nav-item'>" +
        "<a href='administrador.html'>" +
            "<i class='la la-users'></i>" +
            "<p>USUARIOS</p>" +
        "</a>" +
    "</li>";
    }
});
