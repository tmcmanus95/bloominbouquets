import { setTileStatus } from "./setTileStatus.js";

export function addLetter({ tile, selectedTiles, setSelectedTiles }) {
  console.log("tile, ", tile);

  // Update tile statuses (5x5 grid = 5 cols, 5 rows)
  const updatedTiles = setTileStatus({
    tile,
    cols: 5,
    rows: 5,
    selectedTiles,
  });

  // Update the state in the parent component
  setSelectedTiles(updatedTiles);
}
