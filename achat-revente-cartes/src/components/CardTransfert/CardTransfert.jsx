import NavBar from "../NavBar/NavBar";
import CardList from "../CardList/CardList";
import Card from "../Card/Card";
import Button from "@material-ui/core/Button";

import "./CardTransfert.css";

const CardTransfert = () => {
  return (
    <>
      <NavBar />
      <span>Titre</span>
      <CardList />
      <Card />
      <Button class="button" variant="outlined">
        Sell
      </Button>
    </>
  );
};

export default CardTransfert;
