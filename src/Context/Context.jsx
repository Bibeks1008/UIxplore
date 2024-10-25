import { createContext, useState } from "react";

export const UiverseContext = createContext(null);

export default function Contextprovider({ children }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSubcategory, setActiveSubcategory] = useState(0)

  const contextValue = {
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory
  };
  return (
    <UiverseContext.Provider value={contextValue}>
      {children}
    </UiverseContext.Provider>
  );
}
