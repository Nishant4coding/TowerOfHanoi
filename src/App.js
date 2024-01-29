import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([]);
  const [numberOfTiles, setNumberOfTiles] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e) => {
    setNumberOfTiles(e.target.value);
  };

  const handleStartGame = () => {
    const numTiles = parseInt(numberOfTiles, 10);
    if (isNaN(numTiles) || numTiles <= 0) {
      setInputError("Please enter a valid number of tiles.");
      return;
    }

    // Initialize tiles based on the number provided by the user
    const initialTiles = Array.from({ length: numTiles }, (_, index) => ({
      id: `Tile-${index + 1}`,
      column: 1,
      row: index + 1,
      width: 2 * (index + 1),
    }));

    setTiles(initialTiles);
    setMoveCount(0);
    setInputError("");
  };

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
          
        }

        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);

  const solveTowerOfHanoi = () => {


    // Call the Tower of Hanoi algorithm with the number of tiles
    towerOfHanoi(tiles.length, 1, 3, 2);
  };

  const towerOfHanoi = (n, sourceRod, targetRod, auxiliaryRod) => {
    if (n === 1) {
      // Move the disk from sourceRod to targetRod
      moveDisk(sourceRod, targetRod);
      return;
    }

    // Move (n-1) disks from sourceRod to auxiliaryRod using targetRod
    towerOfHanoi(n - 1, sourceRod, auxiliaryRod, targetRod);

    // Move the nth disk from sourceRod to targetRod
    moveDisk(sourceRod, targetRod);

    // Move (n-1) disks from auxiliaryRod to targetRod using sourceRod
    towerOfHanoi(n - 1, auxiliaryRod, targetRod, sourceRod);
  };

  const moveDisk = (fromRod, toRod) => {
    
    const dragTile = tiles.find((tile) => tile.column === fromRod);
  



    if (!dragTile) {
      console.error("Error: Drag tile not found.");
      return;
    }
  
    const newTiles = tiles.map((tile) =>
      tile.id === dragTile.id ? { ...tile, column: toRod } : tile
    );
    setTiles(newTiles);
    setMoveCount(moveCount + 1);
  };
  
  return (
    <>
      <div className="App">
        <div className="input-container">
          <label htmlFor="numberOfTiles">Enter the number of tiles:</label>
          <input
            type="number"
            id="numberOfTiles"
            value={numberOfTiles}
            onChange={handleInputChange}
          />
          <button onClick={handleStartGame}>Start Game</button>
          {inputError && <p className="error-message">{inputError}</p>}
        </div>
        <div className="instructions">
          <div className="text-title">
            <span className="text-title">Objective:</span> Rebuild the tower in
            the third column in as little moves as possible
          </div>
          <div className="text-title">
            <span className="text-title">Instructions:</span> Move one tile at a
            time; bigger tiles cannot go on top of smaller tiles
          </div>
        </div>
        <div className="content">
          <div
            className="column-container"
            id={1}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column1Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column1Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-1-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={2}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column2Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column2Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-2-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="column-container"
            id={3}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="center-bar" />
            {column3Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column3Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(80vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="tile"
                    draggable
                    key={`column-3-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
        </div>
        {winCondition && (
          <div className="win-message">
            You Win!
            <div className="win-subtitle">
              You did it in <span className="win-number">{moveCount}</span>{" "}
              moves
            </div>
          </div>
        )}
        <div>
          Move count: {moveCount}
          <button onClick={solveTowerOfHanoi} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
            Solve
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
