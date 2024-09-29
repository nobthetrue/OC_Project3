let works = []; // Déclarer works en dehors de la fonction

async function fetchAndDisplayWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json(); // Assigner les données à la variable works
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = ''; // Vider la section avant d'ajouter les nouvelles figures

    for (let i = 0; i < works.length; i++) {
        const project = works[i];

        const figureElement = document.createElement("figure");
        sectionWorks.appendChild(figureElement);

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;
        figcaptionElement.style.marginTop = "5px"

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}

fetchAndDisplayWorks();

// Sélectionner tous les boutons de filtre
const allButtons = document.querySelectorAll("#btn-gallery");

// Fonction pour gérer les boutons actifs
function toggleActiveButton(activeButton) {
    allButtons.forEach(button => {
        button.classList.remove("active");  // Retirer la classe active de tous les boutons
    });
    activeButton.classList.add("active");  // Ajouter la classe active au bouton cliqué
}

// Fonction pour mettre à jour la galerie avec les travaux filtrés
function updateGallery(filteredWorks) {
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = ''; // Vider la galerie actuelle

    filteredWorks.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl; // Utilise l'URL de l'image du projet

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
}

// Ajout d'événements pour chaque bouton
allButtons.forEach(button => {
    button.addEventListener("click", function() {
        toggleActiveButton(button);  // Changer le style actif sur le bouton cliqué

        let filteredWorks;
        switch (button.innerText) {
            case 'Objets':
                filteredWorks = works.filter(work => work.categoryId === 1); // ID pour "Objets"
                break;
            case 'Appartements':
                filteredWorks = works.filter(work => work.categoryId === 2); // ID pour "Appartements"
                break;
            case 'Hôtels & restaurants':
                filteredWorks = works.filter(work => work.categoryId === 3); // ID pour "Hôtels & Restaurants"
                break;
            default:
                filteredWorks = works;  // Affiche tous les travaux
                break;
        }
        updateGallery(filteredWorks);  // Mettre à jour la galerie
    });
});