//import React from 'react'
//import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

// Timeline: https://www.youtube.com/watch?v=t5AE66WgQD0&t=407s

import "../index.css";

const Experience = () => {
    return (
        <div className="exp-section border border-blue-600 sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
            <h1 className="text-center mb-10 silkscreen-bold">Experience</h1>
            <div className="mt-20 timeline">
                <div className="timeline-container timeline-left">
                <img src ="src\assets\ljv_logo.png" className="rounded-full scale-[30%]"></img>
                <span className="timeline-left-arrow"></span>
                    <div className="text-box">
                        <h2>Freelance Developer</h2>
                        <small>2024 - Current</small>
                        <p>
                            Designed and developed responsive websites to enhance user experience and functionality.
                            Optimized data pipeline processing 50,000 + products for seamless integration into a Shopify store, 
                            automating tasks such as categorization from 2000 + tags, and Shopify formatting.

                        </p>
                    </div>
                </div>

                <div className="timeline-container timeline-right">
                    <img src ="src\assets\spigot_logo.png" className="rounded-full scale-[30%]"></img>
                    <span className="timeline-right-arrow"></span>
                    <div className="text-box">
                        <h2>Spigot</h2>
                        <small>2023 - 2024</small>
                        <p>
                        Led android development to modify and rebrand the open-source browser Chromium into a mobile port of the Wave Browser app on desktop.
                        Conducted extensive research into the Chromium Project, one of the largest open-source repositories on GitHub, to identify areas of interest for development.
                        Implemented a JNI bridge to access resources and code used in the desktop application.
                        Diagnosed and resolved 18 critical bugs to ensure seamless integration between git repositories.
                        Languages: C++, Java
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Experience