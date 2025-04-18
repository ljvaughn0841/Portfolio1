//import React from 'react'
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";
import { useRef, useEffect } from 'react';
import { root } from "postcss";
import MultiFilters from "./MultiFilters"

const Projects = () => {

    var spritesheetInstance = null;
    const myRef = useRef();

    useEffect(() => {
        const options = {
          threshold: [0.05, 0.75], // triggers the callback at 5% and 75% visibility
        };
      
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            try {

              if (entry.intersectionRatio >= 0.75) {
                // spritesheetInstance.setDirection('forward');
                if(spritesheetInstance.getInfo('frame') < 19){
                  spritesheetInstance.play();
                }
              } else if (entry.intersectionRatio <= 0.05) {
                // spritesheetInstance.setDirection('rewind');
                // spritesheetInstance.play();
                spritesheetInstance.goToAndPause(1)
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


      // going to need a different format for mobile
    return (
        <div className="projects-section border border-x-teal-400 sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
        id="Projects">
            <h1 className="text-center mb-10 silkscreen-bold">Projects</h1>

            <div className="featured_project_section w-full flex-nowrap flex-row justify-stretch overflow-hidden grid grid-flow-col">
              <div className="xl:block hidden">
                <p className="micro-5-regular text-[45px] line-spacing-1.5 leading-none">
                  Here are some of the awesome projects I&#39;ve worked on!
                  <br />
                  From coding apps to digging into data, these projects showcase how I tackle problems and create cool solutions.
                </p>
              </div>
              <div className="featured_project_button mt-96 justify-self-end silkscreen-regular">
                <p>Featured Project Button</p>
              </div>
              <div ref={myRef} className="phone_reveal">
              <SpriteSheet
                  image={`src/assets/PhoneReveal_WB_spritesheet.png`}
                  widthFrame={450}
                  heightFrame={750}
                  steps={20}
                  fps={10}
                  startAt={2}
                  endAt={17}
                  autoplay={false}
                  loop={false}
                  isResponsive={true}
                  getInstance={spritesheet => {
                      spritesheetInstance = spritesheet;
                  }}
              />
              </div>
            </div>

            <MultiFilters></MultiFilters>

        </div>
        )
}

export default Projects