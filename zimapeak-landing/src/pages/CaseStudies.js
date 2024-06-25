import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookEvent from '../components/Booking/BookEvent';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

const CaseStudies = () => {
    const { darkMode } = useContext(ThemeContext);
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/casestudies-get`);
                setCaseStudies(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false even if there is an error
            }
        };

        fetchData();
    }, []);

    return (
        <div id='casestudies' className={`text-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Case Studies | Zimapeak Marketing</title>
                <meta name="description" content="Explore our case studies showcasing successful digital marketing campaigns, web development projects, and SEO strategies. Learn how we helped clients achieve their business goals." />
                <link rel="canonical" href="https://www.zimapeak.com/casestudies" />
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
            <h1 className="pt-28 pb-20 text-3xl font-bold">Case Studies</h1>
            {loading ? ( // Show loading animation if data is being fetched
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color={darkMode ? '#ffffff' : '#000000'} size={50} />
                </div>
            ) : (
                <div className="pb-20 flex flex-wrap justify-center">
                    {caseStudies.map((caseStudy, index) => (
                        <div key={index} className={`max-w-sm m-4 rounded w-full ${darkMode ? 'bg-dark' : 'bg-gray'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} hover:border-blue-500 transition duration-300`}>
                            <img src={caseStudy.banner} alt="Case Study" className="w-full h-80 object-cover object-center" />
                            <div className="px-6 py-4">
                                <div className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{caseStudy.title}</div>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{caseStudy.summary.length > 100 ? caseStudy.summary.substring(0, 100) + '...' : caseStudy.summary}</p>
                            </div>
                            <div className="px-6 pb-4">
                                <Link to={`/casestudy/${caseStudy.id}`} className={`inline-block ${darkMode ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-500'} text-white py-2 px-4 rounded`}>
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaseStudies;
