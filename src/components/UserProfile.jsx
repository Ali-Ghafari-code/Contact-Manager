import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed top-14 md:right-10 right-3 z-20">
      <div className="dropdown dropdown-left dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1 bg-white">
          {currentUser.username}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link to={`/users/${currentUser.id}`}>Profile</Link>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
