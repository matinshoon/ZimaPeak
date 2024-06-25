import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import BookEvent from '../components/Booking/BookEvent';

const CaseStudy = () => {
    const { darkMode } = useContext(ThemeContext);
    const [caseStudy, setCaseStudy] = useState(null);
    const { id } = useParams();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/casestudy-get/${id}`);
                setCaseStudy(response.data);
            } catch (error) {
                console.error('Error fetching case study data:', error);
            }
        };

        fetchData();
    }, [id]); // Fetch data whenever the id parameter changes

    if (!caseStudy) {
        return <div>Loading...</div>;
    }

    const outcomeNames = [
        'YoY Revenue',
        'Customer Acquisition Cost',
        'Conversion Rate'
    ];

    return (
        <div id="casestudies" className={`flex justify-center items-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-black'}`}>
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
            <span className={`${darkMode ? 'blury-left' : 'blury-left'}`}></span>
            <span className={`${darkMode ? 'blury-right' : 'blury-right'}`}></span>
            <div className="container mx-auto py-40 z-10 relative flex flex-col justify-center items-center">
                <p className="mb-4 text-sky-400">{caseStudy.client}</p>
                <h1 className="text-3xl font-bold relative">{caseStudy.title}</h1>
                <p className="text-lg mt-4">{caseStudy.summary}</p>
                <div className={`w-full md:w-3/5 h-28 my-20 flex justify-around items-center text-white ${darkMode ? 'border' : 'bg-black opacity-90'} md:rounded-lg`}>
                    {caseStudy.outcome.split(',').map((outcome, index) => {
                        const number = outcome.trim();
                        return (
                            <div key={index} className="text-center">
                                <p className='font-bold text-2xl mb-2'>{number}</p>
                                <p>{outcomeNames[index]}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='mx-40 w-3/5'>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Challenge:</h2>
                        <p className="mb-10 whitespace-pre-line">{caseStudy.challenge}</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Solution:</h2>
                        <p className="mb-10 whitespace-pre-line">{caseStudy.solution}</p>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <h2 className="text-xl font-bold mb-2 mr-10">Results:</h2>
                        <p className="mb-10 whitespace-pre-line">{caseStudy.results}</p>
                    </div>
                </div>


            </div>
        </div>

    );

};

export default CaseStudy;
