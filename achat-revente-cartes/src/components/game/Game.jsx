import NavBar from "../NavBar/NavBar";
import Chat from "../Chat/Chat";
import "./Game.css";
import Button from "@mui/material/Button";
import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectCards } from "../../core/selectors";
import { setCards } from "../../core/actions";
import SocketContext from "../../core/service/socket/socket-context";
import { useNavigate } from "react-router-dom";

const title = "Game";

const Game = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const userCards = useSelector(selectCards);
  const userSelect = useSelector(selectUser);
  const cardsList = [];
  const [enemyCards, setenemyCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [room, setRoom] = useState({ players: [{ id: null }, { id: null }] });
  const [gameStart, setGameStart] = useState(false);
  const [myCard, setMyCard] = useState(0);
  const [enemyCard, setEnemyCard] = useState(0);
  const [myPlayer, setMyPlayer] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("");
  const navigate = useNavigate();

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
      setRoom((room) => ({
        ...room,
        ...roomCreated,
      }));
    });

    socket.on("turnOf", (wichTurn) => {
      setPlayerTurn(wichTurn);
    });

    socket.on("AttackDone", (roomUpdate) => {
      setRoom((room) => ({
        ...room,
        ...roomUpdate,
      }));
    });

    socket.on("AndTheWinnerIs", (player) => {
      if (socket.id == player) {
        alert("👑 You WON 👑");
        navigate("/home");
      } else if (playerTurn == player) {
        alert("😵 You LOSE 😵");
        sendDisconnectRoom();
        navigate("/home");
      }
    });
  }, []);

  useEffect(() => {
    if (room.players[0].id != null) {
      if (socket.id == room.players[0].id) {
        setenemyCards(room.players[1].cards);
        setMyCards(room.players[0].cards);
        setMyPlayer(0);
      } else {
        setenemyCards(room.players[0].cards);
        setMyCards(room.players[1].cards);
        setMyPlayer(1);
      }
      setGameStart(true);
    }
  }, [room]);

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
    if (playerTurn == socket.id) {
      if (myCards.find((card) => card.id == myCard).hp > 0) {
        if (enemyCards.find((card) => card.id == enemyCard).hp > 0) {
          socket.emit("attack", [myCard, enemyCard]);
        } else {
          alert(
            "La carte Enemy n'a plus de vie, selectionner une autre carte à attaquer"
          );
        }
      } else {
        alert(
          "Ma carte n'a plus de vie, selectionner une autre carte pour attaquer"
        );
      }
    } else {
      alert("C'est au tour de ton adversaire");
    }
  };

  const sendDisconnectRoom = () => {
    socket.emit("disconnectRoom");
    setenemyCards([]);
    setGameStart(false);
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

  function thisIsEnemyCard(cardSelect) {
    enemyCards.forEach((card) => {
      document.getElementById(card.id).style.border =
        "0.2em solid rgb(44, 44, 44)";
    });
    document.getElementById(cardSelect.id).style.border = "0.2em solid green";
    setEnemyCard(cardSelect.id);
  }

  function thisIsMyCard(cardSelect) {
    myCards.forEach((card) => {
      document.getElementById(card.id).style.border =
        "0.2em solid rgb(44, 44, 44)";
    });
    document.getElementById(cardSelect.id).style.border = "0.2em solid green";
    setMyCard(cardSelect.id);
  }

  return (
    <>
      <NavBar title={title} />
      <Chat />
      <h2>My Cards</h2>
      {!gameStart && (
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
      )}
      {gameStart && (
        <section>
          {myCards.map((card) => {
            return (
              <div
                class="cardToSelect"
                id={card.id}
                onClick={() => {
                  thisIsMyCard(card);
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
      )}
      {gameStart && (
        <>
          <h2>Enemy Cards</h2>
          <section>
            {enemyCards.map((card) => {
              return (
                <div
                  class="cardToSelect"
                  id={card.id}
                  onClick={() => {
                    thisIsEnemyCard(card);
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
            {room.players[myPlayer].energy}
          </>
        )}
        <Button variant="outlined" onClick={sendDisconnectRoom}>
          🚪 Disconnect 🚪
        </Button>
      </div>
    </>
  );
};

export default Game;
