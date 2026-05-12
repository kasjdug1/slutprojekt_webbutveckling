/**
 * Anvandarprofil-sidan: visar sparad användare, uppdaterar uppgifter och loggar ut.
 * Kräver att "loggedIn" finns i localStorage; annars omdirigeras till inloggning.
 */
document.addEventListener("DOMContentLoaded", function () {
    const sparadAnvandare = JSON.parse(localStorage.getItem("user"));
    const arInloggad = localStorage.getItem("loggedIn");

    if (!arInloggad) {
        window.location.href = "logga-in.html";
        return;
    }

    if (!sparadAnvandare) {
        localStorage.removeItem("loggedIn");
        window.location.href = "logga-in.html";
        return;
    }

    const valkomst = document.getElementById("welcomeText");
    const profilFormular = document.getElementById("profileForm");
    const namnFalt = document.getElementById("fullName");
    const epostFalt = document.getElementById("email");
    const statusMeddelande = document.getElementById("saveMessage");

    const nyhetsbrevVal = document.getElementById("newsletterSetting");
    const morktLageVal = document.getElementById("darkModeSetting");
    const sparaInstallningarKnapp = document.getElementById("saveSettingsBtn");
    const loggaUtKnapp = document.getElementById("logoutBtn");

    namnFalt.value = sparadAnvandare.name || "";
    epostFalt.value = sparadAnvandare.email || "";
    valkomst.textContent = "Välkommen, " + (sparadAnvandare.name || sparadAnvandare.email) + "!";

    const sparadeInstallningar = JSON.parse(localStorage.getItem("userSettings")) || {};
    nyhetsbrevVal.checked = !!sparadeInstallningar.newsletter;
    morktLageVal.checked = !!sparadeInstallningar.darkMode;

    profilFormular.addEventListener("submit", function (e) {
        e.preventDefault();

        const uppdaterad = {
            ...sparadAnvandare,
            name: namnFalt.value.trim(),
            email: epostFalt.value.trim(),
        };

        localStorage.setItem("user", JSON.stringify(uppdaterad));
        statusMeddelande.textContent = "Uppgifterna har sparats.";
        valkomst.textContent = "Välkommen, " + (uppdaterad.name || uppdaterad.email) + "!";
    });

    sparaInstallningarKnapp.addEventListener("click", function () {
        const installningar = {
            newsletter: nyhetsbrevVal.checked,
            darkMode: morktLageVal.checked,
        };

        localStorage.setItem("userSettings", JSON.stringify(installningar));
        statusMeddelande.textContent = "Inställningarna har sparats.";
    });

    loggaUtKnapp.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.href = "logga-in.html";
    });
});
