import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main>
      <Navbar />
      {isLoading ? (
        <section className="loading-window">
          <div className="loading"></div>
        </section>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Home;
