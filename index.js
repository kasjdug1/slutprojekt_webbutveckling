
document.addEventListener("DOMContentLoaded", function () {

    //  SIGN UP =================
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirm = document.getElementById("confirmPassword").value;

            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
            }

            const user = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem("user", JSON.stringify(user));

            alert("Account created!");

            localStorage.setItem("loggedIn", "true");
            window.location.href = "användarprofil.html";

        });
    }


    //  LOGIN 
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Du måste skapa konto först");
                return;
            }

            if (email === user.email && password === user.password) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "användarprofil.html";
            } else {
                alert("Fel email eller lösenord");
            }
        });
    }


});


// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "signIn.html";
}

