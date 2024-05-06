import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section id="footer" className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto py-8 px-4 flex flex-col items-center justify-center">
        <div className="md:w-3/4 lg:w-full text-center py-3">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
              <p className="m-0 text-center">&copy; ZimaPeak Marketing Inc. 2024</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
              <a href="https://www.google.com/maps/place/toronto/data=!4m2!3m1!1s0x89d4cb90d7c63ba5:0x323555502ab4c477?sa=X&ved=2ahUKEwimoNeUg72EAxXMjIkEHS7NCdsQh8EJegQIFhAA"
                className="text-decoration-none flex items-center justify-center">
                <i className="bi bi-geo-alt-fill pr-3"></i>Toronto - Canada
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
              <a href="mailto:support@zimapeak.com" className="text-decoration-none flex items-center justify-center">
                <i className="bi bi-envelope-at-fill pr-3"></i>support@zimapeak.com
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <a href="tel:+16475702244" className="text-decoration-none flex items-center justify-center">
                <i className="bi bi-telephone-fill pr-3"></i>+1 (647) 570-2244
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
