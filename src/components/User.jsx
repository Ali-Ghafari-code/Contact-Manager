import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import LoadingWrapper from "../ui/LoadingWrapper";
import { useAuth } from "../auth/AuthContext";

const User = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (currentUser && userId === String(currentUser.id)) {
          setUser(currentUser);
        } else {
          const response = await axios.get(
            `http://localhost:3001/users/${userId}`
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, currentUser]);

  if (loading) {
    return <LoadingWrapper />;
  }

  if (!user) {
    return <div className="text-center text-red-500">User not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6">
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 mb-6 font-semibold transition"
        onClick={() => navigate(-1)}
      >
        <MdArrowBack size={24} />
        <span className="ml-2 text-lg">Back</span>
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden transform transition hover:scale-105">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-28"></div>
          <div className="avatar absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={user.pic} alt={user.name} className="object-cover" />
            </div>
          </div>
        </div>
        <div className="pt-20 pb-6 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-sm mb-4 italic">@{user.username}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Email:</span>{" "}
              {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Phone:</span>{" "}
              {user.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Website:</span>{" "}
              <a
                href={`https://${user.website}`}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Age:</span>{" "}
              {user.age}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Gender:</span>{" "}
              {user.gender || "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-center text-white">
          <p className="text-sm">
            “A user’s profile speaks volumes about their personality.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
