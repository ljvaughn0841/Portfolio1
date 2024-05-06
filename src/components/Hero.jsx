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
        // divide the hero section into frames for the animations
        // when the desired total frames has been reached the end of the hero section will be at the bottom of screen
        // currently at 2x total frames the hero section will be at the top
        var frameIndex = Math.floor(position / (window.innerHeight / totalFrames) + 1);
        console.log(frameIndex);
        let desktop = document.getElementById('desktop');
        
        if (frameIndex < 15) {
            spritesheetInstance.goToAndPause(frameIndex)
            desktop.style.marginBottom = position * + 0.05 +'%'; 
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollCallback);
        window.addEventListener("wheel", scrollCallback);
        return () => {
            window.removeEventListener("wheel", scrollCallback);
            window.removeEventListener('scroll', scrollCallback);
        };
      }, []);

      // Having a hard time making the scrolling feel responsive
      // Started trying parrallax with the scrollCallback but its not responsive. Some solutions are:
      //    1 - Use CSS/JS to adapt to whatever screensize and animate differently
      //    2 - Make all the assets first and come back to this later
    
      return (
        <div className="hero-section border border-yellow-400 overflow-hidden">
            <div className="sprite sprite-2 w-full" id='back'>
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
            </div>

            <div className="sprite sprite-1 w-full" id='desktop'>
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