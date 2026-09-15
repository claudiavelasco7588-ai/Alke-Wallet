$(document).ready(function () {

    // Verificar si el usuario inició sesión
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado !== "true") {
        window.location.href = "login.html";
        return;
    }


    // Mostrar saldo
    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {
        saldo = 0;
        localStorage.setItem("saldo", saldo);
    }

    $("#balance").text(
        "$" + Number(saldo).toLocaleString("es-CL")
    );


    // Cerrar sesión
    $("#logout").click(function (event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogueado");

        window.location.href = "login.html";

    });

});