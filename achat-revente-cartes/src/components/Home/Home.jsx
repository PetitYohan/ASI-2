import NavBar from "../NavBar/NavBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./home.css";

const title = "HOME";

const Home = ({ user }) => {
  return (
    <>
      <NavBar user={user} title={title} />
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
          <Button
            variant="outlined"
            onClick={() => {
              alert("Coming soon");
            }}
          >
            🕹️ Play 🕹️
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
