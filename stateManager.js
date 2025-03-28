// Game state management utility
const gameStateKey = 'dungeon_mapper_web_state';

// Initialize a new game state
export const initializeGameState = (mapData) => {
  const initialState = {
    currentRoom: mapData.starting_room,
    inventory: [],
    collectedObjects: {}, // Map of roomId -> [objectIds] that have been collected
    visitedRooms: [mapData.starting_room],
    gameStartTime: new Date().toISOString(),
    lastSaved: new Date().toISOString()
  };
  
  return initialState;
};

// Save game state to localStorage
export const saveGameState = (state) => {
  const stateToSave = {
    ...state,
    lastSaved: new Date().toISOString()
  };
  
  try {
    localStorage.setItem(gameStateKey, JSON.stringify(stateToSave));
    return true;
  } catch (error) {
    console.error('Failed to save game state:', error);
    return false;
  }
};

// Load game state from localStorage
export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem(gameStateKey);
    
    if (!savedState) {
      return null;
    }
    
    return JSON.parse(savedState);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

// Check if an item has been collected from a room
export const hasCollectedObject = (state, roomId, objectId) => {
  return (
    state.collectedObjects[roomId] && 
    state.collectedObjects[roomId].includes(objectId)
  );
};

// Get remaining objects in a room (filtering out collected ones)
export const getRemainingObjects = (state, roomId, allObjects) => {
  const collectedFromRoom = state.collectedObjects[roomId] || [];
  return allObjects.filter(objectId => !collectedFromRoom.includes(objectId));
};

// Add an object to inventory
export const collectObject = (state, roomId, objectId) => {
  // Add to inventory
  const updatedInventory = [...state.inventory, objectId];
  
  // Mark as collected from the room
  const collectedFromRoom = state.collectedObjects[roomId] || [];
  const updatedCollectedObjects = {
    ...state.collectedObjects,
    [roomId]: [...collectedFromRoom, objectId]
  };
  
  return {
    ...state,
    inventory: updatedInventory,
    collectedObjects: updatedCollectedObjects
  };
};

// Use an item (remove from inventory)
export const useObject = (state, objectId) => {
  const updatedInventory = state.inventory.filter(id => id !== objectId);
  
  return {
    ...state,
    inventory: updatedInventory
  };
};

// Move to a new room
export const moveToRoom = (state, roomId) => {
  // Add to visited rooms if not already visited
  const visitedRooms = state.visitedRooms.includes(roomId)
    ? state.visitedRooms
    : [...state.visitedRooms, roomId];
  
  return {
    ...state,
    currentRoom: roomId,
    visitedRooms
  };
};

// Check if player has met win condition
export const checkWinCondition = (state, mapData) => {
  if (!mapData.win_condition) {
    return false;
  }
  
  switch (mapData.win_condition.type) {
    case 'item_collection':
      // Check if all required items are in inventory
      const requiredItems = mapData.win_condition.required_items || [];
      return requiredItems.every(item => state.inventory.includes(item));
      
    case 'reach_room':
      // Check if player has reached the target room
      return state.currentRoom === mapData.win_condition.room_id;
      
    default:
      return false;
  }
};
