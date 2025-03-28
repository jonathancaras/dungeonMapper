import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Instructions.module.css';

export default function Instructions() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>How to Play - Dungeon Mapper Web</title>
        <meta name="description" content="Learn how to play Dungeon Mapper Web" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>How to Play</h1>
        
        <div className={styles.instructionsContent}>
          <section className={styles.section}>
            <h2>Game Objective</h2>
            <p>
              Explore the dungeon by navigating through interconnected rooms. Collect items
              and solve puzzles to reach your goal. The game is won when you find the hidden
              treasure!
            </p>
          </section>
          
          <section className={styles.section}>
            <h2>Controls</h2>
            <div className={styles.controlsList}>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>Arrow Keys</span>
                <span className={styles.controlDescription}>Move North, South, East, and West</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>Page Up/Down</span>
                <span className={styles.controlDescription}>Move Up and Down</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>I Key</span>
                <span className={styles.controlDescription}>Open/Close Inventory</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>Mouse Click</span>
                <span className={styles.controlDescription}>Interact with objects and UI elements</span>
              </div>
            </div>
          </section>
          
          <section className={styles.section}>
            <h2>Items and Inventory</h2>
            <p>
              Click on objects in rooms to collect them. Your collected items will appear in your
              inventory, which you can access by pressing the Inventory button. Some items may be
              required to progress through the dungeon.
            </p>
          </section>
          
          <section className={styles.section}>
            <h2>Movement</h2>
            <p>
              Each room may have up to 6 possible exits: North, South, East, West, Up, and Down.
              Use the arrow keys or on-screen buttons to navigate between rooms. Not all exits will
              be available in every room.
            </p>
          </section>
          
          <section className={styles.section}>
            <h2>Saving Progress</h2>
            <p>
              Your game progress is automatically saved as you play. You can close the game and
              continue later by selecting "Continue Game" from the main menu.
            </p>
          </section>
        </div>
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/')}
          >
            Back to Menu
          </button>
        </div>
      </main>
    </>
  );
}
