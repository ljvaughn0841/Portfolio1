//import React from 'react'
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";
import { useRef, useEffect } from 'react';
import { root } from "postcss";

const Projects = () => {

    var spritesheetInstance = null;
    const myRef = useRef();

    useEffect(() => {
        const options = {
          threshold: [0, 0.75], // triggers the callback at 0% and 75% visibility
        };
      
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            try {
              if (entry.intersectionRatio >= 0.75) {
              spritesheetInstance.setDirection('forward');
              spritesheetInstance.play();
            } else if (entry.intersectionRatio === 0) {
              spritesheetInstance.setDirection('rewind');
              spritesheetInstance.play();
              // spritesheetInstance.goToAndPause(1)
            }
            }
            catch {
              return
            }
          });
        }, options);
      
        if (myRef.current) {
          observer.observe(myRef.current);
        } else {
          console.log('myRef.current is null');
        }
      
        return () => {
          observer.disconnect();
        };
      }, [myRef]);

    return (
        <div className="projects-section border border-x-teal-400">
            <h1>Projects</h1>
            <div ref={myRef} className="phone_reveal">
            <SpriteSheet
                image={`src/assets/PhoneReveal_WB_spritesheet.png`}
                widthFrame={450}
                heightFrame={750}
                steps={20}
                fps={10}
                endAt={19}
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

export default Projects