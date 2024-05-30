import React, { useEffect } from 'react';
import logoblue from "../images/logo-blue.png";

const Compare = ({ darkMode }) => {
  useEffect(() => {
    const cardsContainer = document.querySelector(".cards");
    const overlay = document.querySelector(".overlay");
    const cards = Array.from(document.querySelectorAll(".cardabout")).slice(0, 3); // Select only the first 3 cards

    let observer;

    const applyOverlayMask = (e) => {
      const overlayEl = e.currentTarget;
      const x = e.pageX - cardsContainer.offsetLeft;
      const y = e.pageY - cardsContainer.offsetTop;

      overlayEl.style.cssText = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
    };

    const createOverlayCta = (overlayCard, ctaEl) => {
      if (ctaEl) {
        const overlayCta = document.createElement("div");
        overlayCta.classList.add("cta");
        overlayCta.textContent = ctaEl.textContent || "";
        overlayCta.setAttribute("aria-hidden", true);

        if (overlayCard.id === "active") {
          overlayCard.append(overlayCta);
        }
      }
    };

    observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        if (cardIndex >= 0) {
          const width = entry.contentRect.width || 0;
          const height = entry.contentRect.height || 0;
          // overlay.children[cardIndex].style.width = `${width}px`;
          // overlay.children[cardIndex].style.height = `${height}px`;
          // Set overlay height to match card height
          // overlay.style.height = `${height}px`;
        }
      });
    });

    const initOverlayCard = (cardEl, index) => {
      if (index < 3) {
        const overlayCard = document.createElement("div");
        overlayCard.classList.add("cardabout");
        overlayCard.id = cardEl.id;
        createOverlayCta(overlayCard, cardEl.lastElementChild);
        overlay.append(overlayCard);
        observer.observe(cardEl);
      }
    };

    cards.forEach(initOverlayCard);
    document.body.addEventListener("pointermove", applyOverlayMask);

    return () => {
      document.body.removeEventListener("pointermove", applyOverlayMask);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="about" className={`${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className="mb-5 text-center">
        <h1 className="font-bold mb-5 text-3xl">Pricing</h1>
        <h5 className="mb-20">Your internal team just can't handle every aspect, and that specialized agency fails to grasp the synergy among all marketing channels to optimize outcomes.</h5>
      </div>

      <div className="cards">
        <div className="cards__inner">
          <div className="cardabout">
            <div className='flex justify-center'>
            <img src={logoblue}  className='h-20' alt="Logo Blue" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Monthly Investment</p>
              <h3 className="font-bold">$1000</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Delivery time</p>
              <h3 className="font-bold">2 - 4 weeks</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>ROI</p>
              <h3 className="font-bold">10x</h3>
            </div>
            <a href="/booking" className={`cta w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
              Book a Free Discovery Call
            </a>
          </div>
          <div className="cardabout" id="active">
          <div className='flex justify-center'>
            <img src={logoblue}  className='h-20' alt="Logo Blue" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Monthly Investment</p>
              <h3 className="font-bold">$5000</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Delivery time</p>
              <h3 className="font-bold">2 - 6 weeks</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>ROI</p>
              <h3 className="font-bold">100x</h3>
            </div>
            <a href="/booking" className={`cta w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
              Book a Free Discovery Call
            </a>
          </div>
          <div className="cardabout">
            <div className='flex justify-center'>
            <img src={logoblue}  className='h-20' alt="Logo Blue" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Monthly Investment</p>
              <h3 className="font-bold">$3000</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Delivery time</p>
              <h3 className="font-bold">2 - 6 weeks</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>ROI</p>
              <h3 className="font-bold">20x</h3>
            </div>
            <a href="/booking" className={`cta w-100 ${darkMode ? 'text-black' : 'text-white'}`}>
              Book a Free Discovery Call
            </a>
          </div>
        </div>
        <div className="overlay cards__inner"></div>
      </div>
    </section>
  );
};

export default Compare;
