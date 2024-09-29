const formulaireConnexion = document.getElementById("formulaire-connexion");

formulaireConnexion.addEventListener("submit", function(event) {

    const emailRegEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    const emailConnexion = document.getElementById("email");

    const passwordConnexion = document.getElementById("password");

    if (emailConnexion.value.trim() == "") {
        let messageErreurLogin = document.getElementById("error-message-email");
        messageErreurLogin.innerHTML = "Veuillez saisir votre e-mail";
        event.preventDefault();
    }  else if (emailRegEx.test(emailConnexion.value) == false) {
        let messageErreurLogin = document.getElementById("error-message-email");
        messageErreurLogin.innerHTML = "Veuillez saisir un e-mail valide";
        event.preventDefault();
    }

    if (passwordConnexion.value.trim() == "") {
        let messageErreurLogin = document.getElementById("error-message-password");
        messageErreurLogin.innerHTML = "Veuillez saisir votre mot de passe";
        event.preventDefault();
    }
})

function listenerEnvoiIdentifiant() {

    formulaireConnexion.addEventListener("submit", async function(event) {
        event.preventDefault();

        const identifiants = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        };
        console.log(identifiants)
        const chargeUtile = JSON.stringify(identifiants);

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });
            console.log(reponse)

            if (reponse.ok) {
                const data = await reponse.json();

                window.localStorage.setItem("authToken", data.token);
                
                window.location.href = "admin.html";

            } else {
                const errorMessage = document.getElementById("error-message");
                errorMessage.innerText = "Identifiants incorrects. Veuillez réessayer.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            // Affiche un message d'erreur si la requête a échoué
            const errorMessage = document.getElementById("error-message");
            errorMessage.innerText = "Une erreur est survenue. Veuillez réessayer plus tard.";
            errorMessage.style.display = "block";
        }
    });
}

listenerEnvoiIdentifiant()
