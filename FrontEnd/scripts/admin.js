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

// const ouvrirModal = function(e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttribute("href"))
//     target.style.display = null
//     target.removeAttribute("aria-hidden")
//     target.setAttribute("aria-modal", "true")
// }

// document.querySelectorAll(".modifier").forEach(a => {
//     a.addEventListener("click", ouvrirModal)
// })

