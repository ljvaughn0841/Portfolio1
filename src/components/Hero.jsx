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
        SMOOTHING: 0.08, // 0.08 = smoother/laggier, 0.2 = snappier

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
        SMOOTHING: 0.2, // 0.08 = smoother/laggier, 0.2 = snappier
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
    const { scrollDistance, layerTravel, desktop_start, SMOOTHING } = animationConfig;
    const layerStyle = (travel) => ({
        '--travel': `${travel}px`,
        '--scroll-distance': `${scrollDistance}px`,
    });

    useEffect(() => {
        const supportsScrollTimeline = Boolean(
            window.CSS?.supports?.('animation-timeline: scroll()')
            && window.CSS?.supports?.('animation-range: 0px 100px')
            && window.CSS?.supports?.('translate: 0px 1px')
        );
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY; // start in sync so a restored scroll position doesn't animate in
        let lastFrame = null;
        let lastTime = 0;
        let rafId = null;

        const updateSpritesheet = (scrollY) => {
            const frameIndex = Math.min(
                Math.floor(
                    Math.min(
                        Math.max((scrollY - desktop_start) / scrollDistance, 0), 1
                    ) * TOTAL_FRAMES) - 1,
                TOTAL_FRAMES
            );

            // Only touch the spritesheet when the frame actually changes
            if (frameIndex !== lastFrame) {
                desktopSpritesheetRef.current?.goToAndPause(frameIndex);
                lastFrame = frameIndex;
            }
        };

        const renderFallback = (scrollY) => {
            const progress = Math.min(scrollY / scrollDistance, 1);
            updateSpritesheet(scrollY);

            if (characterRef.current) {
                characterRef.current.style.transform =
                    `translate3d(0, ${progress * layerTravel.character}px, 0)`;
            }
            if (desktopRef.current) {
                desktopRef.current.style.marginTop = `${progress * layerTravel.desktop}px`;
            }
            if (decorRef.current) {
                decorRef.current.style.marginTop = `${progress * layerTravel.decor}px`;
            }
            if (paintingRef.current) {
                paintingRef.current.style.marginTop = `${progress * layerTravel.painting}px`;
            }
        };

        const tick = (time) => {
            const dt = lastTime ? Math.min(time - lastTime, 50) : 16.67;
            lastTime = time;

            // Frame-rate independent easing
            const factor = 1 - Math.pow(1 - SMOOTHING, dt / 16.67);
            currentScroll += (targetScroll - currentScroll) * factor;

            // Snap when close enough, then stop the loop
            if (Math.abs(targetScroll - currentScroll) < 0.1) {
                currentScroll = targetScroll;
                renderFallback(currentScroll);
                rafId = null;
                lastTime = 0;
                return;
            }

            renderFallback(currentScroll);
            rafId = requestAnimationFrame(tick);
        };

        const onScroll = () => {
            targetScroll = window.scrollY;
            if (supportsScrollTimeline) {
                updateSpritesheet(targetScroll);
                return;
            }

            if (rafId === null) {
                rafId = requestAnimationFrame(tick);
            }
        };

        if (supportsScrollTimeline) {
            updateSpritesheet(currentScroll);
        } else {
            renderFallback(currentScroll);
        }
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [animationConfig, scrollDistance, layerTravel, desktop_start, SMOOTHING]);

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

            <div
                className="sprite relative parallax-layer"
                id="paint"
                ref={paintingRef}
                style={layerStyle(layerTravel.painting)}
            >
                <img
                    src={painting}
                    className="absolute right-[55%] top-[20px] w-[120px] md:top-[40px] md:w-48"
                    alt=""
                />
            </div>

            <div
                className="sprite relative parallax-layer"
                id="decor"
                ref={decorRef}
                style={layerStyle(layerTravel.decor)}
            >
                <img
                    src={bg_items}
                    className="absolute left-[70%] top-[100px] w-[500px] max-w-none pl-10 md:left-[70%] md:top-[0px] md:w-[800px]"
                    style={{ transform: 'translateX(-50%)' }}
                    alt="Decor"
                />
            </div>

            <div
                className="sprite sprite-1 w-full parallax-layer"
                id="desktop"
                ref={desktopRef}
                style={layerStyle(layerTravel.desktop)}
            >
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

            <div
                className="sprite sprite-me parallax-layer"
                id="me"
                ref={characterRef}
                style={layerStyle(layerTravel.character)}
            >
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
