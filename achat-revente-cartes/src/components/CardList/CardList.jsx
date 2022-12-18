import "./CardList.css"
import { DataGrid } from "@mui/x-data-grid"
import { useDispatch } from "react-redux"
import { setSelectedCard } from "../../core/actions"

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
]

let rows = []

const CardList = ({ cardList, user, transac }) => {
	const dispatch = useDispatch()

	const onCardSelected = (card) => {
		dispatch(setSelectedCard(card))
	}

	const handleRowClick = (params) => {
		onCardSelected(params.row)
	}

	if (cardList.length != 0) {
		rows = []
		cardList.forEach((card) => {
			if (transac === "sell") {
				if (card.userId === user) {
					rows.push({
						id: card.id,
						name: card.name,
						description: card.description,
						family: card.family,
						hp: card.hp,
						energy: card.energy,
						defence: card.defence,
						attack: card.attack,
						price: card.price,
					})
				}
			} else {
				if (!card.userId) {
					rows.push({
						id: card.id,
						name: card.name,
						description: card.description,
						family: card.family,
						hp: card.hp,
						energy: card.energy,
						defence: card.defence,
						attack: card.attack,
						price: card.price,
					})
				}
			}
		})
	}

	return (
		<div id="table" style={{ height: 400, width: "70%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				onRowClick={handleRowClick}
			/>
		</div>
	)
}

export default CardList
