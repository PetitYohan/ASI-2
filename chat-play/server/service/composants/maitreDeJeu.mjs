import { rooms } from "./gestionRoom.mjs";

export function attack(socket, io, cardAlly, cardEnemy) {
  let room = rooms.findIndex(
    (room) =>
      room.players[0].id === socket.id || room.players[1].id === socket.id
  );

  if (room !== -1) {
    let players = rooms[room].players;

    if (players[0].id == socket.id) {
      const attack = doAttack(players[0], players[1], cardAlly, cardEnemy);
      players[0] = attack.myPlayer;
      players[1] = attack.enemyPlayer;
    } else if (players[1].id == socket.id) {
      const attack = doAttack(players[1], players[0], cardAlly, cardEnemy);
      players[1] = attack.myPlayer;
      players[0] = attack.enemyPlayer;
    }
  }
  console.log(rooms[room]);
  io.to(rooms[room].RoomId).emit("AttackDone", rooms[room]);
}

function doAttack(myPlayer, enemyPlayer, cardAlly, cardEnemy) {
  if (myPlayer.energy >= 1) {
    let enemyCard = enemyPlayer.cards.find((card) => card.id == cardEnemy);
    let myCard = myPlayer.cards.find((card) => card.id == cardAlly);
    enemyCard.hp = enemyCard.hp - myCard;

    myPlayer.energy = myPlayer.energy - 1;
  }
  return { myPlayer, enemyPlayer };
}
