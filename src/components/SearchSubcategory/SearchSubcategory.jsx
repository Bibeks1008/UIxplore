import React from "react";
import { useContext, useRef, useState, useEffect } from "react";

import "./search-subcategory.css";
import { UiverseContext } from "../../Context/Context";
import right from "../../assets/images/greater-than.svg";
import left from "../../assets/images/less-than.svg";

const SearchSubcategory = () => {
  const { activeSubcategory, setActiveSubcategory } =
    useContext(UiverseContext);

  const scrollContainerRef = useRef();

  // const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth - container.scrollLeft > container.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "right" ? 100 : -100; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkOverflow, 100);
    }
  };

  // Check for overflow on component mount and whenever the window resizes
  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="search-subcategory-container">
      {canScrollLeft && (
        <div className="arrow-container" onClick={() => scroll("left")}>
          <img src={left} alt="Scroll Left" />
        </div>
      )}
      <div className="search-subcategory" ref={scrollContainerRef}>
        {[...Array(10).keys()].map((index) => (
          <span
            key={index}
            className={activeSubcategory === index ? "active" : ""}
            onClick={() => setActiveSubcategory(index)}
          >
            Project Management
          </span>
        ))}
      </div>
      {canScrollRight && (
        <div className="arrow-container" onClick={() => scroll("right")}>
          <img src={right} alt="Scroll Right" />
        </div>
      )}
    </div>
  );
};

export default SearchSubcategory;
