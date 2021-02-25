import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect } from 'react';

let timeout: NodeJS.Timeout;

export function Countdown() {
  const [ time, setTime ] = useState(25 * 60);
  const [ isActive, setIsActive ] = useState(false);
  const [ hasFinished, setHasFinished ] =useState(false);

  const minutes =  Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secoundLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function clearCountdown() {
    setTime(25 * 60);
  }

  function setCoundown() {
    setIsActive(true);
  }

  function stopCountDown() {
    clearTimeout(timeout);
    setIsActive(false);

    clearCountdown();
  }

  useEffect(() => {
    if(isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setHasFinished(true);
    }
  }, [isActive, time]);

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
            onClick={stopCountDown}  
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
                  onClick={stopCountDown}  
                >
                  Encerrar o ciclo
                  <img src="icons/close.svg" alt="check icon"/>
                </button>
              ) : (
                  <button 
                    type="button"
                    className={styles.startCountdownButton}
                    onClick={setCoundown}  
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