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

        conteneurBtnSupprimer.addEventListener("click", async function (event) {
            event.preventDefault();
            
            const imageId = divImage.getAttribute("data-id");

            const token = localStorage.getItem("authToken");

            if (!token) {
                return;
            }

            const worksDelete = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            };

            const response = await fetch(`http://localhost:5678/api/works/${imageId}`, worksDelete);

            if (response.ok) {
                divImage.remove();
            }
        });
    }
}
imageWorksGallerySuppression();

const ouvertureFenetreAjoutPhoto = document.querySelector(".btn-ajouter-photo")
ouvertureFenetreAjoutPhoto.addEventListener("click", function (event) {
    event.preventDefault()
    
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

        sectionModalAjout.style.display = "none";
        sectionModalSupprimer.style.display = "flex"; 

        btnRetour.setAttribute("hidden", "true");

        divBtnFermerModal.style.justifyContent = "flex-end";
    })
})

const fileReader = new FileReader()
const inputImage = document.getElementById("photo")
inputImage.addEventListener("change", function () {
    const file = inputImage.files[0]; 
    if (file) {
        fileReader.readAsDataURL(file); 
    }

    fileReader.onload = function(event) {
        event.preventDefault()
        const elementSupprimer = document.querySelector(".ajout-photo")
        elementSupprimer.style.display = "none"

        const imgElement = document.createElement('img');
        imgElement.src = event.target.result; 
        imgElement.style.width = "130px";  
        imgElement.style.height = "180px"; 

        const preview = document.getElementById('preview');
        preview.innerHTML = ''; 
        preview.appendChild(imgElement); 
    };
});

const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const photo = document.getElementById("photo");
const btnValiderPhoto = document.querySelector(".btn-valider-photo");

function verifierChamps() {
    if (photo.files.length > 0 && titre.value.trim() != "" && categorie.value.trim() != "") {
        btnValiderPhoto.style.backgroundColor = "#1D6154"; 

        btnValiderPhoto.addEventListener("click", envoyerNouveauTravail);
    } else {
        btnValiderPhoto.style.backgroundColor = ""; 
        btnValiderPhoto.removeEventListener("click", envoyerNouveauTravail);
    }
}

async function envoyerNouveauTravail(event) {
    event.preventDefault(); 

    const token = localStorage.getItem("authToken");

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
            return;
    }

    const formData = new FormData();
    formData.append("image", photo.files[0]);
    formData.append("title", titre.value);
    formData.append("category", categorieId);

    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
    });
}

titre.addEventListener("input", verifierChamps);
categorie.addEventListener("change", verifierChamps);
photo.addEventListener("change", verifierChamps);

verifierChamps(); 