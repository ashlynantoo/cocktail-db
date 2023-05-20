import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchCocktail, setSearchCocktail] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchCocktail}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const fetchedCocktails = drinks.map((cocktail) => {
          const { idDrink, strDrink, strAlcoholic, strGlass, strDrinkThumb } =
            cocktail;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(fetchedCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchCocktail]);

  useEffect(() => {
    fetchCocktails();
  }, [searchCocktail, fetchCocktails]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchCocktail }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
