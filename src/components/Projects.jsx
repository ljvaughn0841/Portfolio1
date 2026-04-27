import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";
import MultiFilters from "./MultiFilters";
import Overlay from "./Overlay";
import { projects } from "../constants"; // Import the projects array

import phone_reveal from '../assets/PhoneReveal_WB_spritesheet2.png'
import arrow from '../assets/arrow.png'

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const myRef = useRef();
    let spritesheetInstance = null;

    const openOverlay = (project) => {
        setSelectedProject(project);
        setIsOverlayOpen(true);
        document.body.style.overflow = "hidden"; // Lock scrolling
    };

    const closeOverlay = () => {
        setSelectedProject(null);
        setIsOverlayOpen(false);
        document.body.style.overflow = "auto"; // Unlock scrolling
    };

    useEffect(() => {
        const options = {
            threshold: [0.05, 0.75], // triggers the callback at 5% and 75% visibility
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                try {
                    if (entry.intersectionRatio >= 0.75) {
                        if (spritesheetInstance.getInfo("frame") < 19) {
                            spritesheetInstance.play();
                        }
                    } else if (entry.intersectionRatio <= 0.05) {
                        spritesheetInstance.goToAndPause(1);
                    }
                } catch {
                    return;
                }
            });
        }, options);

        if (myRef.current) {
            observer.observe(myRef.current);
        } else {
            console.log("myRef.current is null");
        }

        return () => {
            observer.disconnect();
        };
    }, [myRef]);

    return (
        <div
            className="projects-section sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
            id="Projects"
        >
            <h1 className="text-center lg:mb-10 silkscreen-bold text-3xl sm:text-5xl lg:text-6xl leading-tight break-words">
                Projects
            </h1>
            <div className="featured_project_section w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-0 overflow-hidden">      
                {/* Featured Project Section FOR DESKTOP */}
                <div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-center lg:max-w-[500px]">
                    <p className="start2p text-white text-lg sm:text-2xl pt-8 pb-1">
                    Featured Projects
                    </p>  
                    <p className="start2p text-[14px] leading-12 max-w-[500px] mt-6">
                        Check out a featured project, or use the explorer to find something else that interests you
                    </p>
                    {/* Featured Wave Browser FOR DESKTOP */}
                    <div className="mt-8 flex flex-col items-start gap-4">
                        <button
                            className="hidden lg:inline-flex px-12 py-4 bg-[#221a4e] border-[3px] border-[#000] text-white hover:bg-[#6357b3] transition-all duration-300 silkscreen-regular whitespace-nowrap"
                            onClick={() => {
                                const waveBrowserProject = projects.find(
                                    (project) => project.name === "Wave Browser for Mobile"
                                );
                                openOverlay(waveBrowserProject);
                            }}
                        >
                            Wave Browser for Mobile
                        </button>
                        <img src={arrow} alt="Pointer" className="sprite hidden lg:block w-[220px] max-w-full scale-y-[-100%] ml-20" />
                    </div>
                </div>
                {/* Featured Section FOR MOBILE */}
                <p className="start2p text-white text-lg pt-8 pb-1 lg:hidden text-center">
                    Featured Projects
                </p>
                <div ref={myRef} className="phone_reveal relative mx-auto lg:mx-0 lg:ml-auto lg:mr-0 lg:mb-0">
                    <SpriteSheet
                        image={phone_reveal}
                        widthFrame={450}
                        heightFrame={750}
                        steps={20}
                        fps={10}
                        startAt={2}
                        endAt={17}
                        autoplay={false}
                        loop={false}
                        isResponsive={true}
                        getInstance={(spritesheet) => {
                            spritesheetInstance = spritesheet;
                        }}
                    />
                </div>
                <button
                    className="lg:hidden mx-auto px-10 py-3 bg-[#221a4e] border-[3px] border-[#000] text-white hover:bg-[#6357b3] transition-all duration-300 silkscreen-regular whitespace-nowrap"
                    onClick={() => {
                        const waveBrowserProject = projects.find(
                            (project) => project.name === "Wave Browser for Mobile"
                        );
                        openOverlay(waveBrowserProject);
                    }}
                >
                    Wave Browser for Mobile
                </button>
            </div>

            {/* Pass openOverlay to MultiFilters */}
            <MultiFilters openOverlay={openOverlay} />

            {/* Centralized Overlay */}
            <Overlay
                selectedProject={selectedProject}
                isOverlayOpen={isOverlayOpen}
                closeOverlay={closeOverlay}
            />
        </div>
    );
};

export default Projects;