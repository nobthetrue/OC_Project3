let works = 0; // Déclarer works en dehors de la fonction

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

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}

fetchAndDisplayWorks();



const btnObjets = document.querySelector(".btn-filtre-objets");
btnObjets.addEventListener("click", function() {
    const objetsFiltrer = works.filter(function(work) {
        return work.categoryId === 1; // Utilisation de === pour comparer
    });

    // Met à jour la galerie avec les objets filtrés
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = '';

    objetsFiltrer.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
});

const btnAppartements = document.querySelector(".btn-filtre-appartements");
btnAppartements.addEventListener("click", function() {
    const appartementsFiltrer = works.filter(function(work) {
        return work.categoryId === 2; // Utilisation de === pour comparer
    });

    // Met à jour la galerie avec les objets filtrés
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = '';

    appartementsFiltrer.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
});

const btnHotelsEtRestaurants = document.querySelector(".btn-filtre-hotels-et-restaurants");
btnHotelsEtRestaurants.addEventListener("click", function() {
    const hotelsEtRestaurantsFiltrer = works.filter(function(work) {
        return work.categoryId === 3; // Utilisation de === pour comparer
    });

    // Met à jour la galerie avec les objets filtrés
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = '';

    hotelsEtRestaurantsFiltrer.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
});

const btnTous = document.querySelector(".btn-filtre-tous");
btnTous.addEventListener("click", function() {
        const tousFiltrer = works.filter(function(work) {
        return work.categoryId != 0;
        });
    

    // Met à jour la galerie avec les objets filtrés
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = '';

    tousFiltrer.forEach(function(project) {
        const figureElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = project.title;

        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);

        sectionWorks.appendChild(figureElement);
    });
});