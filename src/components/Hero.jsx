// import React from 'react'

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import "../index.css";

const Hero = () => {

    function scrollCallback() {

    }

    useEffect(() => {
        window.addEventListener('scroll', scrollCallback);
        window.addEventListener("wheel", scrollCallback);
        return () => {
            window.removeEventListener("wheel", scrollCallback);
            window.removeEventListener('scroll', scrollCallback);
        };
      }, []);

    return (
        <div className="hero-section border border-yellow-400">
            <div className="sprite sprite-1">

            </div>
        </div>
    )
}

export default Hero