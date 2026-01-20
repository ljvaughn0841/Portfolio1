import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";
import MultiFilters from "./MultiFilters";
import Overlay from "./Overlay";
import { projects } from "../constants"; // Import the projects array

import phone_reveal from '../assets/PhoneReveal_WB_spritesheet2.png'

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
            <div className="lg:block hidden">
                    <p className="start2p text-[24px] leading-12 absolute max-w-[500px]">
                        Here are some of the awesome projects I&#39;ve worked on!
                    </p>
            </div>
            <div className="featured_project_section w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">
                {/* Optional: Add text or other content on the left here if needed */}
                <div className="flex-1"></div>
                <div ref={myRef} className="phone_reveal relative lg:ml-auto lg:mr-0 lg:order-2 order-1 mb-10 lg:mb-0">
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
                    {/* Temporary Curved Arrow SVG */}
                    <svg
                        className="hidden lg:block absolute z-10"
                        style={{
                            left: '-13rem',
                            bottom: '6rem',
                            width: '13rem',
                            height: '14rem',
                        }}
                        viewBox="0 0 176 224"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M 16 216 Q 16 40, 160 40"
                            stroke="#3B82F6"  // Tailwind blue-500
                            strokeWidth="8"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                        />
                        <defs>
                            <marker
                                id="arrowhead"
                                markerWidth="8"
                                markerHeight="8"
                                refX="4"
                                refY="4"
                                orient="auto"
                            >
                                <polygon points="0,0 8,4 0,8" fill="#3B82F6" />
                            </marker>
                        </defs>
                    </svg>
                    <button
                        className="px-10 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 silkscreen-regular absolute left-1/2 -translate-x-1/2 max-lg:translate-y-1/2 bottom-0 z-20
                                   lg:-left-80 lg:bottom-8 lg:translate-x-0 lg:px-12 whitespace-nowrap"
                        onClick={() => {
                            const waveBrowserProject = projects.find(
                                (project) => project.name === "Wave Browser for Mobile"
                            );
                            openOverlay(waveBrowserProject);
                        }}
                    >
                        Featured Project
                    </button>
                </div>
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