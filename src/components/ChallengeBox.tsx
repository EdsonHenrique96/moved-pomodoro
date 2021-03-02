import styles from '../styles/components/ChallengeBox.module.css';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengeContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleSucceededChallenge() {
    completedChallenge();
    resetChallenge();
    resetCountdown();
  }

  function handleFailedChallenge() {
    resetCountdown();
    resetChallenge();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="body svg"/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleFailedChallenge}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleSucceededChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>Finalize um ciclo para receber um desafio.</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios.
          </p>
        </div>
      ) }
    </div>
  );
}