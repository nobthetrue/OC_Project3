let works = [];

async function fetchAndDisplayWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json();
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = '';

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

const allButtons = document.querySelectorAll("#btn-gallery");

function toggleActiveButton(activeButton) {
    allButtons.forEach(button => {
        button.classList.remove("active");
    });
    activeButton.classList.add("active");
}

// Fonction pour mettre à jour la galerie avec les travaux filtrés
function updateGallery(filteredWorks) {
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = ''; 

    filteredWorks.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
}

allButtons.forEach(button => {
    button.addEventListener("click", function() {
        toggleActiveButton(button); 

        let filteredWorks;
        switch (button.innerText) {
            case 'Objets':
                filteredWorks = works.filter(work => work.categoryId === 1);
                break;
            case 'Appartements':
                filteredWorks = works.filter(work => work.categoryId === 2); 
                break;
            case 'Hôtels & restaurants':
                filteredWorks = works.filter(work => work.categoryId === 3); 
                break;
            default:
                filteredWorks = works; 
                break;
        }
        updateGallery(filteredWorks); 
    });
});