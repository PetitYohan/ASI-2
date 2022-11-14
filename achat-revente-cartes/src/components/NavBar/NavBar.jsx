import { Outlet, Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <span id="solde">Solde $</span>
        </li>
        <li>
          <span>
            <b id="titre">TITRE</b>
          </span>
        </li>
        <li>
          <Link to="/">
            <img
              id="profile"
              src="./src/assets/profil_logo.png"
              alt="photo de profil"
            ></img>
          </Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};

export default NavBar;
