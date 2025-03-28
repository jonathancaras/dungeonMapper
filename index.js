import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [hasSavedGame, setHasSavedGame] = useState(false);
  
  useEffect(() => {
    // Check if there's a saved game
    const savedGame = localStorage.getItem('dungeon_mapper_web_state');
    setHasSavedGame(!!savedGame);
  }, []);
  
  const handleStartNewGame = () => {
    // Clear any existing game state
    localStorage.removeItem('dungeon_mapper_web_state');
    router.push('/game');
  };
  
  const handleContinueGame = () => {
    router.push('/game');
  };
  
  return (
    <>
      <Head>
        <title>Dungeon Mapper Web</title>
        <meta name="description" content="A web-based dungeon exploration game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Dungeon Mapper Web</h1>
          <p className={styles.subtitle}>Explore the depths of the dungeon!</p>
        </div>
        
        <div className={styles.menuContainer}>
          <button 
            className={styles.menuButton} 
            onClick={handleStartNewGame}
          >
            New Game
          </button>
          
          {hasSavedGame && (
            <button 
              className={styles.menuButton} 
              onClick={handleContinueGame}
            >
              Continue Game
            </button>
          )}
          
          <Link href="/instructions" className={styles.menuLink}>
            How to Play
          </Link>
        </div>
        
        <footer className={styles.footer}>
          <p>Dungeon Mapper Web &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}
