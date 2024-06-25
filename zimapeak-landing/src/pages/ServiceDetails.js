import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import services from '../data/servicesData'; // Adjust path as needed
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';

const ServiceDetails = () => {
    const { serviceName } = useParams();
    const service = services.find(service => service.link === `/services/${serviceName}`);
    const { darkMode } = useContext(ThemeContext);

    if (!service) {
        return <div className={`py-16 px-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Service not found!</div>;
    }

    const { title, description, slang, image, why, how, background, metaTitle, metaDescription, metaKeywords } = service;

    return (
        <div className={`py-40 px-6 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
            </Helmet>
            <h1 className="text-6xl font-bold mb-6 text-center">{title}</h1>
            <p className="text-lg mb-20 text-center max-w-3xl">{description}</p>
            <img src={image} alt={title} className="rounded-lg shadow-lg mb-10 md:mb-20 md:mr-6 w-full md:max-w-3xl" />

            <div className="flex flex-col items-left justify-center w-full max-w-3xl">
                <div>
                    <h1 className="font-bold text-xl">Why {title}?</h1>
                    <p className="my-10">{why}</p>
                </div>
                <div>
                    <h1 className="font-bold text-xl">How {title} helps your business</h1>
                    <p className="my-10">{how}</p>
                </div>
                <div>
                    <h1 className="font-bold text-xl">Our background in {title}</h1>
                    <p className="my-10">{background}</p>
                </div>

                <h2 className="text-xl mt-20 text-center font-semibold mb-6">{slang}</h2>
                <Link to="/booking">
                    <button className={`w-full px-10 py-3 rounded-2xl text-white text-xl font-bold bg-primary ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300 hover:text-slate-900'}`}>
                        Book a free Discovery Call
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetails;
