import React, { useEffect, useState } from "react";
import {projects} from "../constants"
import "../index.css"

// The project section filters were built upon the basic multifilter from xplodivity
// See here: https://www.youtube.com/watch?v=u1yr_HZivzk

export default function MultiFilters() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(projects);
    const [selectedProject, setSelectedProject] = useState(null); // For the overlay
    const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Overlay visibility

    const filters = ["Software", "Graphics", "Data Analytics"];

    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            const filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        } else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    useEffect(() => {
        filterItems();
    }, [selectedFilters]);

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            const tempItems = selectedFilters.map((selectedCategory) => {
                const temp = projects.filter((item) => item.category === selectedCategory);
                return temp;
            });
            setFilteredItems(tempItems.flat());
        } else {
            setFilteredItems([...projects]);
        }
    };

    const openOverlay = (project) => {
        setSelectedProject(project);
        setIsOverlayOpen(true);
        document.body.style.overflow = "hidden"; // Lock scrolling
    };

    const closeOverlay = () => {
        setSelectedProject(null);
        setIsOverlayOpen(false);
        document.body.style.overflow = "auto"; // Unlock scrolling
    };

    return (
        <div className="bg-black-100 rounded-xl relative z-0">
            <div className="buttons_container pt-2 pb-2 silkscreen-regular">
                {filters.map((category, index) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
                        className={`button ${
                            selectedFilters?.includes(category) ? "active" : ""
                        }`}
                        key={`filters-${index}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="projects_container flex flex-wrap gap-7 justify-center">
                {filteredItems.map((item, idx) => (
                    <div
                        key={`items-${idx}`}
                        className="item bg-tertiary p-5 rounded-2xl sm:max-w-[360px] w-full mb-5 cursor-pointer"
                        onClick={() => openOverlay(item)} // Open overlay on click
                    >
                        <img src={item.image} alt={item.name} />
                        <p className="silkscreen-regular">{item.name}</p>
                        <p className="category tiny5-regular">{item.category}</p>
                    </div>
                ))}
            </div>

            {/* Overlay */}
            {isOverlayOpen && selectedProject && (
                <div className="overlay fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="overlay-content bg-tertiary p-8 rounded-lg relative max-w-3xl w-full">
                        <button
                            className="absolute top-4 right-4 text-black text-xl font-bold"
                            onClick={closeOverlay}
                        >
                            &times;
                        </button>
                        <h2 className="silkscreen-bold text-[30px] mb-4">{selectedProject.name}</h2>
                        <p className="tiny5-regular text-[20px] mb-4">{selectedProject.description}</p>
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.name}
                            className="w-full rounded-lg"
                        />
                        <a
                            href={selectedProject.source_code_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button mt-4 inline-block"
                        >
                            View Source Code
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}