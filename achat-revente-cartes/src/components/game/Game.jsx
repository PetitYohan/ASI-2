import NavBar from "../NavBar/NavBar";
import Chat from "../Chat/Chat";
import "./Game.css";
import Button from "@mui/material/Button";
import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectCards } from "../../core/selectors";
import { setCards } from "../../core/actions";
import SocketContext from "../../core/service/socket/socket-context";

const title = "Game";

const Game = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const userCards = useSelector(selectCards);
  const userSelect = useSelector(selectUser);
  const cardsList = [];
  const [enemyCards, setenemyCards] = useState([]);
  let room;
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    const getUserCards = async () => {
      const resp = await fetch(
        "http://127.0.0.1/api/card/user/" + userSelect.idUser
      );
      const cards = await resp.json();
      dispatch(setCards(cards));
    };

    getUserCards();

    socket.on("roomCreated", (roomCreated) => {
      room = roomCreated;
      if (socket.id == room.players[0].id) {
        setenemyCards(room.players[1].cards);
      } else {
        setenemyCards(room.players[0].cards);
      }
      setGameStart(true);
    });
  }, []);

  const sendJoinRoom = () => {
    if (cardsList.length == 5) {
      const userCardsSelected = cardsList;
      socket.emit("joinRoom", userCardsSelected);
      cardsList.map((card) => {
        document.getElementById(card.id).style.border =
          "0.2em solid rgb(44, 44, 44)";
      });
    } else {
      alert("Il faut selectionner 5 cartes pas plus pas moins !");
    }
  };

  const sendAttack = () => {
    console.log("ATTACK !!!");
  };

  const sendDisconnectRoom = () => {
    socket.emit("disconnectRoom");
    setenemyCards([]);
  };

  function playWithThisCard(card) {
    if (cardsList.indexOf(card) <= -1) {
      document.getElementById(card.id).style.border = "0.2em solid green";
      cardsList.push(card);
    } else {
      document.getElementById(card.id).style.border =
        "0.2em solid rgb(44, 44, 44)";
      const index = cardsList.indexOf(card);
      if (index > -1) {
        cardsList.splice(index, 1);
      }
    }
  }

  return (
    <>
      <NavBar title={title} />
      <Chat />
      <h2>My Cards</h2>
      <section>
        {userCards.map((card) => {
          return (
            <div
              class="cardToSelect"
              id={card.id}
              onClick={() => {
                playWithThisCard(card);
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
          );
        })}
      </section>
      {enemyCards.length > 0 && <h2>Enemy Cards</h2>}
      <section>
        {enemyCards.map((card) => {
          return (
            <div
              class="cardToSelect"
              id={card.id}
              onClick={() => {
                playWithThisCard(card);
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
          );
        })}
      </section>
      <div id="buttonGame">
        {!gameStart && (
          <Button variant="outlined" onClick={sendJoinRoom}>
            🕹️ Start game 🕹️
          </Button>
        )}
        {gameStart && (
          <Button variant="outlined" onClick={sendAttack}>
            ⚔️ Attack ⚔️
          </Button>
        )}
        <Button variant="outlined" onClick={sendDisconnectRoom}>
          🚪 Disconnect 🚪
        </Button>
      </div>
    </>
  );
};

export default Game;
