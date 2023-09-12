import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["cocktails", searchTerm || "all"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}${searchTerm}`);
      return data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const reqUrl = new URL(request.url);
    const searchTerm = reqUrl.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <main>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </main>
  );
};

export default Landing;
