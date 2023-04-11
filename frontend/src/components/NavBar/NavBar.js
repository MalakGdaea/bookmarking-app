import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-item"><Link to="/">Dashboard</Link></div>
      <div className="nav-item"><Link to="/mybookmarks">My Bookmarks</Link></div>
    </div>
  );
}
export default NavBar;
