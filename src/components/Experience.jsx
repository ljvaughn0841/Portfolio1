//import React from 'react'
//import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

// Timeline: https://www.youtube.com/watch?v=t5AE66WgQD0&t=407s

import "../index.css";
import { useEffect } from "react";
import ljv_logo from "../assets/ljv_logo.png";
import spigot_logo from "../assets/spigot_logo.png";

const Experience = () => {
    useEffect(() => {
        const timeline = document.querySelector(".timeline");
        const timelineElements = document.querySelectorAll(".timeline-container");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === timeline) {
                            timeline.classList.add("animate-line"); // Trigger line animation
                        } else {
                        entry.target.classList.add("animate"); // Trigger container animations
                        }
                    } else {
                        // if (entry.target === timeline) {
                        //     timeline.classList.remove("animate-line"); // Optional: Reset line animation
                        // } else {
                        entry.target.classList.remove("animate"); // Optional: Reset container animations
                        // }
                    }
                });
            },
            { threshold: 0.25 } // Trigger when 25% of the element is visible
        );

        // Observe the 4meline and timeline containers
        observer.observe(timeline);
        timelineElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
    
    return (
        <div className="exp-section border border-blue-600 sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0" id="Experience">
            <h1 className="text-center mb-10 silkscreen-bold text-3xl sm:text-5xl lg:text-6xl leading-tight break-words">Experience</h1>
            <div className="mt-20 timeline">
                <div className="timeline-container timeline-left">
                <img src ={ljv_logo} className="rounded-full scale-[30%] sprite"></img>
                <span className="timeline-left-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px]">Freelance Developer</h2>
                        <small className="tiny5-regular text-[20px]">2024 - Current</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                            <li>Designed and developed responsive websites to enhance user experience and functionality.</li>
                            <br />
                            <li> Optimized data pipeline processing 50,000 + products for seamless integration into a Shopify store, 
                              automating tasks such as categorization from 2000 + tags, and Shopify formatting.</li>
                        </p>
                      </div>
                </div>

                <div className="timeline-container timeline-right">
                    <img src={spigot_logo} className="rounded-full scale-[30%]" alt="Spigot Logo" />
                    <span className="timeline-right-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px]">Spigot</h2>
                        <small className="tiny5-regular text-[20px]">2023 - 2024</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                        <li>Led android development to modify and rebrand the open-source browser Chromium into a mobile port of the Wave Browser app on desktop.</li>
                        <br />
                        <li>Conducted extensive research into the Chromium Project, one of the largest open-source repositories on GitHub, to identify areas of interest for development.</li>
                        <br />
                        <li  className="max-md:hidden">Implemented a JNI bridge to access resources and code used in the desktop application.</li>
                        <br />
                        <li  className="max-md:hidden">Diagnosed and resolved 18 critical bugs to ensure seamless integration between git repositories.</li>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;