/*const btnModifier = document.querySelector(".modifier")
btnModifier.addEventListener("click", function(event) {
    event.preventDefault()
    btnModifier.innerHTML = ""
    
    const conteneurModifier = document.createElement("div")
    conteneurModifier.classList.add("conteneur")

    const conteneurFormulaire = document.createElement("div")
    conteneurFormulaire.classList.add("conteneur-formulaire")
    conteneurModifier.appendChild(conteneurFormulaire)
    
    const croixQuitter = document.createElement("i")
    croixQuitter.classList.add("fa-solid fa-xmark")
    conteneurModifier.appendChild(croixQuitter)

    const titreGalerieModifier = document.createElement("h3")
    titreGalerieModifier.innerText = "Galerie Photo"
    conteneurModifier.appendChild(titreGalerieModifier)

    

    btnModifier.appendChild(conteneurModifier)

})*/

const lienModal = document.querySelector(".modifier")
lienModal.addEventListener("click", function (event) {
    event.preventDefault()
    const modal = querySelector(".modal")
    const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("ariamodal", "true")
    modal = target
    modal.addEventListener("click")
})