//import React from 'react'
import { mySkills } from '../constants';
import IconSkills from "../components/IconSkills";
import SpriteSheet from "react-responsive-spritesheet";
import "../index.css";

const Skills = () => {
    return (
        <div className="mt-10 border border-green-500">
            <SpriteSheet
                id = {'FRAME'}
                image={`src/assets/spritesheet.png`}
                widthFrame={70}
                heightFrame={50}
                steps={10}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                />
            <div className="flex flex-wrap gap-10 mb-10 justify-center">
                {mySkills.map((item) => (
                    <div className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] border border-orange-700" key={item.id}>
                        <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                            <h5 className="mb-5">{item.title}</h5>
                            <p className="mb-6">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <IconSkills></IconSkills>
        </div>
    )
}

export default Skills