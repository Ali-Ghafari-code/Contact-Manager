import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Users from "./components/Users";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserChart from "./ui/UserChart";
import Tabs from "./ui/Tabs";
import User from "./components/User";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Tabs />
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chart"
              element={
                <ProtectedRoute>
                  <Tabs />
                  <UserChart />
                </ProtectedRoute>
              }
            />
             <Route
            path="/users/:userId"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
