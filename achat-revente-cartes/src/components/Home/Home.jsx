import NavBar from "../NavBar/NavBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Home.css";

const title = "HOME";

const Home = () => {
  return (
    <>
      <NavBar title={title} />
      <div id="home">
        <div class="choice">
          <Link to="/buy">
            <Button variant="outlined">💸 Buy 💸</Button>
          </Link>

          <Link to="/sell">
            <Button variant="outlined">💵 Sell 💵</Button>
          </Link>
        </div>

        <div class="choice">
          <Link to="/play">
            <Button variant="outlined">🕹️ Play 🕹️</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
