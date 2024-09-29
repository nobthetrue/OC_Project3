let modal = null

const lienModal = document.querySelector(".modifier")
lienModal.addEventListener("click", function (event) {
    event.preventDefault()
    const modalOuverte = document.getElementById("modal")
    modalOuverte.style.display = null
    modalOuverte.removeAttribute("aria-hidden")
    modalOuverte.setAttribute("aria-modal", "true")
    modal = modalOuverte
    modal.addEventListener("click", closeModal)
    modal.querySelector(".btn-fermer-modal").addEventListener("click", closeModal)
    modal.querySelector(".modal-stop").addEventListener("click", stopPropagation)
})

const closeModal = function (event) {
    event.preventDefault()
    if (modal === null)
        return
        modal.style.display = "none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modal")
        modal.removeEventListener("click", closeModal)
        modal.querySelector(".btn-fermer-modal").removeEventListener("click", closeModal)
        modal.querySelector(".modal-stop").removeEventListener("click", stopPropagation)
        modal = null
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key ==="Esc") {
        closeModal(event)
    }
})

const titreSectionImagesWorks = document.getElementById("titlemodal");
const sectionImagesWorks = document.querySelector(".partie-supprimer-photo");

async function imageWorksGallerySuppression() {
    let works = 0;
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json();
    sectionImagesWorks.innerHTML = '';

    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        const divImage = document.createElement("div");
        divImage.style.position = "relative";
        divImage.style.width = "76px";
        divImage.style.height = "102px";
        divImage.style.marginTop = "20px";

        // Ajouter un attribut `data-id` à `divImage` pour stocker l'ID de l'image
        divImage.setAttribute("data-id", project.id);

        sectionImagesWorks.appendChild(divImage);

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.style.height = "102px";
        imageElement.style.width = "76px";

        const conteneurBtnSupprimer = document.createElement("button");
        conteneurBtnSupprimer.setAttribute("type", "button");
        conteneurBtnSupprimer.classList.add("btn-supprimer-image");
        conteneurBtnSupprimer.style.right = "5px";
        conteneurBtnSupprimer.style.top = "5px";
        conteneurBtnSupprimer.style.display = "flex";
        conteneurBtnSupprimer.style.justifyContent = "center";
        conteneurBtnSupprimer.style.alignItems = "center";
        conteneurBtnSupprimer.style.backgroundColor = "black";
        conteneurBtnSupprimer.style.position = "absolute";
        conteneurBtnSupprimer.style.height = "17px";
        conteneurBtnSupprimer.style.width = "17px";
        conteneurBtnSupprimer.style.borderRadius = "2px";
        conteneurBtnSupprimer.style.border = "none";

        const iconePoubelle = document.createElement("i");
        iconePoubelle.classList.add("fa-solid", "fa-trash-can");
        iconePoubelle.style.fontSize = "0.7em";
        iconePoubelle.style.color = "white";

        conteneurBtnSupprimer.appendChild(iconePoubelle);
        divImage.appendChild(conteneurBtnSupprimer);
        divImage.appendChild(imageElement);

        // Ajout de l'événement click pour supprimer l'image
        conteneurBtnSupprimer.addEventListener("click", async function (event) {
            event.preventDefault();
            
            // Récupérer l'ID de l'image depuis `data-id`
            const imageId = divImage.getAttribute("data-id");

            // Récupérer le token stocké dans localStorage
            const token = localStorage.getItem("authToken");

            if (!token) {
                console.error("Aucun token d'authentification trouvé. Veuillez vous connecter.");
                return;
            }

            try {
                // Préparation de la requête DELETE avec le token dans les en-têtes
                const worksDelete = {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Inclure le token JWT ici
                        "Content-Type": "application/json",
                    }
                };

                // Appel à l'API pour supprimer l'image
                const response = await fetch(`http://localhost:5678/api/works/${imageId}`, worksDelete);

                if (response.ok) {
                    // Si la suppression réussit, on retire l'image du DOM
                    divImage.remove();
                    console.log(`Photo avec l'ID ${imageId} supprimée.`);
                } else {
                    console.error(`Erreur lors de la suppression de l'image avec l'ID ${imageId}. Statut: ${response.status}`);
                }
            } catch (error) {
                console.error("Erreur réseau : ", error);
            }
        });
    }
}
// Appeler la fonction pour initialiser la galerie
imageWorksGallerySuppression();

const ouvertureFenetreAjoutPhoto = document.querySelector(".btn-ajouter-photo")
ouvertureFenetreAjoutPhoto.addEventListener("click", function (event) {
    event.preventDefault()
    
    /*Supprime 1ere section et ajoute la 2eme*/
    const sectionModalSupprimer = document.querySelector(".section-modal-supprimer")
    sectionModalSupprimer.style.display = "none";

    const sectionModalAjout = document.querySelector(".section-modal-ajout")
    sectionModalAjout.style.display = "flex"

    const btnRetour = document.querySelector(".btn-retour")
    btnRetour.removeAttribute("hidden")
    
    const divBtnFermerModal = document.querySelector(".div-btn-fermer-modal")
    divBtnFermerModal.style.justifyContent = "space-between"

    btnRetour.addEventListener("click", function (event) {
        event.preventDefault()

        // Masquer la section d'ajout de photo et réafficher la première section
        sectionModalAjout.style.display = "none";
        sectionModalSupprimer.style.display = "flex"; // Réaffiche la première section

        // Masquer à nouveau le bouton retour
        btnRetour.setAttribute("hidden", "true");

        // Réajuster la position du bouton fermer
        divBtnFermerModal.style.justifyContent = "flex-end";
    })
})

// function creerAjoutPhoto () {

// }
const fileReader = new FileReader()
const inputImage = document.getElementById("photo")
inputImage.addEventListener("change", function () {
    const file = inputImage.files[0];  // Obtenir le fichier sélectionné
    if (file) {
        fileReader.readAsDataURL(file); // Lire le fichier en tant que Data URL
    }

    // Lorsque la lecture est terminée, afficher l'image
    fileReader.onload = function(event) {
        event.preventDefault()
        const elementSupprimer = document.querySelector(".ajout-photo")
        elementSupprimer.style.display = "none"

        const imgElement = document.createElement('img'); // Créer un élément image
        imgElement.src = event.target.result;  // Lier l'URL de données à l'élément image
        imgElement.style.width = "130px";   // Fixer la taille maximale de l'image
        imgElement.style.height = "180px";  // Fixer la hauteur maximale de l'image

        const preview = document.getElementById('preview');
        preview.innerHTML = ''; // Vider le contenu précédent
        preview.appendChild(imgElement); // Ajouter l'image à l'écran
    };
});

const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const photo = document.getElementById("photo");
const btnValiderPhoto = document.querySelector(".btn-valider-photo");

// Fonction pour vérifier les champs et activer le bouton
function verifierChamps() {
    if (photo.files.length > 0 && titre.value.trim() != "" && categorie.value.trim() != "") {
        btnValiderPhoto.style.backgroundColor = "#1D6154"; // Activer le bouton

        // Ajout d'un événement click pour soumettre le travail
        btnValiderPhoto.addEventListener("click", envoyerNouveauTravail);
    } else {
        btnValiderPhoto.style.backgroundColor = ""; // Désactiver le bouton
        btnValiderPhoto.removeEventListener("click", envoyerNouveauTravail); // Retirer l'événement click si les champs sont invalides
    }
}

// Fonction pour envoyer le nouveau travail à l'API
async function envoyerNouveauTravail(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du bouton

    const token = localStorage.getItem("authToken");

    // Déterminer l'ID de la catégorie en fonction du texte sélectionné
    let categorieId;
    switch (categorie.value) {
        case "Objet":
            categorieId = 1;
            break;
        case "Appartements":
            categorieId = 2;
            break;
        case "Hotels & Restaurants":
            categorieId = 3;
            break;
        default:
            console.error("Catégorie non valide");
            return;
    }

    // Préparation des données avec FormData
    const formData = new FormData();
    formData.append("image", photo.files[0]); // Ajoute l'image sélectionnée
    formData.append("title", titre.value); // Ajoute le titre
    formData.append("category", categorieId); // Ajoute l'ID de la catégorie

    try {
        // Envoi de la requête POST avec les données du formulaire
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, // Inclure le token d'authentification
            },
            body: formData, // Le corps de la requête est le FormData
        });

        // Vérification de la réponse de l'API
        if (response.ok) {
            const nouveauTravail = await response.json();
            console.log("Travail ajouté avec succès :", nouveauTravail);

            // Optionnel : Tu peux ici mettre à jour l'interface avec le nouveau travail ajouté
        } else {
            console.error("Erreur lors de l'ajout du travail :", response.statusText);
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
}

// Écouteurs d'événements sur les champs pour vérifier les valeurs
titre.addEventListener("input", verifierChamps);
categorie.addEventListener("change", verifierChamps);
photo.addEventListener("change", verifierChamps);

verifierChamps(); // Initialiser la vérification des champs


// Sélection des éléments
// const titre = document.getElementById("titre");
// const categorie = document.getElementById("categorie");
// const photo = document.getElementById("photo");
// const btnValiderPhoto = document.querySelector(".btn-valider-photo");

// // Fonction pour vérifier les champs et activer le bouton
// function verifierChamps() {
//     if (photo.files.length > 0 && titre.value.trim() != "" && categorie.value.trim() != "") {
//         btnValiderPhoto.style.backgroundColor = "#1D6154"; // Activer le bouton

//         // Ajout d'un événement click pour soumettre le travail
//         btnValiderPhoto.addEventListener("click", envoyerNouveauTravail);
//     } else {
//         btnValiderPhoto.style.backgroundColor = ""; // Désactiver le bouton
//         btnValiderPhoto.removeEventListener("click", envoyerNouveauTravail); // Retirer l'événement click si les champs sont invalides
//     }
// }

// // Fonction pour envoyer le nouveau travail à l'API
// async function envoyerNouveauTravail(event) {
//     event.preventDefault(); // Empêcher le comportement par défaut du bouton

//     const token = localStorage.getItem("authToken");

//     // Préparation des données avec FormData
//     const formData = new FormData();
//     formData.append("image", photo.files[0]); // Ajoute l'image sélectionnée
//     formData.append("title", titre.value); // Ajoute le titre
//     formData.append("category", categorie.value); // Ajoute la catégorie

//     try {
//         // Envoi de la requête POST avec les données du formulaire
//         const response = await fetch("http://localhost:5678/api/works", {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`, // Inclure le token d'authentification
//             },
//             body: formData, // Le corps de la requête est le FormData
//         });

//         // Vérification de la réponse de l'API
//         if (response.ok) {
//             const nouveauTravail = await response.json();
//             console.log("Travail ajouté avec succès :", nouveauTravail);

//             // Optionnel : Tu peux ici mettre à jour l'interface avec le nouveau travail ajouté
//         } else {
//             console.error("Erreur lors de l'ajout du travail :", response.statusText);
//         }
//     } catch (error) {
//         console.error("Erreur lors de la requête :", error);
//     }
// }

// // Écouteurs d'événements sur les champs pour vérifier les valeurs
// titre.addEventListener("input", verifierChamps);
// categorie.addEventListener("change", verifierChamps);
// photo.addEventListener("change", verifierChamps);

// verifierChamps(); // Initialiser la vérification des champs

// const titre = document.getElementById("titre");
// const categorie = document.getElementById("categorie");
// const photo = document.getElementById("photo");
// const btnValiderPhoto = document.querySelector(".btn-valider-photo");

// // Fonction pour vérifier les champs et activer/désactiver le bouton
// function verifierChamps() {
//     if (photo.files.length > 0 && titre.value.trim() != "" && categorie.value.trim() != "") {
//         btnValiderPhoto.style.backgroundColor = "#1D6154";

//         let works = 0
//         function envoyerNouveauTravail() {
            
//             btnValiderPhoto.addEventListener("click", async function (event) {
//                 event.preventDefault()
                
//                 const token = localStorage.getItem("authToken");

//                 const nouveauTravail = {
//                     imageUrl : event.target.querySelector("#photo").file.length,
//                     title : event.target.querySelector("#titre").value,
//                     categoryId : event.target.querySelector("#categorie").value 
//                 }

//                 const chargeUtile = JSON.stringify(nouveauTravail)

//                 const reponse = await fetch("http://localhost:5678/api/works", {
//                     method: "POST",
//                     headers: {
//                         "Authorization": `Bearer ${token}`, // Inclure le token JWT ici
//                         "Content-Type": "application/json",
//                         "Content-Type": "multipart/form-data" 
//                     },
//                     body: chargeUtile
//                 });

//                 works = await reponse.json()

//                 if (reponse.ok) {
//                     nouveauTravail.add();
//                 }

//             })
//         }
//         envoyerNouveauTravail()

//     }
//         // Écouteurs d'événements sur les champs
//     titre.addEventListener("input", verifierChamps);
//     categorie.addEventListener("change", verifierChamps);
//     photo.addEventListener("change", verifierChamps);
// }

// verifierChamps()

