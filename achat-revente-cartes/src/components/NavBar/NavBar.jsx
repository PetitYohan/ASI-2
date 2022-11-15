import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div id="navbar">
      <span id="solde">Solde $</span>
      <span id="titre">
        <b>TITRE</b>
      </span>
      <div id="user">
        <Link to="/">
          <span>Jdoe</span>
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
