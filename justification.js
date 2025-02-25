// justification.js

/**
 * Dessine le paragraphe de façon justifiée dans un rectangle de largeur w.
 * - paragraph : texte à afficher
 * - x, y : coordonnées du coin supérieur gauche où démarrer
 * - w : largeur max
 * - textSizeVal : taille de texte
 * - lineSpacingFactor : facteur d'espacement de ligne (ex : 1.3)
 */
function drawJustifiedParagraph(paragraph, x, y, w, textSizeVal, lineSpacingFactor) {
  textSize(textSizeVal);
  let words = paragraph.split(/\s+/);
  let spaceWidth = textWidth(" ");

  let lines = [];
  let currentLine = [];
  let currentLineWidth = 0;

  // On découpe le texte mot à mot pour gérer la justification
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let wordWidth = textWidth(word);

    if (currentLine.length > 0) {
      if (currentLineWidth + spaceWidth + wordWidth > w) {
        lines.push(currentLine);
        currentLine = [word];
        currentLineWidth = wordWidth;
      } else {
        currentLine.push(word);
        currentLineWidth += spaceWidth + wordWidth;
      }
    } else {
      currentLine.push(word);
      currentLineWidth = wordWidth;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  // Dessin de chaque ligne
  let lineHeight = textSizeVal * lineSpacingFactor;
  for (let i = 0; i < lines.length; i++) {
    let lineWords = lines[i];
    let totalWordsWidth = 0;
    for (let w_ of lineWords) {
      totalWordsWidth += textWidth(w_);
    }

    let gapCount = lineWords.length - 1;
    if (i < lines.length - 1 && gapCount > 0) {
      // Ligne intermédiaire => justification complète
      let extraSpace = w - totalWordsWidth;
      let spacePerGap = extraSpace / gapCount;

      let xx = x;
      for (let j = 0; j < lineWords.length; j++) {
        text(lineWords[j], xx, y);
        xx += textWidth(lineWords[j]);
        // Ajout de l'espace justifié
        if (j < lineWords.length - 1) {
          xx += spacePerGap;
        }
      }
    } else {
      // Dernière ligne => alignement à gauche
      let xx = x;
      for (let j = 0; j < lineWords.length; j++) {
        text(lineWords[j], xx, y);
        xx += textWidth(lineWords[j]) + spaceWidth;
      }
    }
    y += lineHeight;
  }
}

/**
 * Détermine la bonne taille de police pour faire tenir le texte
 * dans la zone boxWidth x boxHeight.
 */
function findFittingTextSize(paragraph, boxWidth, boxHeight) {
  let testSize = 60;   // taille max de départ
  let minSize = 10;    // taille min

  while (testSize >= minSize) {
    let neededHeight = measureParagraphHeight(paragraph, boxWidth, testSize, 1.3);
    if (neededHeight <= boxHeight) {
      return testSize; // on a trouvé une taille qui rentre
    }
    testSize -= 1;
  }

  return minSize; // au pire, on renvoie la taille minimale
}

/**
 * Calcule la hauteur totale nécessaire pour dessiner le texte 'paragraph'
 * en justifié (largeur w), à la taille textSizeVal, et avec un spacing
 * lineSpacingFactor (ex. 1.3).
 */
function measureParagraphHeight(paragraph, w, textSizeVal, lineSpacingFactor) {
  push();
  textSize(textSizeVal);

  let words = paragraph.split(/\s+/);
  let spaceWidth = textWidth(" ");
  let lines = [];
  let currentLine = [];
  let currentLineWidth = 0;

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let wordWidth = textWidth(word);

    if (currentLine.length > 0) {
      if (currentLineWidth + spaceWidth + wordWidth > w) {
        lines.push(currentLine);
        currentLine = [word];
        currentLineWidth = wordWidth;
      } else {
        currentLine.push(word);
        currentLineWidth += spaceWidth + wordWidth;
      }
    } else {
      currentLine.push(word);
      currentLineWidth = wordWidth;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  pop();

  let lineHeight = textSizeVal * lineSpacingFactor;
  let totalHeight = lines.length * lineHeight;
  return totalHeight;
}
