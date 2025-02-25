let sketch2 = (p) => {
    let img;
    let alphaValue = 0;
    let canvas2; // on stockera notre canvas pour régler le style
  
    p.preload = function() {
      img = p.loadImage('assets/image/NotreDame1.jpg');
    };
  
    p.setup = function() {
      // Crée un canvas par-dessus celui du sketch1
      canvas2 = p.createCanvas(p.windowWidth, p.windowHeight);
      
      // Force la position absolue et un z-index élevé
      canvas2.position(0, 0);
      canvas2.style('z-index', '100');
      // Si tu ne veux pas bloquer les clics sur le sketch 1, ajoute :
      // canvas2.style('pointer-events', 'none');
  
      p.imageMode(p.CORNER);
  
      // Optionnel : Activer le mode alpha dans createCanvas
      // => Dans p5 moderne, c'est souvent permis par défaut.
      // p.background(0, 0); // ou p.clear();
    };
  
    p.draw = function() {
      // Effacer le fond pour voir le sketch1 en dessous
      p.clear(); 
      
      // Augmente l'opacité progressivement (max 255)
      if (alphaValue < 255) {
        alphaValue += 2; // Ajuste la vitesse de fondu
      }
      
      p.tint(255, alphaValue);
      p.image(img, 0, 0, p.width, p.height);
    };
  
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
  