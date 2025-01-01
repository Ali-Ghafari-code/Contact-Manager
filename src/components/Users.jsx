import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingWrapper from "../ui/LoadingWrapper";
import UserProfile from "./UserProfile";
import { useAuth } from "../auth/AuthContext";

export default function Users() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        const filteredUsers = response.data.filter(
          (user) => user.id !== currentUser?.id
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  if (loading) {
    return <LoadingWrapper />;
  }

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Users List
      </h2>
      <UserProfile />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 mx-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="card bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-2xl relative mb-5"
          >
            <div className="avatar absolute top-[-30px] left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img src={user.pic} alt={user.name} />
              </div>
            </div>
            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-700">Username: {user.username}</p>
              <p className="text-gray-700">Email: {user.email}</p>
            </div>
            <div className="mt-4 text-center">
              <Link to={`/users/${user.id}`}>
                <button className="btn btn-primary px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white">
                  More Info
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
