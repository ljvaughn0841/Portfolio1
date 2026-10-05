import { useEffect, useRef } from 'react';
import SpriteSheet from 'react-responsive-spritesheet';
import '../index.css';

import desktop_spritesheet from '../assets/desktop_spritesheet.png';
import painting from '../assets/LighthousePainting.png';
import bg_items from '../assets/BGLayoutTest.png';
import me from '../assets/me_2_spritesheet_83x127-Sheet.png';
import cat from '../assets/cat_spritesheet.png';

const TOTAL_FRAMES = 15; // For Desktop Animation (everything else just loops)
const MOBILE_BREAKPOINT = 768;
const ANIMATION_CONFIG = {
    mobile: {
        scrollDistance: 1400,
        desktop_start: 500, // Refers to the desktop sprite
        layerTravel: {
            desktop: 400,
            character: 1400,
            decor: 1100,
            painting: 804,
        },
    },
    desktop: {
        scrollDistance: 800,
        desktop_start: 500, // Refers to the desktop sprite
        layerTravel: {
            desktop: -1486,
            character: 400,
            decor: 230,
            painting: 152,
        },
    },
};

const Hero = () => {
    const desktopRef = useRef(null);
    const characterRef = useRef(null);
    const decorRef = useRef(null);
    const paintingRef = useRef(null);
    const desktopSpritesheetRef = useRef(null);

    const animationConfig = window.innerWidth < MOBILE_BREAKPOINT
        ? ANIMATION_CONFIG.mobile
        : ANIMATION_CONFIG.desktop;
    const { scrollDistance, layerTravel, desktop_start } = animationConfig;


    useEffect(() => {
        const updateAnimation = () => {

            const progress = Math.min(window.scrollY / scrollDistance, 1);
            
            const frameIndex = Math.min(
                Math.floor(
                    Math.min(
                        Math.max((window.scrollY - 
                            desktop_start
                        ) / scrollDistance, 0), 1
                    ) * TOTAL_FRAMES) -1,
                TOTAL_FRAMES
            );

            desktopSpritesheetRef.current?.goToAndPause(frameIndex);

            if (desktopRef.current) {
                desktopRef.current.style.marginTop = `${progress * layerTravel.desktop}px`;
            }
            if (characterRef.current) {
                characterRef.current.style.marginTop = `${progress * layerTravel.character}px`;
            }
            if (decorRef.current) {
                decorRef.current.style.marginTop = `${progress * layerTravel.decor}px`;
            }
            if (paintingRef.current) {
                paintingRef.current.style.marginTop = `${progress * layerTravel.painting}px`;
            }
        };

        updateAnimation();
        window.addEventListener('scroll', updateAnimation, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateAnimation);
        };
    }, [animationConfig, scrollDistance, layerTravel]);

    return (
        <div className="hero-section overflow-hidden relative" id="Home">
            <div className="mt-20 ml-6 mr-6 justify-center md:ml-24 md:mr-24">
                <h1 className="mr-auto ml-auto text-center silkscreen-regular text-4xl md:text-7xl">
                    Lou Vaughn
                </h1>
                <h1 className="mr-auto ml-auto text-center tiny5-regular text-xl md:text-5xl">
                    Developer / Data Scientist
                </h1>
            </div>

            <div className="sprite relative" id="paint" ref={paintingRef}>
                <img
                    src={painting}
                    className="absolute right-[55%] top-[20px] w-[120px] md:top-[40px] md:w-48"
                    alt=""
                />
            </div>

            <div className="sprite relative" id="decor" ref={decorRef}>
                <img
                    src={bg_items}
                    className="absolute left-[70%] top-[100px] w-[500px] max-w-none pl-10 md:left-[70%] md:top-[0px] md:w-[800px]"
                    style={{ transform: 'translateX(-50%)' }}
                    alt="Decor"
                />
            </div>

            <div className="sprite sprite-1 w-full" id="desktop" ref={desktopRef}>
                <SpriteSheet
                    image={desktop_spritesheet}
                    widthFrame={200}
                    heightFrame={150}
                    steps={TOTAL_FRAMES}
                    fps={10}
                    autoplay={false}
                    loop={false}
                    isResponsive={true}
                    getInstance={(spritesheet) => {
                        desktopSpritesheetRef.current = spritesheet;
                    }}
                />
            </div>

            <div className="sprite sprite-me" id="me" ref={characterRef}>
                <SpriteSheet
                    image={me}
                    widthFrame={83}
                    heightFrame={127}
                    steps={15}
                    fps={10}
                    autoplay={true}
                    loop={true}
                    isResponsive={true}
                />
            </div>

            <div className="sprite sprite-cat max-w-96 max-h-96" id="cat">
                <SpriteSheet
                    image={cat}
                    widthFrame={45}
                    heightFrame={45}
                    steps={10}
                    fps={7}
                    autoplay={true}
                    loop={true}
                    isResponsive={true}
                />
            </div>
        </div>
    );
};

export default Hero;
