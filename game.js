import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import Room from '@/components/Room';
import Inventory from '@/components/Inventory';
import MapLoader from '@/components/MapLoader';

// Utils
import {
  initializeGameState,
  loadGameState,
  saveGameState,
  collectObject,
  useObject,
  moveToRoom,
  getRemainingObjects,
  checkWinCondition
} from '@/utils/stateManager';

// Styles
import styles from '@/styles/Game.module.css';

export default function Game() {
  const router = useRouter();
  
  // Game state
  const [mapData, setMapData] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [gameWon, setGameWon] = useState(false);
  
  // Handle map loading
  const handleMapLoaded = useCallback((loadedMapData) => {
    setMapData(loadedMapData);
    
    // Try to load saved game state or initialize new game
    const savedState = loadGameState();
    
    if (savedState) {
      setGameState(savedState);
    } else {
      const newState = initializeGameState(loadedMapData);
      setGameState(newState);
      saveGameState(newState);
    }
  }, []);
  
  // Handle map loading error
  const handleMapError = useCallback((error) => {
    setErrorMessage(`Failed to load game map: ${error}`);
  }, []);
  
  // Update current room when game state changes
  useEffect(() => {
    if (gameState && mapData) {
      const roomId = gameState.currentRoom;
      const roomData = mapData.rooms[roomId];
      
      if (roomData) {
        // Filter objects in room to only show those not collected
        const remainingObjects = getRemainingObjects(
          gameState,
          roomId,
          roomData.objects || []
        );
        
        setCurrentRoom({
          ...roomData,
          objects: remainingObjects
        });
        
        // Check win condition
        const hasWon = checkWinCondition(gameState, mapData);
        setGameWon(hasWon);
      } else {
        setErrorMessage(`Room "${roomId}" not found in map data`);
      }
    }
  }, [gameState, mapData]);
  
  // Save game state when it changes
  useEffect(() => {
    if (gameState) {
      saveGameState(gameState);
    }
  }, [gameState]);
  
  // Handle movement to a new room
  const handleMove = (direction) => {
    if (!currentRoom || !currentRoom.exits || !currentRoom.exits[direction]) {
      return;
    }
    
    const targetRoomId = currentRoom.exits[direction];
    const updatedState = moveToRoom(gameState, targetRoomId);
    setGameState(updatedState);
  };
  
  // Handle object collection
  const handleCollectObject = (objectId) => {
    if (!gameState || !currentRoom) {
      return;
    }
    
    const updatedState = collectObject(gameState, gameState.currentRoom, objectId);
    setGameState(updatedState);
  };
  
  // Handle using an item from inventory
  const handleUseItem = (itemId) => {
    // In a real game, you'd have logic for using specific items
    // For now, we'll just remove it from inventory
    const updatedState = useObject(gameState, itemId);
    setGameState(updatedState);
    
    alert(`You used the ${mapData.objects[itemId].name}`);
  };
  
  // Start a new game
  const handleNewGame = () => {
    if (mapData) {
      const newState = initializeGameState(mapData);
      setGameState(newState);
      saveGameState(newState);
      setGameWon(false);
    }
  };
  
  // Get object details for inventory
  const getObjectsData = () => {
    return mapData?.objects || {};
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentRoom) return;
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          handleMove('north');
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleMove('south');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handleMove('west');
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleMove('east');
          break;
        case 'PageUp':
          event.preventDefault();
          handleMove('up');
          break;
        case 'PageDown':
          event.preventDefault();
          handleMove('down');
          break;
        case 'i':
          event.preventDefault();
          // Toggle inventory (this would be handled by Inventory component)
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRoom]);
  
  return (
    <>
      <Head>
        <title>Dungeon Mapper Web</title>
        <meta name="description" content="A web-based dungeon exploration game" />
      </Head>
      
      <main className={styles.gameContainer}>
        {errorMessage ? (
          <div className={styles.error}>
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={() => router.push('/')}>Back to Home</button>
          </div>
        ) : !mapData ? (
          <MapLoader
            onMapLoaded={handleMapLoaded}
            onError={handleMapError}
          />
        ) : gameWon ? (
          <div className={styles.winScreen}>
            <h2>Congratulations!</h2>
            <p>You have successfully completed the dungeon!</p>
            <button onClick={handleNewGame}>Play Again</button>
            <button onClick={() => router.push('/')}>Back to Home</button>
          </div>
        ) : (
          <>
            <div className={styles.gameHeader}>
              <h1>Dungeon Mapper Web</h1>
              <div className={styles.gameControls}>
                <button onClick={handleNewGame} className={styles.newGameButton}>
                  New Game
                </button>
                <Inventory
                  inventory={gameState?.inventory || []}
                  objectsData={getObjectsData()}
                  onUseItem={handleUseItem}
                />
              </div>
            </div>
            
            {currentRoom && (
              <Room
                roomData={currentRoom}
                onMoveDirection={handleMove}
                onCollectObject={handleCollectObject}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}
