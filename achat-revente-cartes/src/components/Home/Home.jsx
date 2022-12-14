import NavBar from "../NavBar/NavBar"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import "./Home.css"

const title = "HOME"

const Home = () => {
	return (
		<>
			<NavBar title={title} />
			<div id="home">
				<div className="choice">
					<Link to="/buy">
						<Button variant="outlined">đ¸ Buy đ¸</Button>
					</Link>

					<Link to="/sell">
						<Button variant="outlined">đĩ Sell đĩ</Button>
					</Link>
				</div>

				<div className="choice">
					<Link to="/game">
						<Button variant="outlined">đšī¸ Play đšī¸</Button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Home
