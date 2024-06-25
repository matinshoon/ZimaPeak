import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import BookEvent from '../components/Booking/BookEvent';
import Banner from '../components/Services/Banner';
import ServiceInfo from '../components/Services/ServiceInfo';

const Services = () => {
    const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    return (
        <div className={`${darkMode ? 'bg-dark text-white' : 'bg-white text-black'} py-20 px-10 md:px-0`}>
            <Helmet>
                <title>Our Services - ZimaPeak Marketing</title>
                <meta name="description" content="Discover the range of services offered by ZimaPeak Marketing, including social media marketing, SEO, and web development. Elevate your brand's online presence with our expert solutions." />
                <meta name="keywords" content="digital marketing, social media marketing, SEO, web development, online marketing services" />
                <link rel="canonical" href="https://www.zimapeak.com/services" />
            </Helmet>
            
            <div className="invisible md:visible">
                <Navbar setModalOpen={setModalOpen} />
                {modalOpen && (
                    <div className="fixed z-50 inset-0 overflow-y-auto">
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
            </div>

            <Banner />

            <ServiceInfo />
        </div>
    );
};

export default Services;
