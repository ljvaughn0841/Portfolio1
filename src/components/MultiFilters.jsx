import React, { useEffect, useRef, useState } from "react";
import { projects, TAG_COLORS } from "../constants";
import "../index.css";
import PropTypes from "prop-types";

TagPill.propTypes = {
    tag: PropTypes.string.isRequired,
    removable: PropTypes.bool,
    onRemove: PropTypes.func,
};

const getAllTags = () => {
    const tagSet = new Set();
    projects.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
    return [...tagSet].sort();
};

const allTags = getAllTags();
const DEFAULT_TAG_COLOR = { bg: "#3a3a4a", text: "#ccccdd" };

function TagPill({ tag, removable, onRemove }) {
    const colors = (TAG_COLORS || {})[tag] || DEFAULT_TAG_COLOR;
    return (
        <span
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold border-2 border-opacity-40 transition-all duration-200 hover-device:hover:border-opacity-100"
            style={{ 
                backgroundColor: colors.bg, 
                color: colors.text,
                borderColor: colors.text,
            }}
        >
            {tag}
            {removable && (
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
                    className="hover-device:hover:opacity-100 transition-opacity leading-none ml-0.5 font-bold"
                    aria-label={`Remove ${tag} filter`}
                >
                    ✕
                </button>
            )}
        </span>
    );
}

export default function MultiFilters({ openOverlay }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredItems, setFilteredItems] = useState(projects);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
    );
    const [visibleCount, setVisibleCount] = useState(isMobile ? 4 : 6);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
    const dropdownRef = useRef(null);

    const filters = ["Software", "Data Analytics", "Creative Work"];
    const projectsPerBatch = isMobile ? 4 : 6;

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            const updatedFilters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(updatedFilters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    const handleTagToggle = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleMediaChange = (e) => {
            setIsMobile(e.matches);
            setVisibleCount(e.matches ? 4 : 6);
        };

        mediaQuery.addEventListener("change", handleMediaChange);
        return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    useEffect(() => {
        setVisibleCount(projectsPerBatch);
        filterItems();
    }, [selectedFilters, selectedTags, projectsPerBatch]);

    const filterItems = () => {
        let result = [...projects];

        if (selectedFilters.length > 0) {
            result = result.filter((item) => selectedFilters.includes(item.category));
        }

        if (selectedTags.length > 0) {
            result = result.filter((item) =>
                selectedTags.every((tag) => (item.tags || []).includes(tag))
            );
        }

        setFilteredItems(result);
    };

    const tagsNotSelected = allTags.filter((t) => !selectedTags.includes(t));

    return (
        <div className="bg-black-200 relative z-0 mt-12 pb-12 pl-5 pr-5
            border-8 border-t-white/10 border-l-white/10 border-b-black/40 border-r-black/20 rounded-none transition-all duration-500">
            
            {/* Title with glow effect */}
            <p className="start2p text-white text-lg sm:text-3xl px-2 pt-8 pb-4 text-center drop-shadow-[0_0_8px_rgba(99,87,179,0.4)] transition-all duration-300">
                Project Explorer
            </p>

            {/* Filter Buttons Container */}
            <div className="buttons_container pt-2 pb-4 silkscreen-regular flex flex-col gap-1 sm:gap-0">
                {/* Category Filter Buttons */}
                <div className="flex w-full gap-1 sm:gap-5">
                    {filters.map((category, index) => (
                        <button
                            onClick={() => handleFilterButtonClick(category)}
                            className={`button flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm md:text-base transition-all duration-300 transform active:scale-95 touch-none ${
                                selectedFilters?.includes(category) 
                                    ? "active shadow-lg shadow-[#6357b3]/60 brightness-125 hover-device:hover:brightness-125 hover-device:hover:scale-105" 
                                    : "hover-device:hover:brightness-150 hover-device:hover:shadow-md hover-device:hover:shadow-[#6357b3]/40 hover-device:hover:scale-105"
                            }`}
                            key={`filters-${index}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Technologies Dropdown */}
                <div className="relative inline-block" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((o) => !o)}
                        className={`button flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm md:text-base transition-all duration-300 transform active:scale-95 touch-none ${
                            selectedTags.length > 0 
                                ? "active shadow-lg shadow-[#6357b3]/60 brightness-125 hover-device:hover:brightness-125 hover-device:hover:scale-105" 
                                : "hover-device:hover:brightness-150 hover-device:hover:shadow-md hover-device:hover:shadow-[#6357b3]/40 hover-device:hover:scale-105"
                        }`}
                    >
                        <span>Technologies</span>
                        {selectedTags.length > 0 && (
                            <span className="bg-black/10 text-white text-xs px-1.5 py-0.5 leading-none font-bold border-2 border-white/50">
                                {selectedTags.length}
                            </span>
                        )}
                        <svg
                            className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-[#1a1a2e] border-3 border-white/20 shadow-2xl shadow-[#6357b3]/40 z-50 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Selected Tags Display */}
                            {selectedTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pb-3 border-b-2 border-white/10">
                                    {selectedTags.map((tag) => (
                                        <TagPill key={tag} tag={tag} removable onRemove={handleTagToggle} />
                                    ))}
                                </div>
                            )}

                            {/* Available Tags */}
                            {tagsNotSelected.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {tagsNotSelected.map((tag) => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handleTagToggle(tag)} 
                                            className="opacity-60 hover-device:hover:opacity-100 transition-all duration-200 transform hover-device:hover:scale-110"
                                            style={{
                                                WebkitFontSmoothing: 'antialiased',
                                                WebkitBackfaceVisibility: 'hidden',
                                                backfaceVisibility: 'hidden',
                                                willChange: 'transform',
                                            }}
                                        >
                                            <TagPill tag={tag} />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/40 text-xs text-center py-2 font-mono">All tags selected</p>
                            )}

                            {/* Clear All Button */}
                            {selectedTags.length > 0 && (
                                <button
                                    onClick={() => setSelectedTags([])}
                                    className="text-xs text-white/40 hover:text-white/80 transition-colors text-right mt-2 font-mono hover:underline"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Project Cards Grid */}
            <div className="flex flex-wrap gap-6 justify-center mt-6">
                {filteredItems.length > 0 ? (
                    filteredItems.slice(0, visibleCount).map((item, idx) => (
                        <div
                            key={`items-${idx}`}
                            className="item bg-tertiary p-5 sm:max-w-[340px] w-full mb-3 cursor-pointer border-4 border-t-white/10 border-l-white/10 border-b-black-100 border-r-black-100 rounded-none transition-all duration-300 transform active:scale-95 group touch-none hover-device:hover:scale-105 hover-device:hover:shadow-2xl hover-device:hover:shadow-[#6357b3]/50"
                            onClick={() => openOverlay(item)}
                            onMouseEnter={() => setHoveredCardIndex(idx)}
                            onMouseLeave={() => setHoveredCardIndex(null)}
                        >
                            {/* Image Container with glow overlay */}
                            <div className="relative overflow-hidden mb-2">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    style={{ aspectRatio: "11/8" }}
                                    className="transition-transform duration-300 hover-device:group-hover:scale-110"
                                />
                            </div>

                            {/* Card Content */}
                            <p className="silkscreen-regular text-white hover-device:group-hover:text-[#6357b3] transition-colors duration-300">
                                {item.name}
                            </p>
                            <p className="category tiny5-regular text-white/70 hover-device:group-hover:text-white/80 transition-colors duration-300">
                                {item.category}
                            </p>

                            {/* Tags */}
                            {item.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {item.tags.map((tag) => (
                                        <TagPill key={tag} tag={tag} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="w-full py-12 text-center">
                        <p className="text-white/40 silkscreen-regular text-sm">
                            No projects match the selected filters.
                        </p>
                    </div>
                )}
            </div>

            {(visibleCount < filteredItems.length || visibleCount > projectsPerBatch) && (
                <div className="flex justify-center gap-3 mt-6">
                    {visibleCount < filteredItems.length && (
                        <button
                            onClick={() => setVisibleCount((count) => count + projectsPerBatch)}
                            className="button px-4 py-2 text-xs sm:text-sm transition-all duration-300 transform active:scale-95 hover-device:hover:brightness-150 hover-device:hover:shadow-md hover-device:hover:shadow-[#6357b3]/40 hover-device:hover:scale-105"
                        >
                            Show More
                        </button>
                    )}
                    {visibleCount > projectsPerBatch && (
                        <button
                            onClick={() => setVisibleCount(projectsPerBatch)}
                            className="button px-4 py-2 text-xs sm:text-sm transition-all duration-300 transform active:scale-95 hover-device:hover:brightness-150 hover-device:hover:shadow-md hover-device:hover:shadow-[#6357b3]/40 hover-device:hover:scale-105"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

MultiFilters.propTypes = {
    openOverlay: PropTypes.func.isRequired,
};