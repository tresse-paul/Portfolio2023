//slider infini fonction draggable et snap

// Select slider elements
const slider = document.querySelector("#slider-track");
const sliderInner = document.querySelector("#slider-list");
const cards = document.querySelectorAll(".slide-card");

// Initialize GSAP Draggable plugin
gsap.registerPlugin(Draggable);

// Set initial position of slider
let position = -cards[0].offsetLeft;
gsap.set(sliderInner, { x: position });

// Create Draggable instance for slider
const draggable = Draggable.create(sliderInner, {
  type: "x",
  edgeResistance: 0.5,
  bounds: {
    minX: -cards[cards.length - 1].offsetLeft,
    maxX: 0,
  },
  onDragEnd: updatePosition,
});

// Update position of slider on drag end
function updatePosition() {
  // Get current position of slider
  const currentPosition = -sliderInner.getBoundingClientRect().left;

  // Loop through each card and check if it's in the center
  cards.forEach((card) => {
    const cardLeft = card.getBoundingClientRect().left;
    const cardRight = cardLeft + card.offsetWidth;

    // If card is in center, animate to center position
    if (cardLeft < currentPosition && cardRight > currentPosition) {
      gsap.to(sliderInner, {
        duration: 0.3,
        x: -card.offsetLeft,
        ease: "power3.inOut",
      });
    }
  });
}
