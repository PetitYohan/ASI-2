import NavBar from "../NavBar/NavBar";
import Chat from "../Chat/Chat";
import "./Game.css";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectCards } from "../../core/selectors";
import { setCards } from "../../core/actions";
import SocketContext from "../../core/service/socket/socket-context";

const title = "Game";

const Game = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const userCards = useSelector(selectCards);
  const userSelect = useSelector(selectUser);

  useEffect(() => {
    socket.on("co", () => {
      console.log("co");
      setIsConnected(true);
    });

    socket.on("deco", () => {
      setIsConnected(false);
    });

    const getUserCards = async () => {
      const resp = await fetch("http://127.0.0.1/api/card/user/"+userSelect.idUser);
      const cards = await resp.json();
      dispatch(setCards(cards));
    };

    getUserCards();

    return () => {
      socket.off("co");
      socket.off("deco");
    };
  }, []);


  const sendConnect = () => {
    socket.emit("connectio");
  };

  const sendDeconnect = () => {
    socket.emit("deconnectio");
  };

  const sendJoinRoom = () => {
    const userCardsSelected = [{ cardId: 12},{ cardId: 13 }];
    socket.emit("joinRoom", userCardsSelected);
  };

  const sendDisconnectRoom = () => {
    socket.emit("disconnectRoom");
  };

  return (
    <>
      <NavBar title={title} />
      <Chat />
      <p>Connected: {"" + isConnected}</p>
      <button onClick={sendConnect}>Send Connect</button>
      <button onClick={sendDeconnect}>Send Deconnect</button>
      <button onClick={sendJoinRoom}>Send joinRoom</button>
      <button onClick={sendDisconnectRoom}>Send disconnectRoom</button>
      <select>
        {userCards.map((card) => {
          return(
          <option value={card.cardId}>{card.name}</option>
          )
        })}
      </select>
      <Button
        variant="outlined"
        onClick={() => {
          launchGame();
        }}
      >
        🕹️ Play 🕹️
      </Button>
    </>
  );
};

export default Game;

function launchGame() {}
