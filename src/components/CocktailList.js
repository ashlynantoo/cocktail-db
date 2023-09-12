import CocktailCard from "./CocktailCard";

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return (
      <section className="section">
        <h2 className="section-title">No matching cocktails found</h2>
      </section>
    );
  }

  const cocktails = drinks.map((cocktail) => {
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

  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          return <CocktailCard key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
