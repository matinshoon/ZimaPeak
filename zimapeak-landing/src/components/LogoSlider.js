import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import Testimonial from './Testimonial';

import Logodark1 from '../images/logoslider/dark-1.png';
import Logodark2 from '../images/logoslider/dark-2.png';
import Logodark3 from '../images/logoslider/dark-3.png';
import Logodark4 from '../images/logoslider/dark-4.png';
import Logodark5 from '../images/logoslider/dark-5.png';
import Logodark6 from '../images/logoslider/dark-6.png';
import Logodark7 from '../images/logoslider/dark-7.png';
import Logodark8 from '../images/logoslider/dark-8.png';
import Logodark9 from '../images/logoslider/dark-9.png';
import Logodark10 from '../images/logoslider/dark-10.png';
import Logodark11 from '../images/logoslider/dark-11.png';
import Logodark12 from '../images/logoslider/dark-12.png';
import Logodark13 from '../images/logoslider/dark-13.png';
import Logodark14 from '../images/logoslider/dark-14.png';
import Logodark15 from '../images/logoslider/dark-15.png';
import Logodark16 from '../images/logoslider/dark-16.png';
import Logodark17 from '../images/logoslider/dark-17.png';
import Logodark18 from '../images/logoslider/dark-18.png';
import Logodark19 from '../images/logoslider/dark-19.png';
import Logodark20 from '../images/logoslider/dark-20.png';
import Logodark21 from '../images/logoslider/dark-21.png';

import Logolight1 from '../images/logoslider/light-1.png';
import Logolight2 from '../images/logoslider/light-2.png';
import Logolight3 from '../images/logoslider/light-3.png';
import Logolight4 from '../images/logoslider/light-4.png';
import Logolight5 from '../images/logoslider/light-5.png';
import Logolight6 from '../images/logoslider/light-6.png';
import Logolight7 from '../images/logoslider/light-7.png';
import Logolight8 from '../images/logoslider/light-8.png';
import Logolight9 from '../images/logoslider/light-9.png';
import Logolight10 from '../images/logoslider/light-10.png';
import Logolight11 from '../images/logoslider/light-11.png';
import Logolight12 from '../images/logoslider/light-12.png';
import Logolight13 from '../images/logoslider/light-13.png';
import Logolight14 from '../images/logoslider/light-14.png';
import Logolight15 from '../images/logoslider/light-15.png';
import Logolight16 from '../images/logoslider/light-16.png';
import Logolight17 from '../images/logoslider/light-17.png';
import Logolight18 from '../images/logoslider/light-18.png';
import Logolight19 from '../images/logoslider/light-19.png';
import Logolight20 from '../images/logoslider/light-20.png';
import Logolight21 from '../images/logoslider/light-21.png';

const LogoSlider = () => {
    const { darkMode } = useContext(ThemeContext);

    const darkLogos = [
        Logodark1, Logodark2, Logodark3, Logodark4, Logodark5, Logodark6, Logodark7,
        Logodark8, Logodark9, Logodark10, Logodark11, Logodark12, Logodark13, Logodark14,
        Logodark15, Logodark16, Logodark17, Logodark18, Logodark19, Logodark20, Logodark21
    ];
    
    const lightLogos = [
        Logolight1, Logolight2, Logolight3, Logolight4, Logolight5, Logolight6, Logolight7,
        Logolight8, Logolight9, Logolight10, Logolight11, Logolight12, Logolight13, Logolight14,
        Logolight15, Logolight16, Logolight17, Logolight18, Logolight19, Logolight20, Logolight21
    ];

    // Generate the image sources based on the theme
    const logos = Array.from({ length: 21 }, (_, i) => {
        const index = i + 1;
        const logoName = darkMode ? darkLogos[index - 1] : lightLogos[index - 1];
        return logoName;
    });

    return (
        <section className="py-5 my-3">
            <h1 className="mb-20 text-center font-bold mb-20 text-3xl">Trusted by numerous businesses</h1>
            <div className="slider-logo">
                <div className="flex flex-wrap justify-center slide-track">
                    {logos.map((logo, i) => (
                        <div key={i} className="slide mx-2 mb-3">
                            <img src={logo} height="100" width="250" alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-3 slider-logo">
                <div className="flex flex-wrap justify-center slide-track-reverse">
                    {logos.map((logo, i) => (
                        <div key={i} className="slide mx-2 mb-3">
                            <img src={logo} height="100" width="250" alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LogoSlider;
