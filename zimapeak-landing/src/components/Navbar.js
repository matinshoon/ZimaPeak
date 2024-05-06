import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext

const Navbar = ({ setModalOpen }) => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state and toggle functions from ThemeContext
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToAbout = () => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`bg-${darkMode ? 'gray-900' : 'white'} ${darkMode ? 'navbar-dark' : 'navbar'}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        <div className="hidden lg:flex lg:w-1/3 justify-left">
          <ul className={`flex space-x-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            <li>
              <Link to="/" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Home</Link>
            </li>
            <li>
              <Link to="/services" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Services</Link>
            </li>
            <li>
              <Link to="/casestudies" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Case Studies</Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToAbout} className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</Link>
            </li>
          </ul>
        </div>

        <div className={`flex justify-center lg:w-1/3 ${darkMode ? 'text-white' : 'text-black'}`}>
          <Link to="/" className="text-lg font-semibold">ZimaPeak</Link>
        </div>

        <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className={`flex flex-col space-y-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-300">Services</Link>
            </li>
            <li>
              <Link to="/casestudies" className="hover:text-gray-300">Case Studies</Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToAbout} className="hover:text-gray-300">About</Link>
            </li>
          </ul>
        </div>


        <div className='lg:w-1/3 flex justify-end'>
          <button onClick={() => setModalOpen(true)} className={`hidden lg:block bg-primary hover:bg-sky-600 text-white font-bold py-2 px-4 rounded ${darkMode ? 'dark-button' : ''}`}>
            Book a Free Discovery Call
          </button>
        </div>
        <div className="flex items-center">
          {/* Short toggle for theme change */}
          <button className="lg:hidden" onClick={handleMenuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-white ${darkMode ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
