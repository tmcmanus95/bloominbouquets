import { useState, useEffect } from "react";
export default function NewGameBoard() {
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
    setSelectedTiles(testingTiles);
  }, []);

  return (
    <section className="relative m-2 flex flex-col border-black dark:border-white border-2 min-h-20">
      <div>Game Board</div>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-5 gap-2">
          {selectedTiles.map((tile) => (
            <div key={tile.id} className={`tile m-5 ${tile.status}`}>
              {tile.letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
