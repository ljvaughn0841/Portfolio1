//import React from 'react';
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";

// TODO: Testimonials Section. Need at least 3 testimonials to make it look good.
const Contact = () => {
    return (
        <div className="contact-section" id="Contact">
            {/* Testimonials WIP (double contact-section height when adding)

            <div className="testimonials border border-l-rose-600">

            </div>
            */}

            <div className="md:mr-24 md:ml-24 h-[46vh] relative">
                {/* Contact Info */}
                <h1 className="silkscreen-regular text-center max-md:text-[32px] mt-10">Lets Get In Touch!</h1>

                <h2 className="start2p text-center max-md:text-[12px]">loujvaughn@gmail.com</h2>

                <div className="flex justify-center gap-12 absolute bottom-20 w-full">
                    <a
                        href="https://www.linkedin.com/in/lou-vaughn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-button pixel-button sprite"
                    ></a>
                    <a
                        href="https://github.com/ljvaughn0841"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-button pixel-button sprite"
                    ></a>

                    <a
                        href="src/assets/LouVaughn_Resume.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-button pixel-button sprite"
                    ></a>

                </div>

                
                


            </div>
        </div>
    )
}

export default Contact