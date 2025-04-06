//import React from 'react';
import "../index.css";
import SpriteSheet from "react-responsive-spritesheet";

// TODO: Testimonials Section. Need at least 3 testimonials to make it look good.
const Contact = () => {
    return (
        <div className="contact-section border border-purple-600" id="Contact">
            {/* Testimonials WIP (double contact-section height when adding)

            <div className="testimonials border border-l-rose-600">

            </div>
            */}

            <div className="border border-lime-500 mr-24 ml-24 h-[46vh] relative">
                {/* Contact Info */}
                <h1 className="silkscreen-regular">Lets Get In Touch!</h1>

                {/* Using an image for my email to prevent spam.
                Maybe consider making a spam mail.*/}

                <img src="src\assets\email.png"></img>



                <div className='absolute right-[210px] bottom-[40px] size-fit'>
                    <a href="https://www.linkedin.com/in/lou-vaughn/" target="_blank" rel="noopener noreferrer" className="linkedin-button pixel-button sprite"></a>
                </div>

                <div className='absolute right-[120px] bottom-[40px] size-fit'>
                    <a href="https://github.com/ljvaughn0841" target="_blank" rel="noopener noreferrer" className="github-button pixel-button sprite"></a>
                </div>
                


            </div>
        </div>
    )
}

export default Contact