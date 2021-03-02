import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCoundown: () => void;
  resetCountdown: () => void;
}

let timeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownContextProps) {
  const [ time, setTime ] = useState(0.05 * 60);
  const [ isActive, setIsActive ] = useState(false);
  const [ hasFinished, setHasFinished ] =useState(false);

  const minutes =  Math.floor(time / 60);
  const seconds = time % 60;

  const { startNewChallenge } = useContext(ChallengeContext);

  function clearCountdown() {
    setTime(0.05 * 60);
  }

  function startCoundown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(timeout);
    setIsActive(false);
    setHasFinished(false);
    clearCountdown();
  }

  useEffect(() => {
    if(isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return(
    <CountdownContext.Provider value={{
      isActive,
      hasFinished,
      minutes,
      seconds,
      startCoundown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}