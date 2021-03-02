import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

export function Profile() {
  const  { level } = useContext(ChallengeContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/EdsonHenrique96.png" alt="Imagem de perfil"/>
      <div>
        <strong>Edson Henrique</strong>
        <p>
          <img src="icons/level.svg" alt="level up"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}