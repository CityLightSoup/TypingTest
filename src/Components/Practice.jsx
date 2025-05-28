import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Countdown } from "../Components/Countdown";
import { Stopwatch } from "../Components/Stopwatch";
import { Sound } from "../Components/Sound";
import Button from "@mui/material/Button";

const practiceStrings = [
  "never stop trying your best",
  "keep pushing forward every day",
  "believe in yourself always",
  "practice leads to great results",
  "stay focused and work hard"
];

export const Practice = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("countdown"); // countdown, typing
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(practiceStrings[0]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [countTyping, setCountTyping] = useState(0);
  const [countCorrectTyping, setCountCorrectTyping] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const divRef = useRef(null);
  const soundRef = useRef();

  useEffect(() => {
    if (targetIndex < practiceStrings.length) {
      setTarget(practiceStrings[targetIndex]);
      setCorrectIndex(0);
    }
  }, [targetIndex]);

  useEffect(() => {
    if (phase === "typing" && divRef.current) {
      const timer = setTimeout(() => {
        divRef.current.focus();
      }, 100); // 少し遅延させてフォーカス
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (showBorder) {
      const timer = setTimeout(() => setShowBorder(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showBorder]);

  const handleKeyDown = (event) => {
    if (phase !== "typing") return;

    if (soundRef.current) soundRef.current.playPractice();
    processTyping(event.key);
  };

  const processTyping = (key) => {
    const input = key.toLowerCase();
    const correctChar = target[correctIndex]?.toLowerCase();
    setCountTyping((prev) => prev + 1);

    if (input === correctChar) {
      setCountCorrectTyping((prev) => prev + 1);
      if (correctIndex + 1 === target.length) {
        if (targetIndex + 1 === practiceStrings.length) {
          // 練習終了 → 結果画面へ
          navigate("/results", {
            state: {
              totalInputs: countTyping + 1, // 最後の入力も含める
              correctInputs: countCorrectTyping + 1,
              elapsedTime: time,
              isPractice: true,
            },
          });
        } else {
          setTargetIndex((prev) => prev + 1);
          setCorrectIndex(0);
        }
      } else {
        setCorrectIndex((prev) => prev + 1);
      }
    } else {
      setShowBorder(true);
      if (soundRef.current) {
        soundRef.current.playBeep();
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Sound ref={soundRef} round={0}/>
      {phase === "countdown" && (
        <Countdown
          startCount={3}
          onComplete={() => {
            setPhase("typing");
            setIsTyping(true);
          }}
        />
      )}
      {phase === "typing" && (
        <>
          <h1>Practice</h1>
          <p style={{ fontSize: 20, marginBottom: 10 }}>
            {targetIndex + 1} / {practiceStrings.length}問目
          </p>
          <div
            ref={divRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
              outline: "none",
              borderWidth: "5px",
              borderStyle: "solid",
              borderColor: showBorder ? "red" : "white",
              transition: "border-color 0.1s",
              padding: 10,
              userSelect: "none",
              margin: "0 auto",
              maxWidth: "80vw",
            }}
          >
            {target.split("").map((char, index) => {
              let style = {
                fontSize: 40,
                whiteSpace: "pre-wrap",
                color: correctIndex > index ? "blue" : "black",
              };

              // 入力している文字にアンダーラインを付ける
              if (index === correctIndex) {
                style.borderBottom = "3px solid #2196f3";
              }

              return (
                <span key={index} style={style}>
                  {char}
                </span>
              );
            })}
          </div>
          <Stopwatch isTyping={isTyping} onTimeUpdate={setTime} />
        </>
      )}
      <Button
        variant="outlined"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};
