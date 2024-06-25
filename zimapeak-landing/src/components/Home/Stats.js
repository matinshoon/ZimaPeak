// Stats.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import GlassCard from '../GlassCard';
import { FaFacebook, FaGoogle } from 'react-icons/fa'; // Ensure react-icons is installed

const Stats = () => {
    const { darkMode } = useContext(ThemeContext);

    const textColor = darkMode ? 'text-white' : 'text-black';

    const statsData = [
        { id: 1, icon: <FaFacebook />, title: 'Facebook Ads' },
        { id: 2, icon: <FaGoogle />, title: 'Google Ads' },
    ];

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="my-10 text-center font-bold text-xl">Grow your business with paid ads</h1>
            <p className="text-center text-lg">
                Harness the power of Facebook and Google Ads to attract more customers, increase sales,
                and expand your business reach.
            </p>
            <div className={`flex flex-wrap w-full justify-center gap-6 p-6 ${textColor}`}>
                {statsData.map(({ id, icon, title }) => (
                    <div key={id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <GlassCard icon={icon} title={title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
