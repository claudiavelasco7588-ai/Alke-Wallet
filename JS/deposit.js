$(document).ready(function () {

    // Verificar sesión
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado !== "true") {
        window.location.href = "login.html";
        return;
    }


    // Obtener saldo actual
    let saldo = Number(localStorage.getItem("saldo")) || 0;


    // Mostrar saldo
    $("#currentBalance").text(
        "$" + saldo.toLocaleString("es-CL")
    );


    // Realizar depósito
    $("#depositForm").submit(function (event) {

        event.preventDefault();

        const monto = Number($("#depositAmount").val());


        // Validar monto
        if (monto <= 0 || isNaN(monto)) {

            $("#depositMessage").html(
                '<div class="alert alert-danger">Ingresa un monto válido.</div>'
            );

            return;
        }


        // Actualizar saldo
        saldo += monto;

        localStorage.setItem("saldo", saldo);


        // Crear transacción
        const transaccion = {
            tipo: "Depósito",
            descripcion: "Depósito de dinero",
            monto: monto,
            fecha: new Date().toLocaleString("es-CL")
        };


        // Obtener transacciones existentes
        let transacciones =
            JSON.parse(localStorage.getItem("transacciones")) || [];


        // Agregar nueva transacción
        transacciones.push(transaccion);


        // Guardar transacciones
        localStorage.setItem(
            "transacciones",
            JSON.stringify(transacciones)
        );


        // Mostrar mensaje
        $("#depositMessage").html(
            '<div class="alert alert-success">¡Depósito realizado correctamente!</div>'
        );


        // Actualizar saldo mostrado
        $("#currentBalance").text(
            "$" + saldo.toLocaleString("es-CL")
        );


        // Limpiar campo
        $("#depositAmount").val("");

    });


    // Cerrar sesión
    $("#logout").click(function (event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogueado");

        window.location.href = "login.html";

    });

});