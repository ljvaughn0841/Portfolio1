import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import arrow2 from "../assets/arrow2.png";
import { TAG_COLORS } from "../constants";

const DEFAULT_TAG_COLOR = { bg: "#3a3a4a", text: "#ccccdd" };

const Overlay = ({ selectedProject, isOverlayOpen, closeOverlay }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [selectedProject?.name, isOverlayOpen]);

    if (!isOverlayOpen || !selectedProject) return null;

    const images = Array.isArray(selectedProject.images)
        ? selectedProject.images.filter(Boolean)
        : [selectedProject.image, selectedProject.image2, selectedProject.image3].filter(Boolean);

    const showImageNavigation = images.length > 1;

    const changeImage = (direction) => {
        setActiveImageIndex((currentIndex) => {
            if (images.length === 0) return 0;
            return (currentIndex + direction + images.length) % images.length;
        });
    };

    const handleTouchStart = (event) => {
        setTouchStartX(event.touches[0].clientX);
    };

    const handleTouchEnd = (event) => {
        if (touchStartX === null) return;

        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX;

        if (deltaX > 50) {
            changeImage(1);
        } else if (deltaX < -50) {
            changeImage(-1);
        }

        setTouchStartX(null);
    };

    return (
        <div className="overlay fixed inset-0 bg-black/75 flex justify-center items-center z-50 px-4 py-6">
            <div className="overlay-content bg-tertiary relative max-w-3xl w-full max-h-[90vh] overflow-y-auto border-8 border-t-white/10 border-l-white/10 border-b-black-100 border-r-black-100 rounded-none">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-white text-2xl font-bold leading-none closebutton"
                    onClick={closeOverlay}
                    aria-label="Close project overlay"
                >
                    &times;
                </button>
                <h2 className="silkscreen-bold text-[30px] max-md:text-[24px] mb-4 pr-8">{selectedProject.name}</h2>
                
                {images.length > 0 && (
                    <div className="mb-4">
                        <div
                            className="overlay-image-frame relative mx-auto overflow-hidden bg-black/60"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                                <img
                                    src={images[activeImageIndex]}
                                    alt={`${selectedProject.name} screenshot ${activeImageIndex + 1}`}
                                    className="h-full w-full object-contain"
                                />

                                {showImageNavigation && (
                                    <div className="hidden sm:block">
                                        <button
                                            type="button"
                                            className="overlay-nav-button flex h-11 w-11 items-center justify-center rounded-full bg-black/60 p-2 shadow-lg transition"
                                            style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)" }}
                                            onClick={() => changeImage(-1)}
                                            aria-label="Show previous image"
                                        >
                                            <img src={arrow2} alt="Previous" className="h-full w-full object-contain rotate-180" />
                                        </button>
                                        <button
                                            type="button"
                                            className="overlay-nav-button flex h-11 w-11 items-center justify-center rounded-full bg-black/60 p-2 shadow-lg transition"
                                            style={{ position: "absolute", top: "50%", right: "0.75rem", transform: "translateY(-50%)" }}
                                            onClick={() => changeImage(1)}
                                            aria-label="Show next image"
                                        >
                                            <img src={arrow2} alt="Next" className="h-full w-full object-contain" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {showImageNavigation && (
                            <div className="mt-2 flex justify-center items-center gap-2 min-h-5">
                                {images.map((_, idx) => {
                                    const isActive = idx === activeImageIndex;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            style={{ position: "static" }}
                                            onClick={() => setActiveImageIndex(idx)}
                                            aria-label={`Go to image ${idx + 1}`}
                                            className={`transition-all duration-300 ${isActive ? "h-2.5 w-8 bg-white" : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"}`}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                <p className="start2p text-[12px] mb-4">{selectedProject.description}</p>

                {selectedProject.tags?.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => {
                            const colors = (TAG_COLORS || {})[tag] || DEFAULT_TAG_COLOR;
                            return (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold"
                                    style={{ backgroundColor: colors.bg, color: colors.text }}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                )}


                {selectedProject.source_code_link && (
                    <a
                        href={selectedProject.source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button_hover mt-4 inline-block silkscreen-regular"
                    >
                        View Source Code
                    </a>
                )}
                {selectedProject.external_link && (
                    <a
                        href={selectedProject.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button_hover mt-4 inline-block silkscreen-regular"
                    >
                        See More
                    </a>
                )}
            </div>
        </div>
    );
};

Overlay.propTypes = {
    selectedProject: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string,
        image2: PropTypes.string,
        image3: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        tags: PropTypes.arrayOf(PropTypes.string),
        source_code_link: PropTypes.string,
        external_link: PropTypes.string,
    }).isRequired,
    isOverlayOpen: PropTypes.bool.isRequired,
    closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;