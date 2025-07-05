
import SpriteSheet from "react-responsive-spritesheet"

/*
STEPS

Get mouse position relative to screen or whatever
When mouse is left progress to the left until frame 1
When mouse is right progress to the right until frame 30


OR
Get mouse position relative to obj or screen
Represent that position as a percentage of horizontal screen
Use goToAndPause to progress to the horizontal percentage in the frames

*/


// TODO: use a map to load all the images in a div with a min width
//       and then use custom CSS to set order (like with main skill boxes) so that best skills are on top.


import Cplusplus_sprite from "../assets/C_spritesheet.png";
import JS_sprite from "../assets/JS_spritesheet.png";
import PY_sprite from "../assets/PY_spritesheet.png";
import HTML_sprite from "../assets/HTML_spritesheet.png";
import CSS_sprite from "../assets/CSS_spritesheet.png";

const IconSkills = () => {
    return (
        <div className="flex flex-wrap-reverse gap-5 mb-10 border-orange-300 border justify-center min-h-fit">
            <div className="SkillIcon min-w-32 sm:my-5">
                <SpriteSheet
                image={Cplusplus_sprite}
                widthFrame={70}
                heightFrame={50}
                steps={30}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                onLoopComplete={spritesheet => {
                    if(spritesheet.getInfo('direction') == 'forward')
                        spritesheet.setDirection('rewind')
                    else
                    spritesheet.setDirection('forward')
                  }}
                />
            </div>

            <div className="SkillIcon min-w-32 sm:my-5">
                <SpriteSheet
                image={JS_sprite}
                widthFrame={70}
                heightFrame={50}
                steps={30}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                onLoopComplete={spritesheet => {
                    if(spritesheet.getInfo('direction') == 'forward')
                        spritesheet.setDirection('rewind')
                    else
                    spritesheet.setDirection('forward')
                  }}
                />
                </div>
                
                <div className="SkillIcon min-w-32 sm:my-5">
                <SpriteSheet
                image={PY_sprite}
                widthFrame={70}
                heightFrame={50}
                steps={30}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                onLoopComplete={spritesheet => {
                    if(spritesheet.getInfo('direction') == 'forward')
                        spritesheet.setDirection('rewind')
                    else
                    spritesheet.setDirection('forward')
                  }}
                />
                </div>
            
                <div className="SkillIcon min-w-32 sm:my-5">
                <SpriteSheet
                image={HTML_sprite}
                widthFrame={70}
                heightFrame={50}
                steps={30}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                onLoopComplete={spritesheet => {
                    if(spritesheet.getInfo('direction') == 'forward')
                        spritesheet.setDirection('rewind')
                    else
                    spritesheet.setDirection('forward')
                  }}
                />
                </div>

                <div className="SkillIcon min-w-32 sm:my-5">
                <SpriteSheet
                image={CSS_sprite}
                widthFrame={70}
                heightFrame={50}
                steps={30}
                fps={10}
                autoplay={true}
                loop={true}
                isResponsive={true}
                onLoopComplete={spritesheet => {
                    if(spritesheet.getInfo('direction') == 'forward')
                        spritesheet.setDirection('rewind')
                    else
                    spritesheet.setDirection('forward')
                  }}
                />
                </div>
        </div>
        
        )
}

export default IconSkills