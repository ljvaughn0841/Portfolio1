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
            <h1 className='text-center mb-10'>My Skills</h1>
            <div className="flex flex-wrap gap-10 mb-10 justify-center">
                {mySkills.map((item) => (
                    <div className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] max-w-[24rem] border border-orange-700"
                    key={item.id}>
                        <div className="relative z-20 flex flex-col min-h-[22rem] p-[3rem] pointer-events-none">
                            <div className='flex mb-5 align-middle'>
                                <img src= "src\assets\laptop.JPG" className='w-16 h-16'></img>
                                <h5 className="ml-5">{item.title}</h5>
                            </div>
                            <p className="mb-6">{item.text}</p>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full z-10 scale-110">
                        <SpriteSheet
                            image={`src/assets/spritesheet.png`}
                            widthFrame={50}
                            heightFrame={50}
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
                ))}
            </div>
            <IconSkills></IconSkills>
        </div>
    )
}

export default Skills