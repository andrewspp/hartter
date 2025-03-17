// Fonction pour vérifier si un élément est visible dans le viewport
export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Fonction pour générer un délai aléatoire
export const randomDelay = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Fonction pour créer un effet de parallaxe
export const applyParallax = (element, scrollPosition, factor) => {
  if (element) {
    element.style.transform = `translateY(${scrollPosition * factor}px)`;
  }
};