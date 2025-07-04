/*
  Typing.jsx (修正版)
  - キー入力時にタイプ音を再生する処理を`handleKeyDown`関数に追加しました。
*/
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Countdown } from './Countdown';
import { Sound } from './Sound';
import { Stopwatch } from './Stopwatch';
import { allTypingStrings, CURRENT_SESSION_KEY } from '../constants/TypingConstans';

// --- Mock Dependencies for Canvas Environment ---
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export const Typing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [phase, setPhase] = useState("loading");
  const [shuffledStrings, setShuffledStrings] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [countTyping, setCountTyping] = useState(0);
  const [countCorrectTyping, setCountCorrectTyping] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const divRef = useRef(null);
  const soundRef = useRef(null);
  
  const roundIndex = location.state?.roundIndex;
  const roundInSession = location.state?.roundInSession;
  const sessionResults = location.state?.sessionResults || [];

  useEffect(() => {
    if (roundIndex === undefined || roundInSession === undefined) {
      setPhase("redirecting");
      navigate('/');
      return;
    }
    
    const selectedTypingStrings = allTypingStrings[roundIndex];
    setShuffledStrings(shuffleArray(selectedTypingStrings));
    setTargetIndex(0);
    setCorrectIndex(0);
    setCountTyping(0);
    setCountCorrectTyping(0);
    setTime(0);
    setIsTyping(false);
    setPhase("countdown");
  }, [roundIndex, roundInSession, navigate]);

  const handleRoundComplete = useCallback(() => {
    const currentRoundResult = {
      totalInputs: countTyping + 1,
      correctInputs: countCorrectTyping + 1,
      elapsedTime: time,
      roundNumber: roundInSession + 1
    };
    const newSessionResults = [...sessionResults, currentRoundResult];
    const isLastInSession = roundInSession >= allTypingStrings.length - 1;

    if (isLastInSession) {
      navigate("/results", {
        state: { finalResults: newSessionResults },
      });
    } else {
      const currentSession = JSON.parse(localStorage.getItem(CURRENT_SESSION_KEY) || '[]');
      const nextRoundInSession = roundInSession + 1;
      const nextRoundIndex = currentSession[nextRoundInSession];

      navigate("/Wating", { // NOTE: Waiting画面のパスはご自身のルーティングに合わせてください
        state: {
          nextRoundIndex: nextRoundIndex,
          nextRoundInSession: nextRoundInSession,
          sessionResults: newSessionResults,
        },
      });
    }
  }, [countTyping, countCorrectTyping, time, roundInSession, sessionResults, navigate]);

  useEffect(() => {
    const handleDebugCommand = (event) => {
      if (event.shiftKey && event.key === 'Enter' && roundInSession !== undefined) {
        event.preventDefault();
        handleRoundComplete();
      }
    };
    document.addEventListener('keydown', handleDebugCommand);
    return () => {
      document.removeEventListener('keydown', handleDebugCommand);
    };
  }, [roundInSession, handleRoundComplete]);
  
  useEffect(() => {
    if (phase === "typing" && divRef.current) {
      const timer = setTimeout(() => divRef.current.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (showBorder) {
      const timer = setTimeout(() => setShowBorder(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showBorder]);

  const processTyping = (key) => {
    const input = key.toLowerCase();
    const currentTarget = shuffledStrings[targetIndex] || "";
    const correctChar = currentTarget[correctIndex]?.toLowerCase();
    setCountTyping((prev) => prev + 1);
    if (input === correctChar) {
      setCountCorrectTyping((prev) => prev + 1);
      if (correctIndex + 1 === currentTarget.length) {
        if (targetIndex + 1 === shuffledStrings.length) {
          handleRoundComplete();
        } else {
          setTargetIndex((prev) => prev + 1);
          setCorrectIndex(0);
        }
      } else {
        setCorrectIndex((prev) => prev + 1);
      }
    } else {
      setShowBorder(true);
      if (soundRef.current) soundRef.current.playBeep();
    }
  };

  // ★★★★★ 修正点 ★★★★★
  // キー入力時にタイプ音を再生する処理をここに追加しました。
  const handleKeyDown = (event) => {
    if (phase !== 'typing') return;
    if (soundRef.current) {
        soundRef.current.playSound();
    }
    processTyping(event.key);
  };
  
  if (phase === "loading" || phase === "redirecting" || shuffledStrings.length === 0) {
    return null; 
  }
  const currentTargetText = shuffledStrings[targetIndex] || "";

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Sound ref={soundRef} round={roundIndex} />
      {phase === "countdown" && (
        <Countdown
          startCount={3}
          onComplete={() => {
            setPhase('typing');
            setIsTyping(true);
          }}
        />
      )}
      {phase === 'typing' && (
        <>
          <h1>Typing Test - Session Round {roundInSession + 1} / {allTypingStrings.length}</h1>
          <p style={{ fontSize: 20, marginBottom: 10 }}>
            {targetIndex + 1} / {shuffledStrings.length}問目
          </p>
          <div
            ref={divRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
              outline: "none", borderWidth: "5px", borderStyle: "solid",
              borderColor: showBorder ? "red" : "white",
              padding: 10, userSelect: "none", margin: "0 auto", maxWidth: "80vw",
            }}
          >
            {currentTargetText.split("").map((char, index) => {
              const style = {
                fontSize: 40, whiteSpace: "pre-wrap",
                color: correctIndex > index ? "blue" : "black",
              };
              if (index === correctIndex) {
                style.borderBottom = "3px solid #2196f3";
              }
              return <span key={index} style={style}>{char}</span>;
            })}
          </div>
          <Stopwatch isTyping={isTyping} onTimeUpdate={setTime} />
        </>
      )}
      <Button variant="outlined" style={{ marginTop: 20 }} onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
};