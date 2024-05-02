// import React from 'react'

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet"
import {Parallax, ParallaxLayer} from '@react-spring/parallax';

const Hero = () => {

    const totalFrames = 15;

    var spritesheetInstance = null;

    const scrollCallback = () => {
        const position = window.scrollY;
        // add an if statement to skip all this after reaching a certain point in the page
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

      // somehow add paralax scrolling :) and position the items right and make mobile freindly
    return (
        <div className="hero-section border border-yellow-400">
            <Parallax pages={2} className='parallax-remove-scrollbar'>
                <ParallaxLayer offset={0} speed={0.1}>
                <SpriteSheet
                            image={`src/assets/spritesheet.png`}
                            widthFrame={70}
                            heightFrame={50}
                            steps={10}
                            fps={10}
                            autoplay={true}
                            loop={true}
                            isResponsive={true}
                            />
                </ParallaxLayer>
                <ParallaxLayer offset={0.6} speed={2.5}>
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
                </ParallaxLayer>
            </Parallax>
            
        </div>
    )
}

export default Hero