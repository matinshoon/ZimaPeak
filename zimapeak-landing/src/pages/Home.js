import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import Banner from '../components/Home/Banner';
import Objects from '../components/Home/Objects';
import Compare from '../components/Home/Compare';
import Testimonial from '../components/Home/Testimonial';
import LogoSlider from '../components/Home/LogoSlider';
import Navbar from '../components/Navbar';
import BookEvent from '../components/Booking/BookEvent';
import Stats from '../components/Home/Stats';
import PopupBanner from '../components/PopupBanner';

const Home = () => {
    const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setTimeout(() => {
                setPopupVisible(true);
            }, 3000);
        }
    }, []);

    const closePopup = () => {
        setPopupVisible(false);
        localStorage.setItem('hasSeenPopup', 'true');
    };

    return (
        <div className={`bg-tiles text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Zimapeak Marketing | Toronto's Best Web Development & Digital Marketing Agency</title>
                <meta name="description" content="Zimapeak Marketing offers top-notch web development, SEO services, and social media marketing in Toronto. Let us help you grow your business online." />
                <meta name="keywords" content="Web development agency, Digital marketing agency, Web design company, SEO services, Social media marketing, Content marketing, PPC management, E-commerce development, Mobile app development, Custom web applications, Toronto web development agency, Toronto digital marketing services, Web design in Toronto, SEO services in Toronto, Toronto social media marketing" />
                <link rel="canonical" href="https://www.zimapeak.com/" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Zimapeak Marketing",
                        "url": "https://www.zimapeak.com",
                        "logo": "https://www.zimapeak.com/logo.png",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+1-647-570-2244",
                            "contactType": "Customer Service"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "39 Roehampton Ave",
                            "addressLocality": "Toronto",
                            "addressRegion": "ON",
                            "postalCode": "M4P 0G1",
                            "addressCountry": "Canada"
                        },
                        "sameAs": [
                            "https://www.facebook.com/profile.php?id=61559690607181",
                            "https://www.x.com/zimapeak",
                            "https://www.linkedin.com/company/zimapeak"
                        ]
                    })}
                </script>
            </Helmet>
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
            {popupVisible && <PopupBanner closePopup={closePopup} />}
            <div className='pt-20'>
                <Banner />
            </div>
            <div className='hidden md:block z-10'>
                <Objects />
            </div>
            <div className='z-20 py-20 md:p-0'>
                <LogoSlider />
            </div>
            <div className="z-10">
                <Stats />
            </div>
            <div className='pb-10 z-20'>
                <Testimonial />
            </div>
            <div className='py-10 hidden md:flex justify-center'>
                <Compare />
            </div>
            <div className='md:hidden fixed bottom-0 left-0 w-full flex justify-center pb-4'>
                <button onClick={() => setModalOpen(true)} className={`relative bg-primary hover:bg-white hover:text-sky-600 text-white font-bold py-4 px-8 rounded-2xl`}>
                    <div className='flex items-center justify-center space-x-2'>
                        <p>Get Started</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
