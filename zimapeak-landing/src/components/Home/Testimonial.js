import React, { useContext } from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa'; // Assuming you have react-icons installed
import { ThemeContext } from '../../ThemeContext';

const testimonials = [
    {
        name: "Micheal SangSefidi",
        title: "Marketing Director, Arasp Club Agency",
        quote: "Working with this marketing team has been a game-changer for our business. They bring fresh perspectives and innovative strategies that have significantly boosted our brand awareness and customer engagement.",
    },
    {
        name: "David Thompson",
        title: "Founder & CEO, ONJ Solutions",
        quote: "I've been blown away by the results delivered by this marketing service. Their attention to detail and commitment to driving results have helped us exceed our marketing goals and achieve remarkable growth.",
    },
    {
        name: "Emily Carlson",
        title: "VP of Marketing, Ring Solutions",
        quote: "The marketing team here is exceptional. Their data-driven approach, combined with their creativity, has led to impactful campaigns that have resonated with our target audience and driven substantial ROI.",
    },
    {
        name: "Zohreh Bakhshi",
        title: "Founder, Alpha Gym Fitness",
        quote: "Choosing this marketing service was one of the best decisions we made for our business. Their tailored strategies and personalized approach have helped us attract more leads and convert them into loyal customers.",
    },
];

const Testimonial = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-3xl font-extrabold tracking-tight mb-8">What Our Clients Say</h1>
                <p className="text-center text-lg mb-12">Hear from our satisfied clients who have experienced the transformative power of our marketing services.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className={`px-6 py-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                                <div className="flex items-center mb-4">
                                    <FaGoogle className="text-primary text-4xl mr-2" />
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <FaStar className="text-yellow-500 mr-1" />
                                            <FaStar className="text-yellow-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm italic mb-4">{testimonial.title}</div>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{testimonial.quote}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
