import { Link } from "react-router-dom";
import { selectUser } from "../../core/selectors";
import { useSelector } from "react-redux";
import "./NavBar.css";

const NavBar = ({ title }) => {
  const userSelect = useSelector(selectUser);
  return (
    <div id="navbar">
      <span id="solde">{userSelect.account} $</span>
      <span id="titre">
        <b>{title}</b>
      </span>
      <div id="user">
        <Link to="/home">
          <span>{userSelect.surName}</span>
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
