import React, { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import BookEvent from '../components/BookEvent';

const Services = () => {
    const { darkMode } = useContext(ThemeContext); // Access darkMode state from ThemeContext
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} py-20 px-10 md:px-0`}>
            <div className="invisible md:visible">

            <Navbar  setModalOpen={setModalOpen} />
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
            </div>
            <div className="pt-12 pb-8 px-4 md:px-8">
                <h1 className="text-3xl md:text-6xl font-bold text-left mb-4 md:pl-40">Services, <br /> that make a difference</h1>
            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-20">
                <div className={`flex items-center justify-left md:pl-40 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className="text-xl font-bold mb-4">- Marketing</h2>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Strategy</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Campaigns</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Funnels</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
            </div>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                <div className={`flex items-center justify-left md:pl-40 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className="text-xl font-bold mb-4">- Development</h2>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Development</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Database & Cloud</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">SEO</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
            </div>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                <div className={`flex items-center justify-left md:pl-40 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className="text-xl font-bold mb-4">- Content Creation</h2>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Animations</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Video Production</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Social Media</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
            </div>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                <div className={`flex items-center justify-left md:pl-40 ${darkMode ? 'text-white' : 'text-black'}`}>
                    <h2 className="text-xl font-bold mb-4">- Design</h2>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Branding</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">App Design</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center border border-sky-300 hover:border hover:border-white transition duration-300`}>
                    <h2 className="text-xl mb-4">Web Design</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}></p>
                </div>
            </div>

            <span className={`${darkMode ? 'blury-left' : 'blury-left'}`}></span>
        </div>
    );
};

export default Services;
