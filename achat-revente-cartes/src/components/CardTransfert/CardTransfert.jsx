import NavBar from "../NavBar/NavBar";
import CardList from "../CardList/CardList";
import Card from "../Card/Card";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCards } from "../../core/actions";
import { selectCards } from "../../core/selectors";
import { selectCard } from "../../core/selectors";
import "./CardTransfert.css";

const CardTransfert = ({ user, transac }) => {
  const dispatch = useDispatch();
  const cardList = useSelector(selectCards);
  const card = useSelector(selectCard);

  let title = "BUY";
  let txtbtn = "Buy";
  let userId = null;

  function doTransaction() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, card_id: card.id }),
    };
    fetch(
      "https://asi2-backend-market.herokuapp.com/" + transac,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://asi2-backend-market.herokuapp.com/cards"
      );
      const cardList = await resp.json();
      dispatch(setCards(cardList));
    };
    fetchData();
  }, [dispatch]);

  if (transac == "sell") {
    title = "SELL";
    txtbtn = "Sell";
    userId = user.id;
  }

  return (
    <>
      <NavBar user={user} title={title} />
      <span>Titre</span>
      <div id="cardTransfert">
        <div id="cardlist" class="carddisplay">
          <CardList cardList={cardList} user={userId} />
        </div>
        <div id="cardshort" class="carddisplay">
          <Card />
          <Button class="button" variant="outlined" onClick={doTransaction}>
            {txtbtn}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardTransfert;
