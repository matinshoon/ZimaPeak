import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Banner = () => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext

  return (
    <div id="banner" className="mt-20 flex flex-col items-center">
        <div className="blury-left"></div>
        <div className="blury-right"></div>
      <h1 className="z-10 text-5xl font-extrabold py-5">ZimaPeak</h1>
      <h4 className="z-10 text-xl mt-4 pb-5">Elevating Your Brand's Social Media Presence. We're experts in crafting strategies to boost engagement and visibility.</h4>
      <h3 className="z-10 text-2xl font-bold mt-4 mb-5">Let's make your brand stand out online!</h3>
    </div>
  );
};

export default Banner;
