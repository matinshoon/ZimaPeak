// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import About from './pages/About';
import Footer from './components/Footer'
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/casestudies" element={<CaseStudies />} />
          <Route path="/casestudy/:id" element={<CaseStudy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
