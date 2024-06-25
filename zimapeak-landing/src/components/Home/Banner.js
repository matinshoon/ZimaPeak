import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Banner = ({ setModalOpen }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div id="banner" className="mt-10 sm:mt-20 md:mt-32 lg:mt-40 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <h1 className="z-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold py-5 text-center">
        Make your brand stand out with AI
      </h1>
      <h4 className="z-10 text-lg sm:text-xl lg:text-2xl mt-4 pb-5 text-center">
        Elevating Your Brand's Social Media Presence.
        <br />
        We're experts in crafting strategies to boost engagement and visibility.
      </h4>
      <div className="z-10 mt-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <button
          onClick={() => navigate('/booking')}
          className={`relative bg-primary hover:bg-white hover:text-sky-600 text-white font-bold py-2 px-8 rounded-full flex items-center justify-center sm:w-auto`}
        >
          <span className="flex items-center space-x-2">
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
        <button className={`glass ${darkMode ? 'text-white' : 'text-sky-600'} hover:bg-white hover:text-sky-600 font-bold py-1 pl-1 pr-4 rounded-full flex items-center space-x-2 relative sm:w-auto`}>
          {/* Three overlapping circle images */}
          <div className="flex items-center space-x-[-10px]">
            <div className="relative z-10">
              <img src="https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg" alt="Circle 1" className="w-10 h-10 rounded-full" />
            </div>
            <div className="relative z-20">
              <img src="https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg" alt="Circle 2" className="w-10 h-10 rounded-full " />
            </div>
            <div className="relative z-30">
              <img src="https://t3.ftcdn.net/jpg/02/58/89/90/360_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg" alt="Circle 3" className="w-10 h-10 rounded-full " />
            </div>
          </div>
          {/* Text and stars */}
          <div className="flex flex-col items-start">
            <p className='text-xs'>Loved by +20 business owners</p>
            <div className='flex items-center space-x-'>
              <p className='text-xs'>5.0</p>
              {[...Array(5)].map((_, index) => (
                <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21 16.54 14.97 22 10.91 15.81 10.13 12 4.1 8.19 10.13 2 10.91 7.46 14.97 5.82 21 12 17.27z" />
                </svg>
              ))}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;
