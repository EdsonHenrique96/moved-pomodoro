import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/EdsonHenrique96.png" alt="Imagem de perfil"/>
      <div>
        <strong>Edson Henrique</strong>
        <p>
          <img src="icons/level.svg" alt="level up"/>
          Level 1
        </p>
      </div>
    </div>
  )
}