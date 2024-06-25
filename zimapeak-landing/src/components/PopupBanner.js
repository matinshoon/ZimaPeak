import React, { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const PopupBanner = ({ closePopup }) => {
    const { darkMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // You would typically send the email to your server here
        setSubmitted(true);
        setTimeout(() => {
            closePopup();
        }, 3000); // Close the popup after 3 seconds
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-75' : 'bg-gray-800 bg-opacity-75'}`}>
            <div className={`p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <h2 className="text-2xl font-bold mb-4 text-center">Get 50% Off!</h2>
                <p className="mb-6 text-center">Get a 50% discount only by subscribing to our newsletter!</p>
                {submitted ? (
                    <p className="text-center text-green-500">Thank you for subscribing!</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className={`w-full p-2 mb-4 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                        />
                        <button
                            type="submit"
                            className={`w-full p-2 rounded bg-primary text-white ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                        >
                            Subscribe
                        </button>
                    </form>
                )}
                <button onClick={closePopup} className="mt-4 text-red-500 hover:text-red-700">
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopupBanner;
