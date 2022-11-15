import { selectCard } from "../../core/selectors";
import { useSelector } from "react-redux";
import "./Card.css";

const Card = () => {
  const card = useSelector(selectCard);
  if (card.id !== undefined) {
    return (
      <>
        <div id="card">
          <div id="first">
            {card.energy}⚡ {card.name} {card.hp}❤️
          </div>
          <img
            id="img_card"
            src={card.smallImgUrl}
            alt="Image de la carte"
          ></img>
          <div id="desc">{card.description}</div>
        </div>
      </>
    );
  }
};

export default Card;
