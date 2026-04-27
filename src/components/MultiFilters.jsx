import React, { useEffect, useRef, useState } from "react";
import { projects, TAG_COLORS } from "../constants";
import "../index.css";
import PropTypes from "prop-types";

// The project section filters were built upon the basic multifilter from xplodivity
// See here: https://www.youtube.com/watch?v=u1yr_HZivzk

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
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold"
            style={{ backgroundColor: colors.bg, color: colors.text }}
        >
            {tag}
            {removable && (
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
                    className="hover:opacity-70 transition-opacity leading-none"
                    aria-label={`Remove ${tag} filter`}
                >
                    ×
                </button>
            )}
        </span>
    );
}

export default function MultiFilters({ openOverlay }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredItems, setFilteredItems] = useState(projects);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filters = ["Software", "Graphics", "Data Analytics"];

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
        filterItems();
    }, [selectedFilters, selectedTags]);

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
        <div className="bg-black-100 rounded-xl relative z-0 mt-12">
            {/* Title */}
            <p className="start2p text-white text-lg sm:text-3xl px-2 pt-8 pb-1 text-center">
                Project Explorer
            </p>
            <div className="buttons_container pt-2 pb-2 silkscreen-regular flex flex-col gap-2 sm:gap-0">
            {/* Row 1: category filters */}
            <div className="flex w-full gap-2">
                {filters.map((category, index) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
                        className={`button flex-1 px-3 py-2 text-[13px] sm:text-base ${
                            selectedFilters?.includes(category) ? "active" : ""
                        }`}
                        key={`filters-${index}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Technologies dropdown */}
            <div className="relative inline-block" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`button flex items-center gap-2 px-3 py-2 text-[13px] sm:text-base ${
                        selectedTags.length > 0 ? "active" : ""
                    }`}
                >
                    <span>Technologies</span>
                    {selectedTags.length > 0 && (
                        <span className="bg-white/20 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                            {selectedTags.length}
                        </span>
                    )}
                    <svg
                        className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute left-0 mt-1 w-56 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl z-50 p-3 flex flex-col gap-2">
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pb-2 border-b border-white/10">
                                {selectedTags.map((tag) => (
                                    <TagPill key={tag} tag={tag} removable onRemove={handleTagToggle} />
                                ))}
                            </div>
                        )}
                        {tagsNotSelected.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                                {tagsNotSelected.map((tag) => (
                                    <button key={tag} onClick={() => handleTagToggle(tag)} className="opacity-60 hover:opacity-100 transition-opacity">
                                        <TagPill tag={tag} />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white/40 text-xs text-center py-1">All tags selected</p>
                        )}
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="text-xs text-white/40 hover:text-white/70 transition-colors text-right mt-1"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                )}
            </div>
            </div>

            <div className="projects_container flex flex-wrap gap-7 justify-center">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <div
                            key={`items-${idx}`}
                            className="item bg-tertiary p-5 rounded-2xl sm:max-w-[360px] w-full mb-5 cursor-pointer"
                            onClick={() => openOverlay(item)}
                        >
                            <img src={item.image} alt={item.name} style={{ aspectRatio: "11/8" }} />
                            <p className="silkscreen-regular">{item.name}</p>
                            <p className="category tiny5-regular">{item.category}</p>
                            {item.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {item.tags.map((tag) => (
                                        <TagPill key={tag} tag={tag} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-white/40 silkscreen-regular py-10">
                        No projects match the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
}

MultiFilters.propTypes = {
    openOverlay: PropTypes.func.isRequired,
};