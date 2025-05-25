import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";
import MultiFilters from "./MultiFilters";
import Overlay from "./Overlay";
import { projects } from "../constants"; // Import the projects array

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
            className="projects-section border border-x-teal-400 sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
            id="Projects"
        >
            <h1 className="text-center mb-10 silkscreen-bold text-3xl sm:text-5xl lg:text-6xl leading-tight break-words">
                Projects
            </h1>

            <div className="featured_project_section w-full flex-nowrap flex-row justify-stretch overflow-hidden grid grid-flow-col">
                <div className="xl:block hidden">
                    <p className="tiny5-regular text-[32px] line-spacing-1.5 leading-none">
                        Here are some of the awesome projects I&#39;ve worked on!
                    </p>
                </div>
                <div className="featured_project_button mt-96 justify-self-end silkscreen-regular">
                    <button
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                        onClick={() => {
                            const waveBrowserProject = projects.find(
                                (project) => project.name === "Wave Browser for Mobile"
                            );
                            openOverlay(waveBrowserProject);
                        }}
                    >
                        Featured Project Button
                    </button>
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
                        getInstance={(spritesheet) => {
                            spritesheetInstance = spritesheet;
                        }}
                    />
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