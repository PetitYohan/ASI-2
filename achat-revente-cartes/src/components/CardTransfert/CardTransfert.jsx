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
      <div id="cardTransfert">
        <div id="cardlist" class="carddisplay">
          <CardList />
        </div>
        <div id="cardshort" class="carddisplay">
          <Card />
          <Button class="button" variant="outlined">
            Sell
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardTransfert;
