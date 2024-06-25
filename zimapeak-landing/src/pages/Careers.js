import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

const Careers = () => {
    const { darkMode } = useContext(ThemeContext);

    // Job postings data
    const jobPostings = [
        // {
        //     id: 1,
        //     title: "Frontend Developer",
        //     description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building and maintaining web applications.",
        //     link: "/apply/frontend"
        // },
        // {
        //     id: 2,
        //     title: "Backend Developer",
        //     description: "Seeking an experienced Backend Developer to develop and manage server-side logic and integration with frontend components.",
        //     link: "/apply/backend"
        // },
        // {
        //     id: 3,
        //     title: "Project Manager",
        //     description: "We need a Project Manager to oversee project planning, scheduling, budgeting, and reporting.",
        //     link: "/apply/project-manager"
        // },
        // {
        //     id: 4,
        //     title: "SEO Specialist",
        //     description: "Improve your website's visibility and ranking on search engines with our SEO services. We use the latest techniques to drive organic traffic and boost your online presence.",
        //     link: "/apply/seo-specialist"
        // },
        // {
        //     id: 5,
        //     title: "Branding Specialist",
        //     description: "Build a strong brand identity with our comprehensive branding services. From logo design to brand strategy, we help you create a memorable brand that resonates with your target audience.",
        //     link: "/apply/branding-specialist"
        // }
    ];

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        // Simulating fetching data from backend
        setTimeout(() => {
            setJobs(jobPostings);
            setIsLoading(false); // Once data is fetched, set isLoading to false
        }, 2000); // Simulate 2 seconds loading time
    }, []);

    return (
        <div className={`py-16 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Careers | Join Our Team</title>
                <meta name="description" content="Explore career opportunities at our company. We are hiring talented individuals for various positions. Apply now to join our team!" />
                <meta name="keywords" content="careers, jobs, hiring, frontend developer, backend developer, project manager, CRM systems, SEO, content creator, branding specialist" />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <h1 className="mt-32 text-3xl md:text-5xl font-bold mb-8 max-w-7xl mx-auto text-left">Careers</h1>
                <p className="mb-32 text-lg md:text-xl mb-8 text-left max-w-7xl mx-auto">
                    Explore career opportunities at our company. We are hiring talented individuals for various positions. Apply now to join our team!
                </p>
                {isLoading ? (
                    // Render loading spinner while data is being fetched
                    <div className="flex items-center justify-center h-screen">
                        <ClipLoader color={darkMode ? '#ffffff' : '#000000'} loading={isLoading} size={50} />
                    </div>
                ) : jobs.length === 0 ? (
                    // Render message when no job postings are available
                    <div className="text-center">
                        <p className="text-xl my-40">No job postings available at the moment.</p>
                    </div>
                ) : (
                    // Render job postings once data is fetched
                    jobs.map((job, index) => (
                        <div key={job.id} className={`flex justify-between py-6 border-b ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-black'}`}>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                                <p className="mb-4">{job.description}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link to={job.link}>
                                    <button className={`w-full max-w-xs px-10 py-3 rounded-2xl text-sm ${darkMode ? 'bg-sky-950 hover:bg-gray-900 hover:text-white' : 'bg-slate-900 text-white hover:bg-gray-300 hover:text-slate-900'}`}>
                                        Apply
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Careers;
