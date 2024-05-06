import React from 'react';
import video1 from '../videos/1.mp4';
import video2 from '../videos/2.mp4';
import video3 from '../videos/3.mp4';
import video4 from '../videos/4.mp4';
import video5 from '../videos/5.mp4';
import video6 from '../videos/6.mp4';
import video7 from '../videos/7.mp4';
import video8 from '../videos/8.mp4';
import video9 from '../videos/9.mp4';
import video10 from '../videos/10.mp4';
import video11 from '../videos/11.mp4';
import video12 from '../videos/12.mp4';

const Slider = () => {
  return (
    <div className="slider">
      <div className="slide-track flex">
        <div className="slide w-full">
          <video className="w-full" src={video1} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video2} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video3} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video4} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video5} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video6} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video7} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video8} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video9} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video10} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video11} autoPlay loop muted></video>
        </div>
        <div className="slide w-full">
          <video className="w-full" src={video12} autoPlay loop muted></video>
        </div>
      </div>
    </div>
  );
};

export default Slider;
