import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { setTileStatus } from "../../utils/setTileStatus";
import { GET_DAILY_BOARD } from "../../utils/queries";
export default function NewGameBoard() {
  const { loading, error, data } = useQuery(GET_DAILY_BOARD);
  const [allTiles, setAllTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const testingTiles = [
    { id: 0, row: 0, col: 0, letter: "A", status: "available" },
    { id: 1, row: 0, col: 1, letter: "C", status: "available" },
    { id: 2, row: 0, col: 2, letter: "E", status: "available" },
    { id: 3, row: 0, col: 3, letter: "G", status: "available" },
    { id: 4, row: 0, col: 4, letter: "I", status: "available" },
    { id: 5, row: 1, col: 0, letter: "K", status: "available" },
    { id: 6, row: 1, col: 1, letter: "M", status: "available" },
    { id: 7, row: 1, col: 2, letter: "O", status: "available" },
    { id: 8, row: 1, col: 3, letter: "Q", status: "available" },
    { id: 9, row: 1, col: 4, letter: "S", status: "available" },
    { id: 10, row: 2, col: 0, letter: "U", status: "available" },
    { id: 11, row: 2, col: 1, letter: "W", status: "available" },
    { id: 12, row: 2, col: 2, letter: "Y", status: "available" },
    { id: 13, row: 2, col: 3, letter: "Z", status: "available" },
    { id: 14, row: 2, col: 4, letter: "A", status: "available" },
    { id: 15, row: 3, col: 0, letter: "W", status: "available" },
    { id: 16, row: 3, col: 1, letter: "Y", status: "available" },
    { id: 17, row: 3, col: 2, letter: "Z", status: "available" },
    { id: 18, row: 3, col: 3, letter: "A", status: "available" },
    { id: 19, row: 3, col: 4, letter: "B", status: "available" },
    { id: 20, row: 4, col: 0, letter: "W", status: "available" },
    { id: 21, row: 4, col: 1, letter: "Y", status: "available" },
    { id: 22, row: 4, col: 2, letter: "Z", status: "available" },
    { id: 23, row: 4, col: 3, letter: "A", status: "available" },
    { id: 24, row: 4, col: 4, letter: "B", status: "available" },
  ];
  useEffect(() => {
    if (data && data.dailyRandomization) {
      let rows = 5;
      let cols = 5;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const id = i * cols + j;
          const letter = data.dailyRandomization.dailyBoard[id];
          const tile = {
            id: id,
            letter: letter,
            row: i,
            col: j,
            status: "available",
          };
          setSelectedTiles((prevTiles) => [...prevTiles, tile]);
        }
      }
    }
  }, [data]);

  return (
    <section className="relative m-2 flex flex-col border-black dark:border-white border-2 min-h-20">
      <div>New Game Board</div>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-5 gap-2">
          {selectedTiles.map((tile) => (
            <div
              key={tile.id}
              className={`tile m-5 ${tile.status}`}
              onClick={() => {
                const updatedTiles = setTileStatus({
                  tile,
                  cols: 5,
                  rows: 5,
                  selectedTiles,
                });
                setSelectedTiles(updatedTiles);
              }}
            >
              <div className="text-xs">{tile.status}</div>
              {tile.letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
