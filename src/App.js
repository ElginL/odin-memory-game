import React, { useState } from 'react';
import PlayingBoard from "./components/PlayingBoard";
import styles from './styles/App.module.css';

function App() {
    const [score, setScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);

    if (score > highestScore) {
        setHighestScore(score);
    }

    return (
        <div>
            <nav className={styles["nav-bar"]}>
                <h2 className={styles["web-title"]}>Memory Game</h2>
                <div className={styles["scoreboard"]}>
                    <p className={styles["text"]}>
                        Current Score: {score}
                    </p>
                    <p className={styles["text"]}>
                        Highest Score: {highestScore}
                    </p>
                </div>
            </nav>
            <PlayingBoard
                setScore={setScore}
            />
        </div>
    )
}

export default App;