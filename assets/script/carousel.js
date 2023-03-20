//slider infini fonction draggable et snap

// Select slider elements
const slider = document.querySelector("#slider-track");
const sliderInner = document.querySelector("#slider-list");
const cards = document.querySelectorAll(".slide-card");

// importation plugin Draggable Gsap
gsap.registerPlugin(Draggable);

// Set initial position of slider
let position = -cards[0].offsetLeft;
gsap.set(sliderInner, { x: position });

// Fonction draggable
const draggable = Draggable.create(sliderInner, {
  type: "x",
  edgeResistance: 0.5,
  bounds: {
    minX: -cards[cards.length - 1].offsetLeft,
    maxX: 0,
  },
  onDragEnd: updatePosition,
});

// Met à jour la possition au drag
function updatePosition() {
  // Get current position of slider
  const currentPosition = -sliderInner.getBoundingClientRect().left;

  // met en place les cards
  cards.forEach((card) => {
    const cardLeft = card.getBoundingClientRect().left;
    const cardRight = cardLeft + card.offsetWidth;

    // centre les card
    if (cardLeft < currentPosition && cardRight > currentPosition) {
      gsap.to(sliderInner, {
        duration: 0.3,
        x: -card.offsetLeft,
        ease: "power3.inOut",
      });
    }
  });
}
