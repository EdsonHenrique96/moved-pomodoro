import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface  ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface ChallengesContextData {
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  level: number;
  activeChallenge: Challenge;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesPovider({
  children,
  ...props
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(props.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randonChallengeBoxIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeBoxIndex];

    setActiveChallenge(challenge);

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🙅', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }

    new Audio('/notification.mp3').play();
  }

  function resetChallenge() {
    setActiveChallenge(false);
  }

  function completedChallenge() {
    if(!activeChallenge){
      return;
    }

    let finalExperience = currentExperience + activeChallenge.amount;

    if(finalExperience >= experienceToNextLevel) {
      levelUp();

      finalExperience = finalExperience - experienceToNextLevel;
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(false);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return(
    <ChallengeContext.Provider
      value={{
        levelUp,
        startNewChallenge,
        resetChallenge,
        completedChallenge,
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}