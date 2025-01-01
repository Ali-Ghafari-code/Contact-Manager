import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LoadingWrapper from "../ui/LoadingWrapper";
import UiSign from "../ui/UiSign";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.email);
    if (success) {
      navigate("/users");
    } else {
      setError("Invalid username or email. Please try again.");
    }
  };

  return (
    <LoadingWrapper>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
        <div className=" max-w-12xl bg-white shadow-xl rounded-xl p-4 flex flex-col lg:flex-row gap-8">
          <div className="flex justify-center items-center p-6 rounded-lg">
            <UiSign />
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex-1 shadow-md rounded-lg p-6"
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Login to Your Account
            </h2>
            <div className="form-control mb-4">
              <label className="label font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-lg text-lg font-semibold"
            >
              Login
            </button>
            <div className="flex px-1 mt-2 justify-center">
              <p className="text-lg">Create an account?</p>
              <Link to={"/login"} className="px-3 text-lg btn-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Login;
