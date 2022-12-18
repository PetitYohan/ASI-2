import NavBar from "../NavBar/NavBar"
import Chat from "../Chat/Chat"
import "./Game.css"
import Button from "@mui/material/Button"
import { useEffect, useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectCards } from "../../core/selectors"
import { setCards } from "../../core/actions"
import { useNavigate } from "react-router-dom"
import { socket } from "../../core/service/socket"
import { Grid } from "@mui/material"

const title = "Game"

const Game = () => {
	const dispatch = useDispatch()
	const userCards = useSelector(selectCards)
	const userSelect = useSelector(selectUser)
	const cardsList = []
	//TODO use gameReducer/State
	const [enemyCards, setenemyCards] = useState([])
	const [myCards, setMyCards] = useState([])
	const [room, setRoom] = useState({ players: [{ id: null }, { id: null }] })
	const [gameStart, setGameStart] = useState(false)
	const [myCard, setMyCard] = useState(0)
	const [enemyCard, setEnemyCard] = useState(0)
	const [myPlayer, setMyPlayer] = useState(0)
	const [playerTurn, setPlayerTurn] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		const getUserCards = async () => {
			const resp = await fetch(
				"http://localhost/api/card/user/" + userSelect.idUser
			)
				.then((res) => res.json())
				.then((cards) => dispatch(setCards(cards)))
				.catch((err) => console.log(err))
		}

		getUserCards()

		socket.on("roomCreated", (roomCreated) => {
			setRoom((room) => ({
				...room,
				...roomCreated,
			}))
		})

		socket.on("turnOf", (wichTurn) => {
			setPlayerTurn(wichTurn)
		})

		socket.on("AttackDone", (roomUpdate) => {
			setRoom((room) => ({
				...room,
				...roomUpdate,
			}))
		})

		//TODO laisser le serveur envoyer le bon msg
		socket.on("AndTheWinnerIs", (player) => {
			if (socket.id == player) {
				alert("👑 You WON 👑")
				navigate("/home")
			} else if (playerTurn == player) {
				alert("😵 You LOSE 😵")
				sendDisconnectRoom()
				navigate("/home")
			}
		})
	}, [])

	useEffect(() => {
		if (room.players[0].id != null) {
			if (socket.id == room.players[0].id) {
				setenemyCards(room.players[1].cards)
				setMyCards(room.players[0].cards)
				setMyPlayer(0)
			} else {
				setenemyCards(room.players[0].cards)
				setMyCards(room.players[1].cards)
				setMyPlayer(1)
			}
			setGameStart(true)
		}
	}, [room])

	const sendJoinRoom = () => {
		if (cardsList.length == 5) {
			const userCardsSelected = cardsList
			//TODO dispatch
			socket.emit("joinRoom", userCardsSelected)
			cardsList.map((card) => {
				document.getElementById(card.id).style.border =
					"0.2em solid rgb(44, 44, 44)"
			})
		} else {
			alert("Il faut selectionner 5 cartes pas plus pas moins !")
		}
	}

	const sendAttack = () => {
		if (playerTurn == socket.id) {
			if (myCards.find((card) => card.id == myCard).hp > 0) {
				if (enemyCards.find((card) => card.id == enemyCard).hp > 0) {
					//TODO dispatch
					socket.emit("attack", [myCard, enemyCard])
				} else {
					alert(
						"La carte Enemy n'a plus de vie, selectionner une autre carte à attaquer"
					)
				}
			} else {
				alert(
					"Ma carte n'a plus de vie, selectionner une autre carte pour attaquer"
				)
			}
		} else {
			alert("C'est au tour de ton adversaire")
		}
	}

	const sendDisconnectRoom = () => {
		//TODO dispatch
		socket.emit("disconnectRoom")
		setenemyCards([])
		setGameStart(false)
	}

	function playWithThisCard(card) {
		if (cardsList.indexOf(card) <= -1) {
			document.getElementById(card.id).style.border = "0.2em solid green"
			cardsList.push(card)
		} else {
			document.getElementById(card.id).style.border =
				"0.2em solid rgb(44, 44, 44)"
			const index = cardsList.indexOf(card)
			if (index > -1) {
				cardsList.splice(index, 1)
			}
		}
	}

	function thisIsEnemyCard(cardSelect) {
		enemyCards.forEach((card) => {
			document.getElementById(card.id).style.border =
				"0.2em solid rgb(44, 44, 44)"
		})
		document.getElementById(cardSelect.id).style.border = "0.2em solid green"
		setEnemyCard(cardSelect.id)
	}

	function thisIsMyCard(cardSelect) {
		myCards.forEach((card) => {
			document.getElementById(card.id).style.border =
				"0.2em solid rgb(44, 44, 44)"
		})
		document.getElementById(cardSelect.id).style.border = "0.2em solid green"
		setMyCard(cardSelect.id)
	}

	return (
		<>
			<NavBar title={title} />
			<Grid container direction="row">
				<Grid item xs={3}>
					<Chat />
				</Grid>
				<Grid item xs={9}>
					{gameStart && playerTurn == socket.id && (
						<h2 className="Turn">My Turn</h2>
					)}
					{gameStart && playerTurn != socket.id && (
						<h2 className="Turn">Enemy Turn</h2>
					)}
					<h2>My Cards</h2>
					{!gameStart && (
						<section id="cardChoiceList">
							{userCards?.map((card) => {
								return (
									<div
										className="cardToSelect"
										key={card.id}
										id={card.id}
										onClick={() => {
											playWithThisCard(card)
										}}
									>
										<div id="first_card">
											{card.energy}⚡ {card.hp.toFixed(2)}❤️ <br />
											{card.attack.toFixed(2)}🗡️ {card.defence.toFixed(2)}🛡️
										</div>
										<img
											id="img_cardGame"
											src={card.smallImgUrl}
											alt="Image de la carte"
										></img>
										<div id="desc_card" title={card.description}>
											{card.name}
										</div>
									</div>
								)
							})}
						</section>
					)}
					{gameStart && (
						<section>
							{myCards.map((card) => {
								return (
									<div
										className="cardToSelect"
										id={card.id}
										onClick={() => {
											thisIsMyCard(card)
										}}
									>
										<div id="first_card">
											{card.energy}⚡ {card.name} {card.hp}❤️
										</div>
										<img
											id="img_cardGame"
											src={card.smallImgUrl}
											alt="Image de la carte"
										></img>
										<div id="desc_card">{card.description}</div>
									</div>
								)
							})}
						</section>
					)}
					{gameStart && (
						<>
							<h2>Enemy Cards</h2>
							<section>
								{enemyCards.map((card) => {
									return (
										<div
											className="cardToSelect"
											id={card.id}
											onClick={() => {
												thisIsEnemyCard(card)
											}}
										>
											<div id="first_card">
												{card.energy}⚡ {card.name} {card.hp}❤️
											</div>
											<img
												id="img_cardGame"
												src={card.smallImgUrl}
												alt="Image de la carte"
											></img>
											<div id="desc_card">{card.description}</div>
										</div>
									)
								})}
							</section>
						</>
					)}

					<div id="buttonGame">
						{!gameStart && (
							<Button variant="outlined" onClick={sendJoinRoom}>
								🕹️ Start game 🕹️
							</Button>
						)}
						{gameStart && (
							<>
								<Button variant="outlined" onClick={sendAttack}>
									⚔️ Attack ⚔️
								</Button>
								💧{room.players[myPlayer].energy}
							</>
						)}
						<Button variant="outlined" onClick={sendDisconnectRoom}>
							🚪 Disconnect 🚪
						</Button>
					</div>
				</Grid>
			</Grid>
		</>
	)
}

export default Game
