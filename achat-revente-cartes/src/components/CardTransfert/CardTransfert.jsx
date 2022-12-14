import NavBar from "../NavBar/NavBar"
import CardList from "../CardList/CardList"
import Card from "../Card/Card"
import Button from "@mui/material/Button"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setCards, setUser } from "../../core/actions"
import { selectCards, selectCard, selectUser } from "../../core/selectors"
import "./CardTransfert.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CardTransfert = ({ transac }) => {
	const dispatch = useDispatch()
	const cardList = useSelector(selectCards)
	const card = useSelector(selectCard)
	const userSelect = useSelector(selectUser)
	const [refresh, setRefresh] = useState(false)
	let title = "BUY"
	let txtbtn = "Buy"
	let titlepage = "Market"

	async function doTransaction() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: userSelect.idUser, cardId: card.id }),
		}
		fetch("http://localhost/api/store/" + transac, requestOptions)
			.then((response) => response.json())
			.then((r) => setRefresh(!refresh))
	}

	const getCards = async () => {
		fetch("http://localhost/api/card/cards")
			.then((resp) => resp.json())
			.then((cards) => dispatch(setCards(cards)))
	}
	const updateSolde = async () => {
		fetch("http://localhost/api/user/" + userSelect.idUser)
			.then((resp) => resp.json())
			.then((user) => dispatch(setUser(user)))
	}

	useEffect(() => {
		getCards()
		updateSolde()
	}, [refresh])

	if (transac == "sell") {
		title = "SELL"
		txtbtn = "Sell"
		titlepage = "My Card"
	}

	return (
		<>
			<NavBar title={title} />
			<span id="titlepage">{titlepage}</span>
			<div id="cardTransfert">
				<div id="cardlist" className="carddisplay">
					<CardList
						cardList={cardList}
						user={userSelect.idUser}
						transac={transac}
					/>
				</div>
				<div id="cardshort" className="carddisplay">
					<Card />
					<Button className="button" variant="outlined" onClick={doTransaction}>
						{txtbtn}
					</Button>
				</div>
			</div>
		</>
	)
}

export default CardTransfert
