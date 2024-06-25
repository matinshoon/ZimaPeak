import React, { useEffect } from 'react';
import logoblue from "../../images/logo-blue.png";

const cardsData = [
  {
    id: 1,
    investment: "$1000",
    time: "2 - 4 weeks",
    roi: "10x",
    active: false,
  },
  {
    id: 2,
    investment: "$5000",
    time: "2 - 6 weeks",
    roi: "100x",
    active: true,
  },
  {
    id: 3,
    investment: "$3000",
    time: "2 - 6 weeks",
    roi: "20x",
    active: false,
  },
];

const Compare = ({ darkMode }) => {
  // useEffect(() => {
  //   const cardsContainer = document.querySelector(".cards");
  //   const overlay = document.querySelector(".overlay");
  //   const cards = Array.from(document.querySelectorAll(".cardabout")).slice(0, 3); // Select only the first 3 cards

  //   let observer;

  //   const applyOverlayMask = (e) => {
  //     const overlayEl = e.currentTarget;
  //     const x = e.pageX - cardsContainer.offsetLeft;
  //     const y = e.pageY - cardsContainer.offsetTop;

  //     overlayEl.style.cssText = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  //   };

  //   const createOverlayCta = (overlayCard, ctaEl) => {
  //     if (ctaEl) {
  //       const overlayCta = document.createElement("div");
  //       overlayCta.classList.add("cta");
  //       overlayCta.textContent = ctaEl.textContent || "";
  //       overlayCta.setAttribute("aria-hidden", true);

  //       if (overlayCard.id === "active") {
  //         overlayCard.append(overlayCta);
  //       }
  //     }
  //   };

  //   observer = new ResizeObserver((entries) => {
  //     entries.forEach((entry) => {
  //       const cardIndex = cards.indexOf(entry.target);
  //       if (cardIndex >= 0) {
  //         const width = entry.contentRect.width || 0;
  //         const height = entry.contentRect.height || 0;
  //         // overlay.children[cardIndex].style.width = `${width}px`;
  //         // overlay.children[cardIndex].style.height = `${height}px`;
  //         // Set overlay height to match card height
  //         // overlay.style.height = `${height}px`;
  //       }
  //     });
  //   });

  //   const initOverlayCard = (cardEl, index) => {
  //     if (index < 3) {
  //       const overlayCard = document.createElement("div");
  //       overlayCard.classList.add("cardabout");
  //       overlayCard.id = cardEl.id;
  //       createOverlayCta(overlayCard, cardEl.lastElementChild);
  //       overlay.append(overlayCard);
  //       observer.observe(cardEl);
  //     }
  //   };

  //   cards.forEach(initOverlayCard);
  //   document.body.addEventListener("pointermove", applyOverlayMask);

  //   return () => {
  //     document.body.removeEventListener("pointermove", applyOverlayMask);
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <section id="about" className={`${darkMode ? 'bg-dark text-white' : ''}`}>
      <div className="mb-5 text-center">
        <h1 className="font-bold mb-5 text-2xl">Pricing</h1>
        <h5 className="mb-20">
          Your internal team just can't handle every aspect, and that specialized agency fails to grasp the synergy among all marketing channels to optimize outcomes.
        </h5>
      </div>

      <div className="cards">
        <div className="cards__inner">
          {cardsData.map((card, index) => (
            <div className={`cardabout ${card.active ? 'active' : ''}`} key={index}>
              <div className='flex justify-center'>
                <img src={logoblue} className='h-20' alt="Logo Blue" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Monthly Investment</p>
                <h3 className="font-bold">{card.investment}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Delivery time</p>
                <h3 className="font-bold">{card.time}</h3>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>ROI</p>
                <h3 className="font-bold">{card.roi}</h3>
              </div>
              <a href="/booking" className={`cta w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
        <div className="overlay cards__inner"></div>
      </div>
    </section>
  );
};

export default Compare;
