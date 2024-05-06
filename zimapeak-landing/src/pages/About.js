import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import BookEvent from '../components/BookEvent';

const About = () => {
    const { darkMode } = useContext(ThemeContext);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    return (
        <div id="about" className={`flex justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
            <div className="container mx-auto py-40 z-10 relative flex flex-col justify-center items-center">
                <p className="mb-4 text-sky-400">About Us</p>
                <h1 className="text-3xl font-bold relative">ZimaPeak Marketing</h1>
                <p className="text-lg text-center mt-4">Elevating Your Beauty Brand's Social Media Presence. We're experts in crafting strategies to boost engagement and visibility.</p>
                <div className={`w-full md:w-3/5 h-28 my-20 flex justify-around items-center text-white ${darkMode ? 'border' : 'bg-black opacity-90'} md:rounded-lg`}>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>+100</p>
                        <p>Customers Served</p>
                    </div>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>98%</p>
                        <p>Customer Satisfaction</p>
                    </div>
                    <div className="text-center">
                        <p className='font-bold text-2xl mb-2'>24/7</p>
                        <p>Customer Support</p>
                    </div>
                </div>
                <div className='mx-40 w-3/5'>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Mission:</h2>
                        <p className="mb-10">At ZimaPeak Marketing, our mission is to empower businesses with innovative marketing solutions that drive growth and foster long-term success. We strive to exceed client expectations by delivering exceptional services tailored to their unique needs, while maintaining the highest standards of integrity, professionalism, and customer satisfaction.</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Vision:</h2>
                        <p className="mb-10">Our vision at ZimaPeak Marketing is to become a leading force in the digital marketing industry, recognized for our creativity, expertise, and commitment to excellence. We aspire to be the go-to agency for businesses seeking to elevate their online presence, drive engagement, and achieve sustainable growth in an ever-evolving marketplace.</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Values:</h2>
                        <p className="mb-10">At ZimaPeak Marketing, our values serve as the foundation of everything we do. We are driven by a passion for innovation, collaboration, and continuous improvement. Integrity, transparency, and accountability guide our actions as we strive to build trust and foster meaningful relationships with our clients, partners, and community.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
