import styles from '../styles/components/Countdown.module.css';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCoundown,
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secoundLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secoundLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
            disabled
            type="button"
            className={styles.startCountdownButton}
          >
            Ciclo encerrado
            <img src="icons/check-circle.svg" alt="check icon"/>
          </button>
        ) : (
          <>
            {
              isActive ? (
                <button 
                  type="button"
                  className={`${styles.startCountdownButton} ${styles.stopCountdownButton}`}
                  onClick={resetCountdown}  
                >
                  Encerrar o ciclo
                  <img src="icons/close.svg" alt="check icon"/>
                </button>
              ) : (
                  <button 
                    type="button"
                    className={styles.startCountdownButton}
                    onClick={startCoundown}  
                  >
                    Iniciar um ciclo
                    <img src="icons/play-arrow.svg" alt="check icon"/>
                </button>
              )
            }
          </>
        )
      }



      
    </div>
  )
}