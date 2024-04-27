   // Set the date for two days from now
   var now = new Date();
   var countDownDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).getTime();

   // Update the countdown every second
   var x = setInterval(function () {

       // Get the current date and time
       var now = new Date().getTime();

       // Calculate the distance between now and the countdown date
       var distance = countDownDate - now;

       // Calculate days, hours, minutes, and seconds
       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
       var seconds = Math.floor((distance % (1000 * 60)) / 1000);

       // Display the result in the element with id="timer"
       document.getElementById("timer").innerHTML = days + "d " + hours + "h " +
           minutes + "m " + seconds + "s ";

       // If the countdown is finished, display a message
       if (distance < 0) {
           clearInterval(x);
           document.getElementById("timer").innerHTML = "EXPIRED";
       }
   }, 1000);

//    about
console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".cardabout"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  
  // Check if the parent ID is "active" and append .cta only to that card
  if (overlayCard.id === "active") {
    overlayCard.append(overlayCta);
  }
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("cardabout");
  overlayCard.id = cardEl.id; // Set the overlay card id to match the original card id
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
