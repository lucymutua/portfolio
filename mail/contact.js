$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            // Agregar validación de reCAPTCHA
            var recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert("Por favor, completa el reCAPTCHA.");
                return;
            }

            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            emailjs.init("qNMB1E7aBXd1beX1T");
            emailjs.send("service_x1kf5r3", "template_8bf9guo", {
                name: name,
                email: email,
                subject: subject,
                message: message
            })
                .then(function (response) {
                    console.log("Correo enviado con éxito:", response);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");
                })
                .catch(function (error) {
                    console.error("Error al enviar el correo:", error);
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                })
                .finally(function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                });

        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

