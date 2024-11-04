import React, { useEffect, useState } from "react";
import { useContext } from "react";

import Card from "../Card/Card";
import { UiverseContext } from "../../Context/Context";
import { getColorName } from "../../util/findSubcategoryList";

import "./card-container.css";

const CardContainer = () => {
  const {
    activeSubcategory,
    activeCategory,
    allWebsiteData,
    websiteDataWithElements,
    isFetchingWebsites,
  } = useContext(UiverseContext);

  console.log("activeCategory in cardcontainer =>", activeCategory);
  const [filteredWebsiteData, setFilteredWebsiteData] = useState(
    activeCategory === "UI Elements" ? websiteDataWithElements : allWebsiteData
  );

  useEffect(() => {
    let filteredData =
      activeCategory === "UI Elements"
        ? websiteDataWithElements
        : allWebsiteData;
    if (activeSubcategory !== "All" && activeCategory === "Websites") {
      filteredData = allWebsiteData?.filter(
        (data) => data?.website?.category?.name === activeSubcategory
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "Type System") {
      filteredData = allWebsiteData?.filter((data) =>
        data?.website?.fonts
          ?.split(",")
          .map((font) => font.trim())
          .map((font) =>
            font
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          )
          .includes(activeSubcategory)
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "Color System") {
      filteredData = allWebsiteData?.filter((data) =>
        data?.website?.colors
          ?.split(",")
          .map((color) => color.trim())
          .map((color) => getColorName(color))
          .includes(activeSubcategory)
      );
    }

    if (activeSubcategory !== "All" && activeCategory === "UI Elements") {
      filteredData = websiteDataWithElements?.filter(
        (data) =>
          data?.element?.element?.charAt(0).toUpperCase() +
            data?.element?.element?.slice(1) ===
          activeSubcategory
      );
    }

    setFilteredWebsiteData(filteredData);
  }, [
    activeCategory,
    activeSubcategory,
    allWebsiteData,
    websiteDataWithElements,
  ]);

  console.log("filtered SUBCATEGORY list is: ====>", filteredWebsiteData);
  console.log("all website data is: ====>", allWebsiteData);
  return (
    <div className="card-container">
      {isFetchingWebsites && <div className="loader">Loading Website Data...</div>}
      {!isFetchingWebsites &&
        filteredWebsiteData?.map((websiteData, index) => (
          <Card
            key={websiteData?.website?._id}
            websiteData={websiteData}
            activeCategory={activeCategory}
          />
        ))}
    </div>
  );
};

export default CardContainer;
