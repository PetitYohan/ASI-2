import NavBar from "../NavBar/NavBar";
import Chat from "../Chat/Chat";
import "./Game.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState, useContext } from "react";
import SocketContext from "../../core/service/socket/socket-context";

const title = "Game";

const Game = () => {
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("co", () => {
      console.log("co");
      setIsConnected(true);
    });

    socket.on("deco", () => {
      setIsConnected(false);
    });

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
    const userCards = [{ cardId: 12 }];
    socket.emit("joinRoom", userCards);
  };

  const sendDisconnectRoom = () => {
    socket.emit("disconnect");
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
