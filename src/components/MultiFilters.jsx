import React, { useEffect, useState } from "react";
import {projects} from "../constants"
import "../index.css"

// The project section filters were built upon the basic multifilter from xplodivity
// See here: https://www.youtube.com/watch?v=u1yr_HZivzk

export default function MultiFilters() {
    const [selectedFilters, setSelectedFilters]= useState([]);
    const [filteredItems, setFilteredItems] = useState(projects);
    let filters = ["Software", "Graphics", "Data Analytics"];


    const handleFilterButtonClick = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
          let filters = selectedFilters.filter((el) => el !== selectedCategory);
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
          let tempItems = selectedFilters.map((selectedCategory) => {
            let temp = projects.filter((item) => item.category === selectedCategory);
            return temp;
          });
          setFilteredItems(tempItems.flat());
        } else {
          setFilteredItems([...projects]);
        }
      };

    return (
    <div>
        <div className="buttons_container">
            {filters.map((category, index) =>(
                <button
                onClick={() => handleFilterButtonClick(category)}
                className={`button ${
                    selectedFilters?.includes(category) ? "active" : ""
                }`}
                key={`filters-${index}`}>
                    {category}
                </button>
            ) )}
        </div>

        <div className="projects_container flex flex-wrap gap-7">
        {filteredItems.map((item, idx) => (
          <div key={`items-${idx}`} className="item bg-tertiary p-5 rounded-2xl sm:max-w-[360px] w-full mb-5">
            <p>{item.name}</p>
            {/* <p className="category">{item.category}</p> */}
          </div>
        ))}
      </div>
    </div>
    );
}