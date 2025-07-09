export function setTileStatus({ tile, cols, rows, selectedTiles: tiles }) {
  // Create a copy of the tiles array to avoid mutating the original
  const updatedTiles = [...tiles];

  // update active tile
  tile.status = "active";

  function cS(tileToUpdate) {
    if (
      tileToUpdate.status != "adjacent" &&
      tileToUpdate.status != "selected"
    ) {
      console.log("Changing status of tile:", tileToUpdate.letter);
      tileToUpdate.status = "adjacent";
    }
  }

  // Mark the clicked tile as selected
  //   if (tile.status != "unavailable" && tiles.length > 0) {
  //     updatedTiles[tile.id].status = "selected";
  //   }

  console.log("Finding grid for tile:", tile.id);

  if (tile.row == 0) {
    if (tile.col == 0) {
      cS(updatedTiles[tile.id + 1]);

      cS(updatedTiles[tile.id + cols]);
      cS(updatedTiles[tile.id + cols + 1]);
    }
    if (tile.col > 0 && tile.col < cols - 1) {
      cS(updatedTiles[tile.id - 1]);
      cS(updatedTiles[tile.id + 1]);

      cS(updatedTiles[tile.id + cols - 1]);
      cS(updatedTiles[tile.id + cols]);
      cS(updatedTiles[tile.id + cols + 1]);
    }
    if (tile.col == cols - 1) {
      cS(updatedTiles[tile.id - 1]);

      cS(updatedTiles[tile.id + cols - 1]);
      cS(updatedTiles[tile.id + cols]);
    }
  }
  if (tile.row > 0 && tile.row < rows - 1) {
    if (tile.col == 0) {
      cS(updatedTiles[tile.id - cols]);
      cS(updatedTiles[tile.id - cols + 1]);

      cS(updatedTiles[tile.id + 1]);

      cS(updatedTiles[tile.id + cols]);
      cS(updatedTiles[tile.id + cols + 1]);
    }
    if (tile.col > 0 && tile.col < cols - 1) {
      cS(updatedTiles[tile.id - cols - 1]);
      cS(updatedTiles[tile.id - cols]);
      cS(updatedTiles[tile.id - cols + 1]);

      cS(updatedTiles[tile.id - 1]);
      cS(updatedTiles[tile.id + 1]);

      cS(updatedTiles[tile.id + cols - 1]);
      cS(updatedTiles[tile.id + cols]);
      cS(updatedTiles[tile.id + cols + 1]);
    }
    if (tile.col == cols - 1) {
      cS(updatedTiles[tile.id - cols - 1]);
      cS(updatedTiles[tile.id - cols]);

      cS(updatedTiles[tile.id - 1]);

      cS(updatedTiles[tile.id + cols - 1]);
      cS(updatedTiles[tile.id + cols]);
    }
  }
  if (tile.row == rows - 1) {
    if (tile.col == 0) {
      cS(updatedTiles[tile.id - cols]);
      cS(updatedTiles[tile.id - cols + 1]);

      cS(updatedTiles[tile.id + 1]);
    }
    if (tile.col > 0 && tile.col < cols - 1) {
      cS(updatedTiles[tile.id - cols - 1]);
      cS(updatedTiles[tile.id - cols]);
      cS(updatedTiles[tile.id - cols + 1]);

      cS(updatedTiles[tile.id - 1]);
      cS(updatedTiles[tile.id + 1]);
    }
    if (tile.col == cols - 1) {
      // Yellow
      cS(updatedTiles[tile.id - cols - 1]);
      cS(updatedTiles[tile.id - cols]);

      cS(updatedTiles[tile.id - 1]);
    }
  }

  // Set all remaining tiles (that aren't selected or adjacent) to unavailable
  updatedTiles.forEach((tileItem) => {
    if (tileItem.status === "available") {
      tileItem.status = "unavailable";
    }
  });

  // Return the updated tiles array
  return updatedTiles;
}
