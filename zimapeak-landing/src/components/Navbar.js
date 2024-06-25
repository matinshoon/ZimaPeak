import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext'; // Import ThemeContext
import logoblue from "../images/logo-blue.png";
import logowhite from "../images/logo-white.png";

const Navbar = ({ setModalOpen }) => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state and toggle functions from ThemeContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${hasScrolled ? 'dark' : ''}`}>
      <div className="py-2 px-12 mx-auto flex items-center justify-between">
        <div className={`flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
          <img src={`${darkMode ? logowhite : logoblue}`} className='h-10' alt="Logo" />
        </div>

        <div className="hidden lg:flex justify-center">
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
              <Link to="/about" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>About</Link>
            </li>
            <li>
              <Link to="/blog" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blog</Link>
            </li>
            <li>
              <Link to="/careers" className={`hover:${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Careers</Link>
            </li>
          </ul>
        </div>

        <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg`}>
          <ul className={`flex flex-col space-y-2 p-4 ${darkMode ? 'text-white' : 'text-black'}`}>
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
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-gray-300">Blog</Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-300">Careers</Link>
            </li>
          </ul>
        </div>

        <div className='hidden lg:flex'>
          <button onClick={() => setModalOpen(true)} className={`relative bg-primary hover:bg-white hover:text-sky-600 text-white font-bold py-4 px-8 rounded-full`}>
            <div className='flex items-center justify-center space-x-2'>
              <p>Get Started</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex items-center lg:hidden">
          <button className="lg:hidden" onClick={handleMenuToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
