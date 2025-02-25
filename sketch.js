// sketch.js
// p5.js

// ======================
// Variables principales
// ======================
let video;
let canvas;
let myFont;
let sound1;
let sound2;
let sound3;

// Images
let inrapImage;  // Image d'origine ("equipe_inrap_sarcophage.jpg")
let dracImage;   // Image DRAC ("equipe-DRAC.jpg")
let lrmhImage;   // Image LRMH ("equipe-LRMH.jpg")

// Contrôle de l'état d'affichage
let showDrac = false; 
let showLrmh = false; 
let tallDrac = 0;
let tallLrmh = 0;
// (false => image inrapImage & paragraphe2 par défaut)

// Boutons
let infoButton;
let dracButton;
let lrmhButton;

// Contrôle des textes
let infoVisible = true;
let playing = false;

// ===========================
// Premier cercle rouge (#1)
// ===========================
let circleX, circleY;
let baseSize = 50;
let sizeChange = 0;
let pulseSpeed = 0.5;
let isVideoPaused = false;
let showRect = false; // déclenche l'affichage du rectangle #1

// ===========================
// Deuxième cercle rouge (#2)
// ===========================
let circle2X, circle2Y;
let baseSize2 = 50;
let sizeChange2 = 0;
let pulseSpeed2 = 0.5;
let isVideoPaused2 = false;
let showRect2 = false; // déclenche l'affichage du rectangle #2

// ===========================
// Troisième cercle rouge (#3)
// ===========================
let circle3X, circle3Y;
let baseSize3 = 50;
let sizeChange3 = 0;
let pulseSpeed3 = 0.5;
let isVideoPaused3 = false;
let showRect3 = false; // déclenche l'affichage du rectangle #2

// ======================
// Options de textes animés
// ======================
const appearDuration = 2; 
const fadeDuration   = 2; 
const totalDuration  = 8; 

// ======================
// Données des textes défilants
// ======================
const infoData = [
  { start: 0,  text: "Rue du Cloître Notre-Dame.", lineIndex: 0  },
  { start: 3,  text: "Interdiction d’accès au chantier.", lineIndex: 1  },
  { start: 5,  text: "Obligation du port d’équipements de protection.", lineIndex: 2 },
  { start: 18, text: "Le pédiluve permet de nettoyer les semelles des chaussures.", lineIndex: 0  },
  { start: 18, text: "Pour éviter de transporter des poussières de plomb.", lineIndex: 1  },
  { start: 26, text: "L’entrée vers le chantier est très réglementée.", lineIndex: 0  },
  { start: 26, text: "Les ethnologues doivent avoir une autorisation...", lineIndex: 1  },
  { start: 58, text: "le SAS                ", lineIndex: 0  },
  { start: 58, text: "Espace de passage entre la zone propre et la zone plombée.", lineIndex: 1 },
  { start: 60, text: "Il faut s’habiller en combinaison et laisser ses vêtements.", lineIndex: 2},
  { start: 60, text: "propres dans des casiers.                              ", lineIndex: 3},
];

// Premier paragraphe (rectangle #1)
const paragraph = "Passage menant dans la zone de la « base vie » où se trouvent les bureaux des entreprises, des architectes et de la maitrise d’ouvrage, des salles de réunion, les vestiaires (SAS), des espaces de repos et la cantine. C’est une zone « propre » car décontaminée des poussières de plomb.";

// Second paragraphe (rectangle #2)
const paragraph2 = "Les combinaisons sont différentes selon le statut des personnes entrant sur le chantier et selon leur degré de contact avec des zones fortement polluées au plomb. Les visiteurs occasionnels portent des combinaisons jetables, alors que les entreprises ou les membres permanents du chantier ont des combinaisons permanentes qu’ils laissent dans le vestiaire de la « zone polluée » du chantier. Lorsque les personnes sont au contact de zones fortement plombées, elles portent des masques à ventilation assistée.";

// Troisème paragraphe (rectangle #2)
const paragraph3 = "L’acronyme DRAC signifie « direction régionale des affaires culturelles ». Depuis 1977, ce service déconcentré du ministère de la Culture est chargé de conduire la politique culturelle de l’État dans la région et les départements qui la composent. Si vous projetez de réaliser des travaux sur un monument historique ou sur un édifice situé dans un espace protégé, l’intervention de la DRAC sera nécessaire.                                                                                                      .";

// Quatrième paragraphe (rectangle #2)
const paragraph4 = "Le LRMH est chargé de mener des études scientifiques et techniques ainsi que des recherches sur la conservation des édifices et objets du patrimoine culturel protégés au titre des Monuments historiques. Il en étudie les matériaux constitutifs et les phénomènes d’altération qui en compromettent la conservation. Il travaille sur les traitements à appliquer aux œuvres altérées, ainsi que sur les conditions de conservation des monuments et objets étudiés. Il diffuse le plus largement possible le résultat de ses études et de ses recherches.";

// Cinquième paragraphe (rectangle #3)
const paragraph5 = "Azzedine Hedna. Il est une figure emblématique du chantier. Il symbolise l’entente entre les différents corps de métiers (échafaudeurs, cordistes, scientifiques, logisticiens, charpentiers, etc). Azzedine Hedna s'était acquis l'amitié de tous et incarnait véritablement l'état d'esprit de cette magnifique aventure humaine.";

// =====================================================================
// Les fonctions drawJustifiedParagraph / findFittingTextSize / 
// measureParagraphHeight se trouvent dans justification.js
// =====================================================================

function preload() {
  // Charger les images avant setup
  inrapImage = loadImage('assets/image/equipe_inrap_sarcophage.jpg');
  dracImage  = loadImage('assets/image/equipe-DRAC.jpg');
  lrmhImage  = loadImage('assets/image/equipe-LRMH.jpg'); // NOUVELLE IMAGE
  AzzedineImage  = loadImage('assets/image/AzzedineHedna.png'); // NOUVELLE IMAGE
  img = loadImage('assets/image/NotreDame1.jpg');
  sound1 = loadSound('assets/sound/Clochette.wav');
  sound2 = loadSound('assets/sound/cloche2.mp3');
  sound3 = loadSound('assets/sound/Cloche1.mp3');
  //myFont = loadFont('assets/font/TypoSlab_Irregular_Demo.otf');
  myFont = loadFont('assets/font/hellogoodoldstyle.ttf');
  
}

function setup() {
  // Crée le canvas
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'none');
  textFont('Consolas');

  // Vidéo
  video = createVideo('assets/video/entree-chantier-sas-v1.mp4');
  video.hide();
  video.elt.controls = false;

  // => QUAND la vidéo est terminée :
  video.onended(() => {
    // Arrête le sketch #1 (facultatif).
    noLoop(); 
    // Lance le second sketch p5
    new p5(sketch2);
  });

  // Keyframes pour l'animation "pulseToRight"
  const styleElt = createElement('style', `
    @keyframes pulseToRight {
      0% { transform: translateX(0px); }
      50% { transform: translateX(10px); }
      100% { transform: translateX(0px); }
    }

    @keyframes subtlePulse {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `);
  document.head.appendChild(styleElt.elt);

  // Bouton Info
  infoButton = createButton("");
  infoButton.position(-20, 15);
  infoButton.style('position', 'absolute');
  infoButton.style('border', 'none');
  infoButton.style('outline', 'none');
  infoButton.style('cursor', 'pointer');

  styleInfoButton(); // état initial
  infoButton.mousePressed(() => {
    infoVisible = !infoVisible;
  
    sound2.play();
    styleInfoButton();
  });
  infoButton.mouseOver(() => {
    let curWidth = parseInt(infoButton.style('width')) || 200;
    let newW = (curWidth + 10) + 'px';
    infoButton.html('INFO'); 
    infoButton.style('width', newW);
    infoButton.style('background', 'rgba(255,165,0,0.9)');
  });
  infoButton.mouseOut(() => {
    infoButton.html(''); 
    styleInfoButton();
  });
  infoButton.hide(); // caché au début



  // Bouton PLAY
  const playBtn = document.getElementById("playButton");
  playBtn.addEventListener("click", () => {
    document.getElementById("welcomeScreen").style.display = "none";
    canvas.style('display', 'block');
    infoButton.show();
    playing = true;
    video.play();
  });

  // ========================
  // Bouton DRAC (orange)
  // ========================
  dracButton = createButton("DRAC");
  dracButton.size(100, 50);
  dracButton.style('border', 'none');
  dracButton.style('font-weight', 'bold');
   // Biseau + pulsation
   dracButton.style('clip-path', 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)');
   dracButton.style('animation', 'subtlePulse 1.5s infinite ease-in-out');
   // Couleur de fond par défaut
   dracButton.style('background-color', 'rgba(0,0,255,0.5)');
   dracButton.style('color', 'white');

  dracButton.hide(); // Masqué par défaut

  // Toggle sur DRAC
  dracButton.mousePressed(() => {
    showDrac = !showDrac;
    // Si on active DRAC, on désactive LRMH
    if (showDrac) {
      sound3.play();
      showLrmh = false;
      dracButton.style('opacity', '1');   // opaque
      lrmhButton.style('opacity', '0.5'); // LRMH s'éteint
      dracButton.size(120, 50);
      lrmhButton.size(100, 50);
      tallDrac = 20;
      tallLrmh = 0;
    } else {
      sound3.stop();
      dracButton.style('opacity', '0.5');
      dracButton.size(100, 50);
      tallDrac = 0;
    }
  });

  // =========================
  // Bouton LRMH (bleu)
  // =========================
  lrmhButton = createButton("LRMH");
  lrmhButton.size(100, 50);
  lrmhButton.style('border', 'none');
  lrmhButton.style('font-weight', 'bold');
  // Biseau + pulsation
  lrmhButton.style('clip-path', 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)');
  lrmhButton.style('animation', 'subtlePulse 1.5s infinite ease-in-out');
  // Couleur bleue translucide
  lrmhButton.style('background-color', 'rgba(255,100,0,0.5)');
  lrmhButton.style('color', 'white');
  lrmhButton.hide();

  // Toggle sur LRMH
  lrmhButton.mousePressed(() => {
    showLrmh = !showLrmh;
    // Si on active LRMH, on désactive DRAC
    if (showLrmh) {
      sound3.play();
      showDrac = false;
      lrmhButton.style('opacity', '1');
      dracButton.style('opacity', '0.5');
      lrmhButton.size(120, 50);
      dracButton.size(100, 50);
      tallLrmh = 20;
      tallDrac = 0;
    } else {
      sound3.stop();
      lrmhButton.style('opacity', '0.5');
      lrmhButton.size(100, 50);
      tallLrmh = 0;
    }
  });

  // Positions initiales des cercles
  circleX = 150;
  circleY = height / 2;
  circle2X = 150;
  circle2Y = height / 2;
  circle3X = 150;
  circle3Y = height / 2;
}

function draw() {
  if (!playing) return;
  background(0);
  image(video, 0, 0, width, height);

  // Pulsation
  updatePulsation();

  const currentTime = video.time();

  // 1) Textes animés
  if (infoVisible) {
    let lineSpaceParagraphe = height * 0.06;
    let baseY = 50;
    for (let info of infoData) {
      let localTime = currentTime - info.start;
      if (localTime < 0 || localTime > totalDuration) continue;

      // "Machine à écrire"
      let typedProgress = 1;
      if (localTime < appearDuration) {
        typedProgress = map(localTime, 0, appearDuration, 0, 1, true);
      }

      // Fade-out
      let alphaValue = 255;
      let fadeStart = totalDuration - fadeDuration;
      if (localTime > fadeStart) {
        alphaValue = map(localTime, fadeStart, totalDuration, 255, 0, true);
      }

      let charsToShow = floor(typedProgress * info.text.length);
      let textToDraw = info.text.substring(0, charsToShow);

      let posY = baseY + (info.lineIndex * lineSpaceParagraphe);

      push();
      fill(255, alphaValue);
      let tS = min(width, height) * 0.06;
      textSize(tS);
      textAlign(LEFT, TOP);
      text(textToDraw, 10, posY);
      pop();
    }
  }

  // 2) Premier cercle (#1) : 26..32 s
  if (currentTime >= 26 && currentTime < 32) {
    drawRedCircle(
      circleX, circleY,
      baseSize, sizeChange, pulseSpeed,
      showRect,
      () => {
        drawWhiteRectAndText(paragraph, {
          useColumnRight: false,
          offsetY: 200,
          rectScale: 0.35
        });
      }
    );
  }

  // 3) Deuxième cercle (#2) : 42..50 s
  if (currentTime >= 42 && currentTime < 50) {
    drawRedCircle(
      circle2X, circle2Y,
      baseSize2, sizeChange2, pulseSpeed2,
      showRect2,
      () => {
        // Choix du paragraphe
        let selectedParagraph;
        if (showDrac) {
          selectedParagraph = paragraph3; 
        } else if (showLrmh) {
          selectedParagraph = paragraph4;
        } else {
          selectedParagraph = paragraph2; 
        }

        drawWhiteRectAndText(selectedParagraph, {
          useColumnRight: true,
          showImage: true 
        });
      }
    );
  }

   // 3) Troisième cercle (#3) : 120..128 s
if (currentTime >= 111 && currentTime < 116) {
  drawRedCircle(
    circle3X, circle3Y,
    baseSize3, sizeChange3, pulseSpeed3,
    showRect3,
    () => {
      // ICI on appelle le rectangle #3
      // => On passe isCircle3: true pour dire qu'on veut la photo Azzedine
      drawWhiteRectAndText(paragraph5, {
        useColumnRight: true,
        showImage: true,
        isCircle3: true
      });
    }
  );
}

  // ==================================
  // Affichage (ou non) des boutons DRAC & LRMH
  // ==================================
  if ((currentTime >= 42 && currentTime < 50) && showRect2) {
    // On affiche les deux boutons
    dracButton.show();
    lrmhButton.show();

    // Position du bouton DRAC
    let btnX = (width / 3 + width / 3) - 100 ; 
    let btnY = (height / 2) - 150; 
    dracButton.position(btnX - tallDrac, btnY);

    // On place LRMH en-dessous (ajuster le +60 px par ex.)
    lrmhButton.position(btnX - tallLrmh, btnY + 60);

  } else {
    // On masque tout
    dracButton.hide();
    lrmhButton.hide();

    // Reset si on sort de la zone
    if (showDrac || showLrmh) {
      showDrac = false;
      showLrmh = false;
      dracButton.style('opacity', '0.5');
      lrmhButton.style('opacity', '0.5');
    }
  }
}

// ========================================
// Fonctions de dessin du rectangle #2
// ========================================
function drawWhiteRectAndText(textToShow, config = {}) {
  push();

  let useColRight = config.useColumnRight || false;
  let showImageFlag = config.showImage || false;

  if (useColRight) {
    let colW = width / 3;
    let colH = height; 
    let rectX = width - colW / 2; 
    let rectY = colH / 2;         

    fill(255, 255, 255, 220);
    noStroke();
    rectMode(CENTER);
    rect(rectX, rectY, colW, colH);

    let margin = 60;
    let insideX = rectX - colW / 2 + margin;
    let insideY = rectY - colH / 2 + margin;
    let usableWidth = colW - 2 * margin;

    let currentY = insideY;
    if (showImageFlag) {
      let selectedImage;
    
      // 1) Si on est dans le cercle #3 => Azzedine
      if (config.isCircle3) {
        selectedImage = AzzedineImage;
      }
      // 2) Sinon, logique habituelle
      else if (showDrac) {
        selectedImage = dracImage;
      } else if (showLrmh) {
        selectedImage = lrmhImage;
      } else {
        selectedImage = inrapImage;
      }

      let imgW = usableWidth * 0.8;
      let ratio = selectedImage.height / selectedImage.width;
      let imgH = imgW * ratio;

      let centerX = insideX + (usableWidth - imgW) / 2;
      image(selectedImage, centerX, currentY, imgW, imgH);
      currentY += imgH + 20;
    }

    fill(0);
    textAlign(LEFT, TOP);
    let textAvailableHeight = (insideY + colH - margin) - currentY;
    let finalTS = findFittingTextSize(textToShow, usableWidth, textAvailableHeight);
    textSize(finalTS);
    drawJustifiedParagraph(textToShow, insideX, currentY, usableWidth, finalTS, 1.3);

  } else {
    // Rectangle centré (pour #1)
    let offsetY = config.offsetY || 200;
    let rectScale = config.rectScale || 0.35;

    let rectW = 0.6 * width;
    let rectH = rectScale * height;
    let rectX = width / 2;
    let rectY = (height / 3) + offsetY;

    if (rectY + rectH / 2 > height) {
      rectY = height - rectH / 2 - 20;
    }

    fill(255, 255, 255, 220);
    noStroke();
    rectMode(CENTER);
    rect(rectX, rectY, rectW, rectH);

    fill(0);
    textAlign(LEFT, TOP);

    let margin = 0.05 * rectW;
    let usableWidth = rectW - 2 * margin;
    let insideX = rectX - rectW / 2 + margin;
    let insideY = rectY - rectH / 2 + margin;
    let textAvailableHeight = rectH - 2 * margin;

    let finalTS = findFittingTextSize(textToShow, usableWidth, textAvailableHeight);
    textSize(finalTS);
    drawJustifiedParagraph(textToShow, insideX, insideY, usableWidth, finalTS, 1.3);
  }

  pop();
}

// ===========================
// Fonctions utilitaires
// ===========================


function styleInfoButton() {
  let w, h, bg;
  if (infoVisible) {
    w = 200; // plus grand
    h = 30;
    bg = 'rgba(255,165,0,0.7)';
  } else {
    w = 150;
    h = 30;
    bg = 'rgba(255,165,0,0.4)';
  }
  infoButton.style('width', w + 'px');
  infoButton.style('height', h + 'px');
  infoButton.style('background', bg);
  infoButton.style('clip-path', 'polygon(0 0, 100% 0, 80% 100%, 0 100%)');
  infoButton.style('animation', 'pulseToRight 1.5s infinite ease-in-out');
}

function drawRedCircle(x, y, baseSz, varSize, spd, showRectFlag, drawFn) {
  push();
  strokeWeight(4);
  let currentRadius = (baseSz + varSize);
  let d = dist(mouseX, mouseY, x, y);
  let hovered = (d < currentRadius / 2);

  let fillColor = hovered ? color(237, 34, 93, 230) : color(237, 34, 93, 180);
  fill(fillColor);
  stroke(255);

  let drawSize = hovered ? currentRadius + 10 : currentRadius;

  if (showRectFlag) {
    ellipse(x, y, baseSz, baseSz);
    drawFn(); 
  } else {
    ellipse(x, y, drawSize, drawSize);
  }
  pop();
}

function updatePulsation() {
  if (!showRect) {
    sizeChange += pulseSpeed;
    if (sizeChange > 3 || sizeChange < -3) {
      pulseSpeed *= -1;
    }
  }
  if (!showRect2) {
    sizeChange2 += pulseSpeed2;
    if (sizeChange2 > 3 || sizeChange2 < -3) {
      pulseSpeed2 *= -1;
    }
  }
  if (!showRect3) {
    sizeChange3 += pulseSpeed3;
    if (sizeChange3 > 3 || sizeChange3 < -3) {
      pulseSpeed3 *= -1;
    }
  }
}

function mousePressed() {
  if (!playing) return;
  const currentTime = video.time();

  // Cercle #1 (26..32 s)
  if (currentTime >= 26 && currentTime < 32) {
    let d = dist(mouseX, mouseY, circleX, circleY);
    let radius = showRect ? baseSize / 2 : (baseSize + sizeChange) / 2;
    if (d < radius) {
      sound1.play();
      isVideoPaused = !isVideoPaused;
      if (isVideoPaused) {
        video.pause();
        showRect = true;
      } else {
        sound1.stop();
        video.play();
        showRect = false;
      }
    }
  }
  // Cercle #2 (42..50 s)
  if (currentTime >= 42 && currentTime < 50) {
    let d2 = dist(mouseX, mouseY, circle2X, circle2Y);
    let radius2 = showRect2 ? baseSize2 / 2 : (baseSize2 + sizeChange2) / 2;
    if (d2 < radius2) {
      sound1.play();
      isVideoPaused2 = !isVideoPaused2;
      if (isVideoPaused2) {
        video.pause();
        showRect2 = true;
      } else {
        sound1.stop();
        video.play();
        showRect2 = false;
      }
    }
  }


  // Cercle #3 (110..118 s)
  if (currentTime >= 111 && currentTime < 116) {
    let d2 = dist(mouseX, mouseY, circle3X, circle3Y);
    let radius3 = showRect3 ? baseSize3 / 2 : (baseSize3 + sizeChange3) / 2;
    if (d2 < radius3) {
      sound1.play();
      isVideoPaused3 = !isVideoPaused3;
      if (isVideoPaused3) {
        video.pause();
        showRect3 = true;
      } else {
        sound1.stop();
        video.play();
        showRect3 = false;
      }
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circleX = 150;
  circleY = height / 2;
  circle2X = 150;
  circle2Y = height / 2;
  circle3X = 150;
  circle3Y = height / 2;
}