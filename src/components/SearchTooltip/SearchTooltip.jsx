import React from "react";
import { useContext } from "react";

import { UiverseContext } from "../../Context/Context";
import "./search-tooltip.css";
import right from "../../assets/images/greater-than.svg";

const SearchTooltip = ({ setIsSearching }) => {
  const { activeCategory, setActiveCategory, setActiveSubcategory } =
    useContext(UiverseContext);

  const handleSubcategoryClick = (value) => {
    setActiveSubcategory(value);
    setIsSearching(false);
  };

  return (
    <div className="tooltip">
      <div className="searchbar-category-container">
        {[...Array(5).keys()].map((index) => (
          <div
            key={index}
            className={
              activeCategory === index
                ? "searchbar-category active"
                : "searchbar-category"
            }
            onClick={() => setActiveCategory(index)}
          >
            <span>Website</span>
            {activeCategory === index && <img src={right} />}
          </div>
        ))}
      </div>
      <div className="searchbar-subcategory-container">
        <div className="heading">Explore Categories</div>
        <div className="searchbar-subcategory">
          {[...Array(10).keys()].map((index) => (
            <div
              key={index}
              className="searchbar-subcategory-title"
              onClick={() => handleSubcategoryClick(index)}
            >
              Project Management
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTooltip;
