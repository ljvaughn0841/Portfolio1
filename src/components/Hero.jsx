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

        // Pixel height of the hero section must be standardized for mobile and desktop seperately to prevent issues
        // The animations will also need to be responsive using media queries in JS too

        // TODO:
        // * Create background asset
        // * Create cat asset
        // * Create foreground covering asset (optional)
        // * Get rid of whitespace in the sprites/images to make them easier to workwith
        

        // !!! NOTE: NEED TO GET RID OF MOST WHITE SPACE IN THE IMAGES (so it doesnt interfere with anything)
        var frameIndex = Math.floor(position / (1600 / totalFrames) + 1);
        console.log(frameIndex);
        let desktop = document.getElementById('desktop');
        let back = document.getElementById('back');
        let me = document.getElementById('me');
        
        
        if (frameIndex < 15) {
            spritesheetInstance.goToAndPause(frameIndex)
            console.log("position is:", position)
            if (frameIndex < 8){
                desktop.style.marginTop = position * - 2 +'px'
                me.style.marginTop = position * + 0.8 + 'px'
            }
            else{
                desktop.style.marginTop = -1486 +'px';
            }
            back.style.marginTop = position * + 0.2 + 'px';
            
        }else{
            console.log(position)
            desktop.style.marginTop = -1486 +'px';
            //back.style.marginTop = 15 * + 0.2 + 'px';
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
      
      //TODO:
      // I think to make this work im going to need to use media queries and have a shorter hero section for
      // the mobile than for desktop
    
      return (
        <div className="hero-section border border-yellow-400 overflow-hidden relative">
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

            <div className='sprite sprite-3' id='me'>
            <SpriteSheet
                        image={`src/assets/me_1_spritesheet.png`}
                        widthFrame={200}
                        heightFrame={150}
                        steps={20}
                        fps={10}
                        autoplay={true}
                        loop={true}
                        isResponsive={true}
                    />
            </div>
        </div>
    )
}

export default Hero