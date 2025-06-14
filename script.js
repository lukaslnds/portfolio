function openModal() {
    var modal = document.getElementById("cvModal");
    modal.style.display = "block";

    // Cacher la barre de navigation pendant l'affichage de la modale
    document.querySelector('nav').style.display = 'none';
}

// Fermer la modale
function closeModal() {
    var modal = document.getElementById("cvModal");
    modal.style.display = "none";
    
    // Rétablir la barre de navigation une fois la modale fermée
    document.querySelector('nav').style.display = 'flex';
}

// Lorsque l'utilisateur clique en dehors de l'image, on ferme la modale
window.onclick = function(event) {
    var modal = document.getElementById("cvModal");
    if (event.target === modal) {
        closeModal();
    }
}
// Sélection de l'image dans la modale
const modalContent = document.querySelector('.modal-content');

// Initialisation du facteur de zoom
let zoomFactor = 1;

// Fonction pour appliquer le zoom
function zoomImage(event) {
  // Empêche le défilement de la page lors du zoom avec la molette
  event.preventDefault();

  // Si l'utilisateur fait défiler la molette de la souris
  if (event.deltaY < 0) {
    zoomFactor *= 1.1; // Zoom avant
  } else {
    zoomFactor /= 1.1; // Zoom arrière
  }

  // Limite du zoom
  zoomFactor = Math.max(1, Math.min(zoomFactor, 3)); // Min 1x, max 3x

  // Applique le zoom à l'image
  modalContent.style.transform = `translate(-50%, -50%) scale(${zoomFactor})`;
}

// Ajoute un écouteur d'événement pour la molette de la souris
modalContent.addEventListener('wheel', zoomImage);

// Fonction pour zoomer avec le clic gauche de la souris
let isMouseDown = false;

modalContent.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // Clic gauche
    isMouseDown = true;
    event.preventDefault(); // Empêche le comportement par défaut (sélection de texte)
  }
});

modalContent.addEventListener('mouseup', () => {
  isMouseDown = false;
});

modalContent.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    // Calcul du zoom en fonction du mouvement de la souris
    const movement = event.movementY; // Distance parcourue en Y (haut/bas)

    if (movement < 0) {
      zoomFactor *= 1.1; // Zoom avant
    } else {
      zoomFactor /= 1.1; // Zoom arrière
    }

    // Limite du zoom
    zoomFactor = Math.max(1, Math.min(zoomFactor, 3)); // Min 1x, max 3x

    // Applique le zoom à l'image
    modalContent.style.transform = `translate(-50%, -50%) scale(${zoomFactor})`;
  }
});
// Ajoute un offset au défilement pour compenser la barre de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - document.querySelector('nav').offsetHeight,
      behavior: 'smooth'
    });
  });
});
