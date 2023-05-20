import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchCocktail = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const {
          strDrinkThumb: image,
          strDrink: name,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const selectedCocktail = {
          image,
          name,
          info,
          category,
          glass,
          instructions,
          ingredients,
        };
        setCocktail(selectedCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCocktail();
  }, [id, fetchCocktail]);

  if (loading) {
    return <Loading />;
  }

  if (cocktail) {
    const { image, name, info, category, glass, instructions, ingredients } =
      cocktail;
    return (
      <section className="section cocktail-section">
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name: </span>
              {name}
            </p>
            <p>
              <span className="drink-data">category: </span>
              {category}
            </p>
            <p>
              <span className="drink-data">info: </span>
              {info}
            </p>
            <p>
              <span className="drink-data">glass: </span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instructions: </span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients: </span>
              {ingredients.map((ingredient, index) => {
                return ingredient && <span key={index}>{ingredient}</span>;
              })}
            </p>
          </div>
        </div>
        <Link to="/" className="btn btn-primary home-btn">
          Back Home
        </Link>
      </section>
    );
  } else {
    return (
      <section className="section">
        <h2 className="section-title">No cocktail to display</h2>
      </section>
    );
  }
};

export default SingleCocktail;
