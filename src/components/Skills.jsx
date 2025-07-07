//import React from 'react'
import { mySkills } from '../constants';
import IconSkills from "../components/IconSkills";
import SpriteSheet from "react-responsive-spritesheet";
import "../index.css";

import silver from "../assets/skill_box_silver.png";
import gold from "../assets/skill_box_gold.png";
import bronze from "../assets/skill_box_bronze.png";


const skill_boxes = [
    silver,
    gold,
    bronze
];


//  TODO ITEMS HERE
//      1. Make sprite sheet image without empty space on sides
//      2. Make div always a multiple of the sprite sheet to scale well
//      3. It might be nice to have different sprites for each skill, and heights symbolic of rank.
const Skills = () => {
    return (
        <div className="skills-section mt-10 border border-green-500 
        overflow-x-hidden sm:px-0 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0" 
        id="Skills">
            <h1 className='text-center mb-10 silkscreen-bold'>My Skills</h1>
            <div className="flex flex-wrap-reverse gap-10 mb-10 justify-center">
                {mySkills.map((item, idx) => {
                    return (
                    <div className= {`skill-block block aspect-square relative p-0.5 bg-no-repeat bg-[length:100%_100%] max-w-[24rem] border border-orange-700 custom-order-${idx}`}
                    key={item.id}>
                        <div className="relative z-20 flex flex-col h-full p-[3rem] pointer-events-none">
                            <div className='flex mb-5'>
                                <img src= {item.icon} className='w-16 h-16 sm:w-24 sm:h-24 sprite'></img>
                                <div className='align-middle items-center flex'>
                                    <h5 className="ml-3 text-[clamp(1rem,6vw,2rem)] tiny5-regular">{item.title}</h5>
                                </div>
                            </div>
                            <p className="mb-6 text-[clamp(0.75rem,4vw,1.25rem)] tiny5-regular">{item.text}</p>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full z-0">
                        <SpriteSheet
                            image={skill_boxes[idx]}
                            widthFrame={45}
                            heightFrame={45}
                            steps={10}
                            fps={10}
                            autoplay={false}
                            loop={false}
                            isResponsive={true}
                            onMouseEnter={spritesheet => {
                                spritesheet.play();
                                console.log(spritesheet.frame)
                              }}
                            onMouseLeave={spritesheet =>{
                                spritesheet.goToAndPause(1)
                            }}
                            />
                        </div>
                    </div>
                    );
                })}
            </div>
            <IconSkills></IconSkills>
        </div>
    )
}

export default Skills