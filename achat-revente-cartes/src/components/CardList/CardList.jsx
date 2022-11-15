import "./CardList.css";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  { field: "family", headerName: "Family", width: 150 },
  {
    field: "hp",
    headerName: "HP",
    type: "number",
    width: 75,
  },
  {
    field: "energy",
    headerName: "Energy",
    type: "number",
    width: 75,
  },
  {
    field: "defence",
    headerName: "Defence",
    type: "number",
    width: 75,
  },
  {
    field: "attack",
    headerName: "Attack",
    type: "number",
    width: 75,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 75,
    valueGetter: (params) => `${params.row.price || ""} $`,
  },
];

const rows = [
  {
    id: 1,
    name: "Superman",
    description:
      "The origin story of Superman relates that he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction. Discovered and adopted by a farm couple from Kansas, the child is raised as Clark Kent and imbued with a strong moral compass. Early in his childhood, he displays various superhuman abilities, which, upon reaching maturity, he resolves to use for the benefit of humanity through a 'Superman' identity.",
    family: "DC Comic",
    hp: 50,
    energy: 100,
    defence: 80,
    attack: 100,
    price: 100,
  },
];

const CardList = () => {
  return (
    <div id="table" style={{ height: 400, width: "70%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default CardList;
