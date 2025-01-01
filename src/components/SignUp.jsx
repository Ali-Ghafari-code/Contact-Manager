import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import UiLogin from "../ui/UiLogin";
import LoadingWrapper from "../ui/LoadingWrapper";
import { useNavigate, Link } from "react-router-dom";
import Avatars from "../ui/avatars";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    gender: "",
    age: "",
    pic: "",
  });

  const [error, setError] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email } = formData;

    const usernameExists = users.some((user) => user.username === username);
    const emailExists = users.some((user) => user.email === email);

    if (usernameExists) {
      setError("Username is already taken. Please choose a different one.");
      return;
    }

    if (emailExists) {
      setError("Email is already registered. Please use a different email.");
      return;
    }

    const { name, phone, website, gender, age, pic } = formData;
    if (
      !name ||
      !username ||
      !email ||
      !phone ||
      !website ||
      !gender ||
      !age ||
      !pic
    ) {
      setError("All fields are required. Please fill out every field.");
      return;
    }

    setError("");
    await signUp(formData);
    navigate("/login");
  };

  return (
    <LoadingWrapper>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-4 flex flex-col lg:flex-row gap-8">
          <div className="flex justify-center items-center p-6 rounded-lg">
            <UiLogin />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 shadow-md rounded-lg p-6"
          >
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Create Your Account
            </h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                />
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                />
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                />
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label font-medium text-gray-700">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full rounded-lg bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-lg p-4 bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200"
                />
              </div>
            </div>
            <div>
              {formData.gender !== "" && (
                <Avatars
                  gender={formData.gender}
                  setPic={(pic) => setFormData({ ...formData, pic })}
                />
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-lg text-lg font-semibold"
            >
              Sign Up
            </button>
            <div className="flex px-1 mt-2 justify-center">
              <p className="text-lg">Have an account?</p>
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

export default SignUp;
