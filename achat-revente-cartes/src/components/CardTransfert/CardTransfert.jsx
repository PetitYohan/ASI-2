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

	function doTransaction() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: userSelect.idUser, cardId: card.id }),
		}
		fetch("http://127.0.0.1/api/store/" + transac, requestOptions).then(
			(response) => response.json()
		)
		setRefresh(!refresh)
	}

	useEffect(() => {
		const getCards = async () => {
			const resp = await fetch("http://127.0.0.1/api/card/cards")
			const cards = await resp.json()
			dispatch(setCards(cards))
		}
		const updateSolde = async () => {
			const resp = await fetch("http://127.0.0.1/api/user/" + userSelect.idUser)
			const user = await resp.json()
			dispatch(setUser(user))
		}
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
