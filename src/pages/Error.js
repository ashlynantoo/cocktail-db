import { Link, useRouteError } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <section className="error-section">
        <div className="error-container">
          <img src={notFoundImg} alt="Page not found" className="notFoundImg" />
          <h1>Oops!</h1>
          <p>We couldn't find the page you are looking for</p>
          <Link to="/" className="btn">
            Back Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="error-section">
      <div className="error-container">
        <h1>Oops!</h1>
        <p>Something went wrong. Please try again later!</p>
        <Link to="/" className="btn">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;
