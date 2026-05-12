/**
 * Hanterar registrering (skapa-konto.html) och inloggning (logga-in.html).
 * Sparar användardata i localStorage (endast demo).
 */
document.addEventListener("DOMContentLoaded", function () {
    const registreringsFormular = document.getElementById("signupForm");

    if (registreringsFormular) {
        registreringsFormular.addEventListener("submit", function (e) {
            e.preventDefault();

            const namn = document.getElementById("name").value;
            const epost = document.getElementById("email").value;
            const losenord = document.getElementById("password").value;
            const bekraftelse = document.getElementById("confirmPassword").value;

            if (losenord !== bekraftelse) {
                alert("Lösenorden matchar inte.");
                return;
            }

            const anvandare = {
                name: namn,
                email: epost,
                password: losenord,
            };

            localStorage.setItem("user", JSON.stringify(anvandare));

            alert("Kontot har skapats!");

            localStorage.setItem("loggedIn", "true");
            window.location.href = "anvandarprofil.html";
        });
    }

    const inloggningsFormular = document.getElementById("loginForm");

    if (inloggningsFormular) {
        inloggningsFormular.addEventListener("submit", function (e) {
            e.preventDefault();

            const epost = document.getElementById("email").value;
            const losenord = document.getElementById("password").value;

            const anvandare = JSON.parse(localStorage.getItem("user"));

            if (!anvandare) {
                alert("Du måste skapa konto först.");
                return;
            }

            if (epost === anvandare.email && losenord === anvandare.password) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "anvandarprofil.html";
            } else {
                alert("Fel e-post eller lösenord.");
            }
        });
    }
});

