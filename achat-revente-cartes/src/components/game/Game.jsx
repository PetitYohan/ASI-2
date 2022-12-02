import NavBar from "../NavBar/NavBar";
import "./Game.css";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";

const title = "Game";
const socket = io();

const Game = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("co", () => {
      console.log("co");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("co");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("co");
  };

  return (
    <>
      <NavBar title={title} />
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
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
