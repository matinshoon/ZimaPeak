import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import logoblue from "../images/logo-blue.png"; // Ensure the correct path to your logo image

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section id="footer" className={`${darkMode ? 'bg-dark text-white' : 'bg-sky-100 text-black'}`}>
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between">
        
                {/* Logo and Social Icons Section */}
                <div className="flex flex-col items-center md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <img src={logoblue} className='h-32 mb-4' alt="Logo Blue" /> {/* Increased size of the logo */}
          <div className="flex justify-center mb-4">
            <a href="https://x.com/zimapeak" className="mx-2 text-decoration-none">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61559690607181" className="mx-2 text-decoration-none">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.linkedin.com/company/zimapeak/" className="mx-2 text-decoration-none">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/zimapeak/" className="mx-2 text-decoration-none">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        
        {/* Links Section */}
        <div className="flex flex-col items-start mb-4 md:mb-0 md:w-1/2 lg:w-1/4">
          <a href="/about" className="text-decoration-none mb-2">About Us</a>
          <a href="/services" className="text-decoration-none mb-2">Services</a>
          <a href="/contact" className="text-decoration-none mb-2">Contact</a>
          <a href="/privacy" className="text-decoration-none mb-2">Privacy Policy</a>
        </div>

        {/* Existing Footer Content */}
        <div className="w-full md:w-1/2 lg:w-1/4 text-left">
          <p className="m-0">&copy; ZimaPeak Marketing Inc. 2024</p>
          <div className="flex flex-col justify-left mt-2">
            <div className="w-full md:w-auto mb-2 md:mb-0">
              <a href="https://www.google.com/maps/place/toronto/data=!4m2!3m1!1s0x89d4cb90d7c63ba5:0x323555502ab4c477?sa=X&ved=2ahUKEwimoNeUg72EAxXMjIkEHS7NCdsQh8EJegQIFhAA"
                className="text-decoration-none flex items-left justify-left">
                <i className="bi bi-geo-alt-fill pr-1"></i>Toronto - Canada
              </a>
            </div>
            <div className="w-full md:w-auto mb-2 md:mb-0">
              <a href="mailto:support@zimapeak.com" className="text-decoration-none flex items-center justify-left">
                <i className="bi bi-envelope-at-fill pr-1"></i>support@zimapeak.com
              </a>
            </div>
            <div className="w-full md:w-auto">
              <a href="tel:+16475702244" className="text-decoration-none flex items-center justify-left">
                <i className="bi bi-telephone-fill pr-1"></i>+1 (647) 570-2244
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
