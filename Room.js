import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/Room.module.css';

const Room = ({ roomData, onMoveDirection, onCollectObject }) => {
  const [availableExits, setAvailableExits] = useState([]);
  const [roomObjects, setRoomObjects] = useState([]);

  useEffect(() => {
    if (roomData) {
      // Set available exits
      setAvailableExits(Object.keys(roomData.exits || {}));
      
      // Set room objects
      setRoomObjects(roomData.objects || []);
    }
  }, [roomData]);

  const handleMove = (direction) => {
    if (availableExits.includes(direction)) {
      onMoveDirection(direction);
    } else {
      // Display notification that this exit isn't available
      alert(`There's no exit to the ${direction}`);
    }
  };

  const handleCollectObject = (objectId) => {
    onCollectObject(objectId);
  };

  if (!roomData) {
    return <div className={styles.loading}>Loading room...</div>;
  }

  return (
    <div className={styles.roomContainer}>
      <h2 className={styles.roomName}>{roomData.name}</h2>
      
      <div className={styles.roomImage}>
        {roomData.image && (
          <Image 
            src={roomData.image} 
            alt={roomData.name}
            width={800}
            height={600}
            priority
          />
        )}
        
        {/* Object overlays that can be clicked */}
        {roomObjects.map((objectId) => (
          <div 
            key={objectId}
            className={`${styles.object} ${styles[`object-${objectId}`]}`}
            onClick={() => handleCollectObject(objectId)}
          >
            {/* Object representation - could be an image or icon */}
            <div className={styles.objectHint}>Click to collect</div>
          </div>
        ))}
      </div>
      
      <div className={styles.navigationControls}>
        <button 
          className={`${styles.navButton} ${styles.navNorth}`}
          onClick={() => handleMove('north')}
          disabled={!availableExits.includes('north')}
        >
          North
        </button>
        
        <div className={styles.eastWestContainer}>
          <button 
            className={`${styles.navButton} ${styles.navWest}`}
            onClick={() => handleMove('west')}
            disabled={!availableExits.includes('west')}
          >
            West
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.navEast}`}
            onClick={() => handleMove('east')}
            disabled={!availableExits.includes('east')}
          >
            East
          </button>
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.navSouth}`}
          onClick={() => handleMove('south')}
          disabled={!availableExits.includes('south')}
        >
          South
        </button>
        
        <div className={styles.upDownContainer}>
          <button 
            className={`${styles.navButton} ${styles.navUp}`}
            onClick={() => handleMove('up')}
            disabled={!availableExits.includes('up')}
          >
            Up
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.navDown}`}
            onClick={() => handleMove('down')}
            disabled={!availableExits.includes('down')}
          >
            Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
