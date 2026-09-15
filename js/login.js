$(document).ready(function () {

    $("#loginForm").submit(function (event) {

        event.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        const emailCorrecto = "usuario@alkewallet.cl";
        const passwordCorrecta = "123456";

        if (email === emailCorrecto && password === passwordCorrecta) {

            $("#loginMessage").html(
                '<div class="alert alert-success">Inicio de sesión exitoso.</div>'
            );

            localStorage.setItem("usuarioLogueado", "true");

            setTimeout(function () {
                window.location.href = "menu.html";
            }, 1000);

        } else {

            $("#loginMessage").html(
                '<div class="alert alert-danger">Correo o contraseña incorrectos.</div>'
            );

        }

    });

});