import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, title }) => {
  return (
    <div id="navbar">
      <span id="solde">{user.accountUser} $</span>
      <span id="titre">
        <b>{title}</b>
      </span>
      <div id="user">
        <Link to="/">
          <span>{user.surName}</span>
          <img
            id="profile"
            src="./src/assets/profil_logo.png"
            alt="photo de profil"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
