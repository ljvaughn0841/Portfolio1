import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const Overlay = ({ selectedProject, isOverlayOpen, closeOverlay }) => {
    if (!isOverlayOpen || !selectedProject) return null;

    return (
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
    );
};

// Add PropTypes for validation
Overlay.propTypes = {
    selectedProject: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        source_code_link: PropTypes.string.isRequired,
    }).isRequired, // selectedProject must be an object with the specified shape
    isOverlayOpen: PropTypes.bool.isRequired, // Must be a boolean
    closeOverlay: PropTypes.func.isRequired, // Must be a function
};

export default Overlay;