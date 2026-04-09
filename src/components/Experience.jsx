//import React from 'react'
//import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

// Timeline: https://www.youtube.com/watch?v=t5AE66WgQD0&t=407s

import "../index.css";
import { useEffect } from "react";
import ljv_logo from "../assets/ljv_logo.png";
import spigot_logo from "../assets/spigot_logo.png";
import ucf_logo from "../assets/ucf_logo.png";
import fgcu_logo from "../assets/fgcu_logo.png";


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
                        // entry.target.classList.remove("animate"); // Optional: Reset container animations
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
        <div className="exp-section sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0" id="Experience">
            <h1 className="text-center mb-10 silkscreen-bold text-3xl sm:text-5xl lg:text-6xl leading-tight break-words">Experience</h1>

            <div className="mt-20 timeline">
                
                <div className="timeline-container timeline-right">
                    <img src={ucf_logo} className="rounded-full scale-[30%]" alt="UCF Logo" />
                    <span className="timeline-right-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px] max-md:text-[24px]">Masters Student</h2>
                        <small className="tiny5-regular text-[20px]">Data Analytics @ UCF<br />2024 - 2026</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                        <li>Cummulative GPA of 3.9 / 4.0</li>
                        <br />
                        <li>Active member of Knight Hacks participating in 5+ competitive hackathons</li>
                        <br />
                        <li>Conducted a large scale research project in collaboration with the Ben Sawyer Lab analyzing global typographic data (36 million web requests)</li>
                        </p>
                    </div>
                </div>

                <div className="timeline-container timeline-left">
                <img src ={ljv_logo} className="rounded-full scale-[30%] sprite"></img>
                <span className="timeline-left-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px] max-md:text-[24px]">Freelance Developer</h2>
                        <small className="tiny5-regular text-[20px]">2024 - 2025</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                            <li>Designed and developed responsive websites to enhance user experience and functionality.</li>
                            <br />
                            <li>Optimized data pipeline processing 50,000 + products for seamless integration into a Shopify store, 
                              automating tasks such as categorization from 2000 + tags, and Shopify formatting.</li>
                        </p>
                      </div>
                </div>

                <div className="timeline-container timeline-right">
                    <img src={spigot_logo} className="rounded-full scale-[30%]" alt="Spigot Logo" />
                    <span className="timeline-right-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px] max-md:text-[24px]">Spigot</h2>
                        <small className="tiny5-regular text-[20px]">(Now Eightpoint)<br />2023 - 2024</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                        <li>Led android development to modify and rebrand the open-source browser Chromium into a mobile port of the Wave Browser app on desktop.</li>
                        </p>
                    </div>
                </div>

                <div className="timeline-container timeline-left">
                <img src ={fgcu_logo} className="rounded-full scale-[30%]"></img>
                <span className="timeline-left-arrow"></span>
                    <div className="text-box">
                        <h2 className="silkscreen-regular text-[30px] max-md:text-[24px]">Bachelors Student</h2>
                        
                        <small className="tiny5-regular text-[20px]">Software Engineering @ FGCU<br />2019 - 2023</small>
                        <p className="start2p md:leading-5 -indent-8 pl-8 max-[1200px]:text-[13px] text-[14px] max-sm:hidden">
                            <li>Graduated Magna Cum Laude with a Cummulative GPA of 3.74 / 4.0</li>
                            <br />
                            <li>Deans list for 6 Semesters</li>
                        </p>
                      </div>
                </div>

            </div>
        </div>
    );
};

export default Experience;