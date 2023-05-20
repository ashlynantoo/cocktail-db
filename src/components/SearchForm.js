import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchCocktail } = useGlobalContext();
  const searchValueContainer = useRef("");

  useEffect(() => {
    searchValueContainer.current.focus();
  });

  const findCocktail = () => {
    setSearchCocktail(searchValueContainer.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="cocktailName">search your favourite cocktail</label>
          <input
            type="text"
            name="cocktailName"
            ref={searchValueContainer}
            onChange={findCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
