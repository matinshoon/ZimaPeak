import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';

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
        name: "Emily Clark",
        title: "VP of Marketing, Ring Solutions",
        quote: "The marketing team here is exceptional. Their data-driven approach, combined with their creativity, has led to impactful campaigns that have resonated with our target audience and driven substantial ROI.",
    },
    {
        name: "Zohreh Bakhshi",
        title: "Founder, Alpha Gym Fitness",
        quote: "Choosing this marketing service was one of the best decisions we made for our business. Their tailored strategies and personalized approach have helped us attract more leads and convert them into loyal customers.",
    },
    {
        name: "Sophia Williams",
        title: "Marketing Coordinator, TopLoop Tech Solutions",
        quote: "I'm continuously impressed by the professionalism and expertise of this marketing team. Their proactive approach and ability to adapt to market trends have kept us ahead of the competition and positioned us as industry leaders.",
    },
];

const Testimonial = () => {
    const { darkMode } = useContext(ThemeContext);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const testimonial = testimonials[index];

    return (
        <div className={`flex flex-col justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-center font-bold text-3xl">Testimonials</h1>
            <div className="container mx-auto py-12 relative">
                <div className={`max-w-lg mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden md:max-w-xl relative`}>
                    <div className="md:flex">
                        <div className={` flex flex-col justify-center p-8 ${darkMode ? 'text-white' : 'text-black'}`}>
                            <div className={`uppercase tracking-wide text-sm ${darkMode ? 'text-indigo-500' : 'text-gray-700'} font-semibold`}>{testimonial.name}</div>
                            <p className={`block mt-1 text-lg leading-tight font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{testimonial.title}</p>
                            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.quote}</p>
                        </div>
                    </div>
                </div>
                <button className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 text-4xl text-gray-500" onClick={handlePrev}>&#8249;</button>
                <button className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 text-4xl text-gray-500" onClick={handleNext}>&#8250;</button>
            </div>
        </div>
    );
};

export default Testimonial;
