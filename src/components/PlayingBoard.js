import React, { useState, useEffect, useMemo } from 'react';
import garyImg from '../assets/gary.png';
import jellyImg from '../assets/jellyfish.png';
import krabsImg from '../assets/krabs.png';
import patrickImg from '../assets/patrick.png';
import patrickSpongeImg from '../assets/patrickSponge.png';
import pearlImg from '../assets/pearl.png';
import planktonImg from '../assets/plankton.png';
import mrsPuffImg from '../assets/puff.png';
import sandyImg from '../assets/sandy.png';
import squidwardImg from '../assets/squidward.png';
import styles from '../styles/PlayingBoard.module.css';
import Card from './Card';
import Modal from './Modal';

const PlayingBoard = ({ 
    setScore,
}) => {
    const [level, setLevel] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const allCards = useMemo(() => [
        { title: "Gary", src: garyImg, pressed: false },
        { title: "Spongebob Catch Jellyfish", src: jellyImg, pressed: false },
        { title: "Mr Krabs", src: krabsImg, pressed: false },
        { title: "Patrick", src: patrickImg, pressed: false },
        { title: "Spongebob And Patrick", src: patrickSpongeImg, pressed: false },
        { title: "Pearl", src: pearlImg, pressed: false },
        { title: "Plankton", src: planktonImg, pressed: false },
        { title: "Mrs Puff", src: mrsPuffImg, pressed: false },
        { title: "Sandy", src: sandyImg, pressed: false },
        { title: "Squidward", src: squidwardImg, pressed: false },
    ], []);

    const [playingCards, setPlayingCards] = useState(allCards.slice(0, level + 3));

    useEffect(() => {
        setPlayingCards(allCards.slice(0, level + 3));
    }, [level, allCards]);

    const levelWon = () => {
        let correctCount = 0;
        for (let i = 0; i < playingCards.length; i++) {
            if (playingCards[i].pressed) {
                correctCount += 1;
            }
        }

        return correctCount === playingCards.length - 1;
    }

    const shufflePlayingCards = () => {
        const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

        let shuffledCards = [];
        const appearedIndexes = [];
        for (let i = 0; i < playingCards.length; i++) {
            let randomIndex = random(0, playingCards.length - 1);
            while (appearedIndexes.includes(randomIndex)) {
                randomIndex = random(0, playingCards.length - 1);
            }
            appearedIndexes.push(randomIndex);
            shuffledCards.push(playingCards[randomIndex]);
        }

        setPlayingCards(shuffledCards);
    }

    const resetPlayingCards = () => {
        setPlayingCards(playingCards.map(card => {
            return {
                ...card,
                pressed: false
            }
        }));
    };

    const cardClickHandler = card => {
        shufflePlayingCards();
        
        // User lost the game.
        if (card.pressed) {
            setModalVisible(true);

            return;
        }

        if (levelWon()) {
            setScore(score => score + 1);

            if (level === 7) {
                setModalVisible(true);
                return;
            }

            setLevel(level => level + 1);
            return;
        }
        
        setPlayingCards(cards => {
            return cards.map(item => {
                if (item.title === card.title) {
                    return {
                        ...item,
                        pressed: true
                    }
                }

                return item;
            });
        });

        setScore(score => score + 1);
    }

    return (
        <div className={styles["playing-board-container"]}>
            <p className={styles["level-text"]}>
                Level {level}
            </p>
            <p className={styles["play-instruction"]}>
                Click Images That Have Not Appeared Before!
            </p>
            <div className={styles["cards-container"]}>
                {
                    playingCards.map(card => (
                        <Card 
                            key={card.title}
                            card={card}
                            cardClickHandler={cardClickHandler}
                        />
                    ))
                }
            </div>
            {
                modalVisible && level === 7 && levelWon()
                    ? <Modal 
                        message="You Won!" 
                        onClose={() => { setModalVisible(false); setLevel(1); setScore(0); }}
                      />
                    : modalVisible
                    ? <Modal
                        message="You Failed"
                        onClose={() => { setModalVisible(false); setLevel(1); setScore(0); resetPlayingCards() }}
                      />
                    : null
            }
        </div>
    )
};

export default PlayingBoard;