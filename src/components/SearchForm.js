import { Form, useNavigation } from "react-router-dom";

const SearchForm = ({ searchTerm }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="section">
      <Form className="search-form">
        <div className="form-control">
          <label htmlFor="search">search your favorite cocktail</label>
          <div className="search-area">
            <input type="search" name="search" defaultValue={searchTerm} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn search-btn"
            >
              {isSubmitting ? "Searching" : "Search"}
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default SearchForm;
