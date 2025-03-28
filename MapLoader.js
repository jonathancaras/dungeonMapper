import { useState, useEffect } from 'react';

const MapLoader = ({ onMapLoaded, onError }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMap = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the map data from the JSON file
        const response = await fetch('/data/map.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status} ${response.statusText}`);
        }
        
        const mapData = await response.json();
        
        // Validate the map data
        if (!mapData.rooms || !mapData.starting_room) {
          throw new Error('Invalid map data: missing rooms or starting_room');
        }
        
        // Check if starting room exists
        if (!mapData.rooms[mapData.starting_room]) {
          throw new Error(`Starting room "${mapData.starting_room}" does not exist in the map`);
        }
        
        // Success - call the callback with the loaded map
        onMapLoaded(mapData);
      } catch (error) {
        console.error('Error loading map:', error);
        onError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMap();
  }, [onMapLoaded, onError]);

  return isLoading ? <div>Loading map data...</div> : null;
};

export default MapLoader;
