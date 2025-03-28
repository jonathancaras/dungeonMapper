import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Inventory.module.css';

const Inventory = ({ inventory, objectsData, onUseItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleInventory = () => {
    setIsOpen(!isOpen);
    setSelectedItem(null); // Close item details when closing inventory
  };

  const selectItem = (itemId) => {
    setSelectedItem(itemId);
  };

  const useItem = (itemId) => {
    onUseItem(itemId);
    setSelectedItem(null);
  };

  return (
    <>
      <button 
        className={styles.inventoryButton}
        onClick={toggleInventory}
      >
        Inventory ({inventory.length})
      </button>

      {isOpen && (
        <div className={styles.inventoryModal}>
          <div className={styles.inventoryContainer}>
            <h3 className={styles.inventoryTitle}>Inventory</h3>
            
            <div className={styles.inventoryGrid}>
              {inventory.length === 0 ? (
                <p className={styles.emptyInventory}>Your inventory is empty.</p>
              ) : (
                inventory.map((itemId) => {
                  const item = objectsData[itemId];
                  return (
                    <div 
                      key={itemId} 
                      className={`${styles.inventoryItem} ${selectedItem === itemId ? styles.selected : ''}`}
                      onClick={() => selectItem(itemId)}
                    >
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={50} 
                          height={50}
                        />
                      ) : (
                        <div className={styles.itemPlaceholder}>{item.name.charAt(0)}</div>
                      )}
                      <span className={styles.itemName}>{item.name}</span>
                    </div>
                  );
                })
              )}
            </div>
            
            {selectedItem && (
              <div className={styles.itemDetails}>
                <h4>{objectsData[selectedItem].name}</h4>
                <p>{objectsData[selectedItem].description}</p>
                <button 
                  className={styles.useItemButton}
                  onClick={() => useItem(selectedItem)}
                >
                  Use Item
                </button>
              </div>
            )}
            
            <button 
              className={styles.closeButton} 
              onClick={toggleInventory}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
