import styles from '../styles/Card.module.css';

const Card = ({
    card,
    cardClickHandler
}) => {
    return (
        <button 
            className={styles["button"]}
            onClick={() => cardClickHandler(card)}>
            <img className={styles["image"]} src={card.src} alt={card.title} />
            <p>{card.title}</p>
        </button>
    )
};

export default Card;