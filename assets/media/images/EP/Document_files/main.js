// Animation h1 hero
let heroTitle = gsap.fromTo(
  ".hero-h1",
  {
    transform:
      "translate3d(0px, 160%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(16deg) skew(0deg, 0deg)",
    transformStyle: "preserve-3d",
    filter: "blur(8px)",
    immediateRender: false,
  },
  {
    transform:
      "translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
    transformStyle: "preserve-3d",
    filter: "blur(0px)",
    stagger: {
      each: 0.1,
      ease: "power4",
    },
  }
);
heroTitle.pause();

// fondu à l'affichage de la page (contenu apparait)
function fadeOut() {
  gsap.to(".page-transition", {
    opacity: 0,
    display: "none",
    duration: 2,
    delay: 0.5,
  });
}

// fondu au changement de la page (contenu disparait)
function fadeIn() {
  gsap.to(".page-transition", {
    opacity: 1,
    display: "block",
    duration: 0.5,
  });
}

// Script transition des pages
function internalLink(myLink) {
  return myLink.host == window.location.host;
}

document.querySelectorAll("a").forEach(function (link) {
  if (internalLink(link) && link.href.indexOf("#") === -1) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      fadeIn();
      var moduleURL = this.getAttribute("href");
      setTimeout(function () {
        window.location = moduleURL;
      }, 1000);
      // Class that has page out interaction tied to click
      document.querySelector(".page-transition").click();
    });
  }
});

// Animation fondu entrant au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  fadeOut();
  heroTitle.play();
  heroTitle.delay(1);
  heroTitle.duration(1);
});

// Changement theme sombe - clair
// Transition du texte
const btnMode = document.querySelectorAll(".button.mode");

btnMode.forEach((item) => {
  var body = document.body;
  item.addEventListener("click", () => {
    body.classList.toggle("light-mode");
  });
});

// Transition du label du boutton menu + apparition de la nav
const tl = gsap.timeline({ paused: true });

// Annimation: Affiche ou masque le menu
const animateOpenNav = () => {
  tl.fromTo(
    ".w-nav-overlay",
    0.1,
    {
      display: "none",
    },
    {
      display: "block",
    }
  );
  tl.fromTo(
    ".nav-menu-mobile",
    1,
    {
      transform: "translateY(-1400px) translateX(0px)",
      ease: "Power4.inOut",
    },
    {
      transform: "translateY(0px) translateX(0px)",
      ease: "Power4.inOut",
    }
  ).reverse();
};

// Fonction au clic sur le bouton de menu
// Translation "menu" "fermer"
// Affiche le menu mobile
const openNav = () => {
  animateOpenNav();
  const btnMenu = document.querySelector(".menu-button");
  btnMenu.addEventListener("click", function (e) {
    btnMenu.classList.toggle("transition");
    tl.reversed(!tl.reversed());
  });
};

// Appel de la fonction Ouvrir/Fermer le menu
openNav();

// Curseur personnalisé
var curseur = document.querySelector(".cursor");
var action = document.querySelectorAll("a");
//Déplacement de la souris
document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  curseur.style.left = x + "px";
  curseur.style.top = y + "px";
});
// Animation au clic de la souris
document.addEventListener("mousedown", function () {
  curseur.classList.add("click");
});
document.addEventListener("mouseup", function () {
  curseur.classList.remove("click");
});
// Hover sur les éléments clicable ayant la class '.action-button' (change l'état du curseur)
action.forEach((item) => {
  item.addEventListener("mouseover", () => {
    curseur.classList.add("action");
  });
  item.addEventListener("mouseleave", () => {
    curseur.classList.remove("action");
  });
});

// Scroll fluide
const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
  direction: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//Scaling de l'image du block à propos
var $introWrapper = $(".intro-img-wrapper");
$($introWrapper).mouseenter(function () {
  TweenLite.to(".intro-img", 0.5, {
    transform: "scale3d(2, 2, 1) rotateZ(-5deg)",
    transformStyle: "preserve-3d",
    ease: Power2.easeInOut,
  });
  var tl = gsap.timeline();
  tl.to($introWrapper, {
    filter: "blur(0px)",
    willChange: "filter",
    duration: 0.1,
  })
    .to($introWrapper, {
      filter: "blur(2px)",
      willChange: "filter",
      duration: 0.3,
    })
    .to($introWrapper, {
      filter: "blur(0px)",
      willChange: "filter",
      duration: 0.1,
    });
});

$($introWrapper).mouseleave(function () {
  TweenLite.to(".intro-img", 0.5, {
    transform: "scale3d(1, 1, 1) rotateZ(0deg)",
    transformStyle: "preserve-3d",
    ease: Power2.easeInOut,
  });

  var tl = gsap.timeline();
  tl.to($introWrapper, {
    filter: "blur(0px)",
    willChange: "filter",
    duration: 0.1,
  })
    .to($introWrapper, {
      filter: "blur(2px)",
      willChange: "filter",
      duration: 0.3,
    })
    .to($introWrapper, {
      filter: "blur(0px)",
      willChange: "filter",
      duration: 0.1,
    });
});

// Appartion de l'image lors du hover sur le projet
var $cursorHover = $(".cursor-hover-img"),
  $overlayImg = $(".project-overlay");

function moveCircle(e) {
  TweenLite.to($cursorHover, 0.5, {
    css: { left: e.pageX, top: e.pageY },
    delay: 0.03,
  });
}

$($overlayImg).mousemove(function () {
  TweenLite.set($cursorHover, {
    height: "4OOpx",
    width: 0,
  });

  TweenLite.to($cursorHover, 0.5, {
    transform: "translate3d(-150px, -200px, 0px)",
    width: "300px",
    transformStyle: "preserve-3d",
  });
  $($overlayImg).on("mousemove", moveCircle);
});

$($overlayImg).mouseout(function () {
  TweenLite.to($cursorHover, 0.5, {
    transform: "translate3d(-150px, -200px, 0px)",
    width: 0,
    transformStyle: "preserve-3d",
  });
});

$(".p1").hover(function () {
  $(".cursor-hover-img").css({
    "background-image": "url(/assets/media/images/EP/EP_mockup-main.jpg)",
  });
});
$(".p2").hover(function () {
  $(".cursor-hover-img").css({
    "background-image": "url(/assets/media/images/Architecture2.jpg)",
    "border-radius": "16px",
  });
});

// Tilt card page projets
$tiltBox = $(".item");
$card = $(".motion-images");
$motionImg = $(".motion-image");
$($tiltBox).mousemove(function (e) {
  $xPos = e.clientX / window.innerWidth - 0.5;
  $yPos = e.clientY / window.innerHeight - 0.5;

  gsap.to($card, {
    willChange: "transform",
    rotateY: $xPos * 16,
    transformStyle: "preserve-3d",
  });

  gsap.to($motionImg, {
    translateX: $xPos * -70,
    transformStyle: "preserve-3d",
    willChange: "transform",
  });
});

$($tiltBox).mouseout(function (e) {
  $xPos = e.clientX / window.innerWidth - 0.5;
  $yPos = e.clientY / window.innerHeight - 0.5;

  gsap.to($card, {
    willChange: "transform",
    rotateY: 0,
    transformStyle: "preserve-3d",
  });

  gsap.to($motionImg, {
    translateX: 0,
    transformStyle: "preserve-3d",
    willChange: "transform",
  });
});

//Animation du text de contact lié au mail du footer
$footerEmailWrapper = $(".footer-email-wrapper");
$labelEmail = $(".label.email");

$($footerEmailWrapper).mouseenter(function () {
  TweenLite.to($labelEmail, 0.5, {
    transform: "translate3d(0px, -100%, 0px)",
    transformStyle: "preserve-3d",
    ease: Power4.easeInOut,
  });
});

$($footerEmailWrapper).mouseleave(function () {
  TweenLite.to($labelEmail, 0.5, {
    transform: "translate3d(0px, 0%, 0px)",
    transformStyle: "preserve-3d",
    ease: Power4.easeInOut,
  });
});

$($footerEmailWrapper).click(function () {
  TweenLite.to($labelEmail, 0.5, {
    transform: "translate3d(0px, -200%, 0px)",
    transformStyle: "preserve-3d",
    ease: Power4.easeInOut,
  });
});

// Fonction permettant de copier un text lors du clic
function copyToClipBoard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
