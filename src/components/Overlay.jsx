import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ selectedProject, isOverlayOpen, closeOverlay }) => {
    // Overlay just shows basic info about the project.
    // Needs to be expanded on later.
    if (!isOverlayOpen || !selectedProject) return null;

    // Collect all available images
    const images = [selectedProject.image, selectedProject.image2, selectedProject.image3].filter(Boolean);

    return (
        <div className="overlay fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="overlay-content bg-tertiary p-8 rounded-lg relative max-w-3xl w-full">
                <button
                    className="absolute top-4 right-4 text-white text-xl font-bold"
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
                <a
                    href={selectedProject.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button mt-4 inline-block"
                >
                    See More
                </a>
            </div>
        </div>
    );
};

// Add PropTypes for validation
Overlay.propTypes = {
    selectedProject: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        image2: PropTypes.string,
        image3: PropTypes.string,
        source_code_link: PropTypes.string,
        external_link: PropTypes.string,
    }).isRequired,
    isOverlayOpen: PropTypes.bool.isRequired,
    closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;