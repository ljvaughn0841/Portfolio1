//import React from 'react'
import { mySkills } from '../constants';
import IconSkills from "../components/IconSkills";
import SpriteSheet from "react-responsive-spritesheet";
import "../index.css";



//  TODO ITEMS HERE
//      1. Make sprite sheet image without empty space on sides
//      2. Make div always a multiple of the sprite sheet to scale well
const Skills = () => {
    return (
        <div className="skills-section mt-10 border border-green-500 overflow-x-hidden">
            <div className="flex flex-wrap gap-10 mb-10 justify-center">
                {mySkills.map((item) => (
                    <div className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] max-w-[24rem] border border-orange-700"
                    key={item.id}>
                        <div className="relative z-20 flex flex-col min-h-[22rem] p-[3rem] pointer-events-none">
                            <h5 className="mb-5">{item.title}</h5>
                            <p className="mb-6">{item.text}</p>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full z-10 scale-110">
                        <SpriteSheet
                            image={`src/assets/spritesheet.png`}
                            widthFrame={50}
                            heightFrame={50}
                            steps={10}
                            fps={10}
                            autoplay={true}
                            loop={true}
                            isResponsive={true}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <IconSkills></IconSkills>
        </div>
    )
}

export default Skills