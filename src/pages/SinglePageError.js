import { useRouteError } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();

  return (
    <section className="error-section">
      <div className="error-container">
        <h1>Oops!</h1>
        <p>{error.message}</p>
      </div>
    </section>
  );
};

export default SinglePageError;
