import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData);
  try {
    const { data } = await axios.post(url, formEntries);
    toast.success(data.msg);
    return redirect("/");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="form" method="POST">
      <h4>Our Newsletter</h4>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          First Name:
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email ID:
        </label>
        <input
          type="text"
          className="form-input last-input"
          name="email"
          id="email"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-block">
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
};

export default Newsletter;
