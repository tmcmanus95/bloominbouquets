export function createTileInteractions(gameBoard, alerts) {
  const addLetter = (tile) => {
    const { id } = tile;

    if (gameBoard.selectedIds.includes(id)) {
      const lastSelectedId =
        gameBoard.selectedIds[gameBoard.selectedIds.length - 1];
      if (id === lastSelectedId) {
        const remainingIds = gameBoard.selectedIds.slice(0, -1);
        gameBoard.setSelectedIds(remainingIds);
      }
    } else {
      if (
        gameBoard.selectedIds.length === 0 ||
        gameBoard.hasAdjacentSelected(tile)
      ) {
        gameBoard.setSelectedIds([...gameBoard.selectedIds, id]);
      } else {
        gameBoard.setTooFarIds([...gameBoard.tooFarIds, id]);
        alerts.showAlert(
          "You must select a tile adjacent to a tile you have already selected."
        );
        setTimeout(() => gameBoard.setTooFarIds([]), 500);
      }
    }
  };

  const handleTouchStart = (event, tile) => {
    addLetter(tile);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains("grid-item")) {
      const tileId = parseInt(element.getAttribute("data-id"), 10);
      const tile = gameBoard.getTileById(tileId);
      if (tile && !gameBoard.selectedIds.includes(tile.id)) {
        addLetter(tile);
      }
    }
  };

  return {
    addLetter,
    handleTouchStart,
    handleTouchMove,
  };
}
