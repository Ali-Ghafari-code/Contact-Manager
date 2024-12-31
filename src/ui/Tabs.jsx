import { useLocation, Link } from "react-router-dom";

export default function Tabs() {
  const location = useLocation();

  return (
    <div role="tablist" className="tabs tabs-lifted py-2">
      <Link
        to="/users"
        role="tab"
        className={`tab ${location.pathname === "/users" ? "tab-active" : ""}`}
      >
        Users List
      </Link>
      <Link
        to="/chart"
        role="tab"
        className={`tab ${location.pathname === "/chart" ? "tab-active" : ""}`}
      >
        Chart
      </Link>
    </div>
  );
}
