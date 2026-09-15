$(document).ready(function () {

    // Verificar sesión
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado !== "true") {
        window.location.href = "login.html";
        return;
    }


    // Contactos
    const contactos = [
        {
            nombre: "María González",
            telefono: "+56 9 1234 5678"
        },
        {
            nombre: "Juan Pérez",
            telefono: "+56 9 8765 4321"
        },
        {
            nombre: "Carolina Soto",
            telefono: "+56 9 1122 3344"
        },
        {
            nombre: "Pedro Ramírez",
            telefono: "+56 9 5566 7788"
        }
    ];


    // Obtener saldo
    let saldo = Number(localStorage.getItem("saldo")) || 0;


    // Mostrar saldo
    function mostrarSaldo() {

        $("#currentBalance").text(
            "$" + saldo.toLocaleString("es-CL")
        );

    }

    mostrarSaldo();


    // Mostrar contactos
    function mostrarContactos(lista) {

        $("#contactList").empty();

        if (lista.length === 0) {

            $("#contactList").html(
                '<div class="list-group-item text-muted">No se encontraron contactos.</div>'
            );

            return;
        }


        lista.forEach(function (contacto) {

            const contactoHTML = `
                <button 
                    type="button"
                    class="list-group-item list-group-item-action contact-item"
                    data-nombre="${contacto.nombre}"
                >
                    <strong>${contacto.nombre}</strong>
                    <br>
                    <small>${contacto.telefono}</small>
                </button>
            `;

            $("#contactList").append(contactoHTML);

        });

    }


    // Mostrar todos los contactos al cargar
    mostrarContactos(contactos);


    // Buscar contactos
    $("#searchContact").on("keyup", function () {

        const texto = $(this).val().toLowerCase();

        const resultados = contactos.filter(function (contacto) {

            return contacto.nombre
                .toLowerCase()
                .includes(texto);

        });

        mostrarContactos(resultados);

    });


    // Seleccionar contacto
    $("#contactList").on("click", ".contact-item", function () {

        const nombre = $(this).data("nombre");

        $("#selectedContact").val(nombre);

        $(".contact-item").removeClass("selected");

        $(this).addClass("selected");

    });


    // Enviar dinero
    $("#sendButton").click(function () {

        const contacto = $("#selectedContact").val();

        const monto = Number($("#sendAmount").val());


        // Validar contacto
        if (contacto === "") {

            $("#sendMessage").html(
                '<div class="alert alert-danger">Selecciona un contacto.</div>'
            );

            return;
        }


        // Validar monto
        if (monto <= 0 || isNaN(monto)) {

            $("#sendMessage").html(
                '<div class="alert alert-danger">Ingresa un monto válido.</div>'
            );

            return;
        }


        // Validar saldo
        if (monto > saldo) {

            $("#sendMessage").html(
                '<div class="alert alert-danger">No tienes saldo suficiente para realizar este envío.</div>'
            );

            return;
        }


        // Descontar dinero
        saldo -= monto;

        localStorage.setItem("saldo", saldo);


        // Crear transacción
        const transaccion = {

            tipo: "Envío",

            descripcion: "Envío a " + contacto,

            monto: monto,

            fecha: new Date().toLocaleString("es-CL")

        };


        // Obtener transacciones
        let transacciones =
            JSON.parse(localStorage.getItem("transacciones")) || [];


        // Agregar transacción
        transacciones.push(transaccion);


        // Guardar
        localStorage.setItem(
            "transacciones",
            JSON.stringify(transacciones)
        );


        // Mostrar mensaje
        $("#sendMessage").html(
            '<div class="alert alert-success">¡Dinero enviado correctamente!</div>'
        );


        // Actualizar saldo
        mostrarSaldo();


        // Limpiar formulario
        $("#selectedContact").val("");

        $("#sendAmount").val("");

        $(".contact-item").removeClass("selected");

    });


    // Cerrar sesión
    $("#logout").click(function (event) {

        event.preventDefault();

        localStorage.removeItem("usuarioLogueado");

        window.location.href = "login.html";

    });

});