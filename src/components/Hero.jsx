// import React from 'react'

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet"

const Hero = () => {

    const totalFrames = 15;

    var spritesheetInstance = null;

    const scrollCallback = () => {
        const position = window.scrollY;
        var frameIndex = Math.floor(position / (window.innerHeight / totalFrames) + 1);
        console.log(frameIndex);
        spritesheetInstance.goToAndPause(frameIndex)
    };

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
            <div className="sprite sprite-1 w-full justify-center">
            <SpriteSheet
                image={`src/assets/desktop_spritesheet.png`}
                widthFrame={200}
                heightFrame={150}
                steps={15}
                fps={10}
                autoplay={false}
                loop={false}
                isResponsive={true}
                getInstance={spritesheet => {
                    spritesheetInstance = spritesheet;
                  }}
            />
            </div>
        </div>
    )
}

export default Hero