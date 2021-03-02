import styles from '../styles/components/CompletedChallenge.module.css';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

export function CompletedChallenge() {
  const { challengesCompleted } = useContext(ChallengeContext);

  return(
    <div className={styles.completedChallengeContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}