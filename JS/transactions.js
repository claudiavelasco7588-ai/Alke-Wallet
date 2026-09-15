$(document).ready(function () {

    // Verificar sesión
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado !== "true") {
        window.location.href = "login.html";
        return;
    }


    // Obtener saldo
    const saldo = Number(localStorage.getItem("saldo")) || 0;


    // Mostrar saldo
    $("#currentBalance").text(
        "$" + saldo.toLocaleString("es-CL")
    );


    // Obtener transacciones
    const transacciones =
        JSON.parse(localStorage.getItem("transacciones")) || [];


    // Verificar si existen movimientos
    if (transacciones.length === 0) {

        $("#emptyMessage").text(
            "Todavía no tienes transacciones."
        );

    } else {

        // Mostrar las transacciones desde la más reciente
        transacciones
            .slice()
            .reverse()
            .forEach(function (transaccion) {

                let montoFormateado =
                    "$" + Number(transaccion.monto).toLocaleString("es-CL");


                let claseMonto = "";

                if (transaccion.tipo === "Depósito") {

                    claseMonto = "text-success transaction-deposit";

                } else {

                    claseMonto = "text-danger transaction-send";

                }


                let signo = "";

                if (transaccion.tipo === "Depósito") {

                    signo = "+";

                } else {

                    signo = "-";

                }


                const fila = `
                    <tr>

                        <td>
                            ${transaccion.fecha}
                        </td>

                        <td>
                            ${transaccion.tipo}
                        </td>

                        <td>
                            ${transaccion.descripcion}
                        </td>

                        <td class="text-end ${claseMonto}">
                            ${signo}${montoFormateado}
                        </td>

                    </tr>
                `;


                $("#transactionList").append(fila);

            });

    }


    // Cerrar sesión
    $("#logout").click(function (event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogueado");

        window.location.href = "login.html";

    });

});