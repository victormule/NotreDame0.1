document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
      "Décision politique.",
      "Déroger au droit commun",
      "Une pluralité d’usages.",
      "Entre sacralités religieuse et patrimoniale",
      "Ethnographier un chantier d’exception"
    ];
  
    let index = 0;
    const textContainer = document.getElementById("textContainer");
  
    function afficherPhrase() {
      textContainer.style.opacity = "0"; // Disparition progressive
  
      setTimeout(() => {
        textContainer.textContent = phrases[index]; // Changer la phrase
        textContainer.style.opacity = "1"; // Apparition progressive
        index = (index + 1) % phrases.length; // Passer à la phrase suivante
      }, 1000); // Temps de disparition avant changement
    }
  
    // Lancer l'affichage des phrases en boucle
    afficherPhrase();
    setInterval(afficherPhrase, 4000); // Toutes les 4 secondes (3s visible + 1s transition)
  });
  