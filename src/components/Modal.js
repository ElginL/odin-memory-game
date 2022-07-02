import styles from '../styles/Modal.module.css';

const Modal = ({ message, onClose }) => {
    return (
        <div className={styles["modal"]}>
            <div className={styles["textbox"]}>
                <p className={styles["message"]}>{message}</p>
                <button 
                    className={styles["btn-container"]}
                    onClick={onClose}>
                    Play Again
                </button>
            </div>
        </div>
    )
};

export default Modal;