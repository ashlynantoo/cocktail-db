import { useLoaderData, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const searchSingleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}${id}`);
      return data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(searchSingleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data: drinks } = useQuery(searchSingleCocktailQuery(id));

  if (!drinks) {
    return <Navigate to="/" />;
  }

  // if (!drinks) {
  //   return (
  //     <section className="section">
  //       <h2 className="section-title">No cocktail to display</h2>
  //     </section>
  //   );
  // }

  const {
    strDrinkThumb: image,
    strDrink: name,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = drinks[0];

  const ingredientKeys = Object.keys(drinks[0]).filter((key) => {
    return key.startsWith("strIngredient") && drinks[0][key] !== null;
  });
  const ingredients = ingredientKeys.map((key) => {
    return drinks[0][key];
  });

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
              return (
                <span key={index}>
                  {ingredient}
                  {index < ingredients.length - 1 ? "," : null}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <Link to="/" className="btn home-btn">
        Back Home
      </Link>
    </section>
  );
};

export default Cocktail;
