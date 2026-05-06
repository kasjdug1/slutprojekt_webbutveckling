document.addEventListener("DOMContentLoaded", function () {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "signIn.html";
        return;
    }

    const welcomeText = document.getElementById("welcomeText");
    const profileForm = document.getElementById("profileForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const saveMessage = document.getElementById("saveMessage");

    const newsletterSetting = document.getElementById("newsletterSetting");
    const darkModeSetting = document.getElementById("darkModeSetting");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (storedUser) {
        fullNameInput.value = storedUser.name || "";
        emailInput.value = storedUser.email || "";
        welcomeText.textContent = "Välkommen, " + (storedUser.name || storedUser.email) + "!";
    }

    const savedSettings = JSON.parse(localStorage.getItem("userSettings")) || {};
    newsletterSetting.checked = !!savedSettings.newsletter;
    darkModeSetting.checked = !!savedSettings.darkMode;

    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedUser = {
            ...storedUser,
            name: fullNameInput.value.trim(),
            email: emailInput.value.trim()
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        saveMessage.textContent = "Uppgifterna har sparats.";
        welcomeText.textContent = "Välkommen, " + (updatedUser.name || updatedUser.email) + "!";
    });

    saveSettingsBtn.addEventListener("click", function () {
        const settings = {
            newsletter: newsletterSetting.checked,
            darkMode: darkModeSetting.checked
        };

        localStorage.setItem("userSettings", JSON.stringify(settings));
        saveMessage.textContent = "Inställningarna har sparats.";
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.href = "signIn.html";
    });
});