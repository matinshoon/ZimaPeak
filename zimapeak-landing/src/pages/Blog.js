// src/pages/Blog.js
import React, { useContext } from 'react'; // Import useContext from react
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../ThemeContext';

const Blog = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`py-16 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Helmet>
                <title>Blog | Working on it :)</title>
                <meta name="description" content="Stay tuned for our latest blog posts. We're working on it :)" />
                <meta name="keywords" content="blog, articles, news, updates" />
            </Helmet>
            <div className="max-w-7xl mx-auto h-screen flex items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-bold text-center">This page is not available<br /><br />Working on it :)</h1>
            </div>
        </div>
    );
};

export default Blog;
