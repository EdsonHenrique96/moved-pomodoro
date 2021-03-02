import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface  ChallengesProviderProps {
  children: ReactNode;
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

export function ChallengesPovider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randonChallengeBoxIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeBoxIndex];

    setActiveChallenge(challenge);
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