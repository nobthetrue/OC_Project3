const formulaireConnexion = document.querySelector(".formulaire-connexion");

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
        // Empêche le comportement par défaut du formulaire (rechargement de la page)
        event.preventDefault();

        // Récupère les valeurs du formulaire
        const identifiants = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        };
        console.log(identifiants)
        // Convertit les identifiants en chaîne JSON
        const chargeUtile = JSON.stringify(identifiants);

        try {
            // Effectue la requête POST vers l'API de connexion
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });
            console.log(reponse)

            // Si la réponse est correcte (statut 200)
            if (reponse.ok) {
                const data = await reponse.json();

                // Stocke le token d'authentification dans le localStorage
                window.localStorage.setItem("authToken", data.token);
                
                // Redirige vers la page d'accueil
                window.location.href = "/FrontEnd/admin.html";

            } else {
                // Gère les erreurs de connexion (par exemple, mauvais identifiants)
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

// const logIn = document.getElementById("login")

// const data = await reponse.json();
// window.localStorage.setItem("authToken", data.token);
// const token = window.localStorage.getItem("authToken")
// if (token === true) {
//     logIn.innerText = "login"
// } else {
//     logIn.innerText = "logout"
// }