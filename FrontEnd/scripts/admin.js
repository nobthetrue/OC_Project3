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
        divImage.style.marginTop = "20px"

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

        conteneurBtnSupprimer.addEventListener("click", function (event) {
            event.preventDefault();
            divImage.remove();
        });
    }
}

imageWorksGallerySuppression();

const ouvertureFenetreAjoutPhoto = document.querySelector(".btn-ajouter-photo")
ouvertureFenetreAjoutPhoto.addEventListener("click", function (event) {
    event.preventDefault()
    
    /*Supprime 1ere section et ajoute la 2eme*/
    const sectionModalSupprimer = document.querySelector(".section-modal-supprimer")
    sectionModalSupprimer.remove()

    const sectionModalAjout = document.querySelector(".section-modal-ajout")
    sectionModalAjout.style.display = "flex"

    const btnRetour = document.querySelector(".btn-retour")
    btnRetour.removeAttribute("hidden")
    
    const divBtnFermerModal = document.querySelector(".div-btn-fermer-modal")
    divBtnFermerModal.style.justifyContent = "space-between"

    const partieAjouterPhoto = document.getElementById("partie-ajouter-photo")

})

function creerSupprimerPhoto () {

}

function creerAjoutPhoto () {

}