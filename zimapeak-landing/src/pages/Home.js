// Home.js
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import Slider from '../components/Slider'
import Banner from '../components/Banner'
import Compare from '../components/Compare'
import Testimonial from '../components/Testimonial'
import LogoSlider from '../components/LogoSlider'
import Navbar from '../components/Navbar';
import BookEvent from '../components/BookEvent';

const Home = () => {
    const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    return (
        <div className={`text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Navbar setModalOpen={setModalOpen} />
            {modalOpen && (
                <div className="fixed z-20 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-60 sm:align-middle sm:max-w-2xl sm:w-full">
                            <BookEvent closeModal={() => setModalOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
            <div className='py-20'>
                <Banner />
            </div>
            <div className='py-10'>
                <Slider />
            </div>
            <div className='py-10'>
                <Testimonial />
            </div>
            <div className='py-10 hidden md:flex flex justify-center'>
                <Compare />
            </div>
            <div className='py-10'>
                <LogoSlider />
            </div>
        </div>
    );
};

export default Home;