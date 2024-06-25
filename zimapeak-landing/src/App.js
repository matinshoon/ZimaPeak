import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails.js';
import Booking from './pages/Booking';
import About from './pages/About';
import Careers from './pages/Careers.js';
import Blog from './pages/Blog.js';
import Privacy from './pages/Privacy.js';
import Footer from './components/Footer';
import { ThemeContext } from './ThemeContext';
import ReactGA from 'react-ga4'; // Import react-ga4

function App() {
  const { darkMode } = useContext(ThemeContext);

  // Initialize ReactGA with your Measurement ID
  useEffect(() => {
    ReactGA.initialize('G-HPT4N840JY'); // Replace with your Measurement ID
    ReactGA.send('pageview'); // Track initial pageview
  }, []);

  return (
    <Router>
      <HelmetProvider>
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
          <Helmet>
            <title>Zimapeak Marketing | Toronto Digital Marketing Agency</title>
            <meta name="description" content="Zimapeak Marketing is a leading digital marketing agency in Toronto offering web development, SEO services, and social media marketing." />
            <link rel="canonical" href="https://www.zimapeak.com/" />
          </Helmet>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceName" element={<ServiceDetails />}/>
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/casestudies" element={<CaseStudies />} />
            <Route path="/casestudy/:id" element={<CaseStudy />} />
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;
