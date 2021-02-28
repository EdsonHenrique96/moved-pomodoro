import styles from '../styles/components/ExperienceBar.module.css';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContexts';

export function ExperienceBar() {
  const { experienceToNextLevel, currentExperience } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round(Math.floor((currentExperience * 100)) / experienceToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0</span>
        <div>
          <div style={{ width: `${percentToNextLevel}%` }} />

          <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
            {currentExperience}xp
          </span>
        </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  )
}