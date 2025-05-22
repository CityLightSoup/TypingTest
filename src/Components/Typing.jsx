import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Countdown } from "../Components/Countdown";
import { Stopwatch } from "../Components/Stopwatch";
import { Sound } from "../Components/Sound";
import Button from "@mui/material/Button";

const typingStrings = [
  "he drinks tea before starting the day",
  "they walked to school in the light rain",
  "she forgot her keys on the kitchen table",
  "typing helps improve focus and accuracy",
  "we ate breakfast near the open window",
  "he checks emails before the meeting starts",
  "the train arrived six minutes late today",
  "i wrote a short note to my friend abroad",
  "she wore a red coat on a cold morning",
  "he smiled while reading an old message",
  "they studied together in the library",
  "my dog waited at the door patiently",
  "we watched a movie after dinner time",
  "the sun rose slowly behind the hill",
  "she likes writing with fountain pens",
  "he washed the dishes without being asked",
  "i brought an umbrella just in case",
  "we met again at the same small cafe",
  "she listened closely to the instructions",
  "he walks his dog every evening at six",
  "i took a photo of the quiet street",
  "they played cards on the rainy afternoon",
  "she enjoys listening to old jazz music",
  "the lights dimmed before the show began",
  "he packed a sandwich for the short trip",
  "she looked outside and saw fresh snow",
  "i read that book during summer break",
  "we ran to catch the last city bus",
  "he opened the window to let air in",
  "she laughed at the silly cartoon show"
];


const typingStrings2 = [
  "she folded laundry while watching tv",
  "he boiled water to make some tea",
  "they played chess in the quiet room",
  "i cleaned the windows this morning",
  "he trimmed the plants on the balcony",
  "she took notes during the lecture",
  "we walked to the store before lunch",
  "he wrote his name on the notebook",
  "they waited outside the theater door",
  "i organized the books by color",
  "she turned on the lights before bed",
  "he brushed the dog in the backyard",
  "they shared snacks on the school trip",
  "he checked the time before leaving",
  "she answered every question politely",
  "i watered the plants in the kitchen",
  "he read the manual before installing",
  "they played music on the old radio",
  "she bought groceries after work",
  "i stretched before going for a run",
  "we took turns stirring the soup",
  "he opened the box with a small knife",
  "she found her scarf under the table",
  "they cleaned the garage last weekend",
  "i placed the bowl on the top shelf",
  "he charged his phone overnight",
  "we planned the trip over breakfast",
  "she ironed the shirt for tomorrow",
  "they set the alarm for seven",
  "i made a sandwich with ham and cheese"
];


const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
}

export const Typing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 何回目なのかをカウントする
  const round = location.state?.round || 1;
  const rawStrings = round === 1 ? typingStrings : typingStrings2;
  const [shuffledStrings] = useState(() => shuffleArray(rawStrings));

  const [phase, setPhase] = useState("countdown"); // 初期値は countdown
  const [targetIndex, setTargetIndex] = useState(0);
  const [target, setTarget] = useState(shuffledStrings[0]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [countTyping, setCountTyping] = useState(0);
  const [countCorrectTyping, setCountCorrectTyping] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const divRef = useRef(null);
  const soundRef = useRef();

  useEffect(() => {
    if (targetIndex < shuffledStrings.length) {
      setTarget(shuffledStrings[targetIndex]);
      setCorrectIndex(0);
    }
  }, [targetIndex, shuffledStrings]);

  useEffect(() => {
    if (phase === "typing" && divRef.current) {
      const timer = setTimeout(() => {
        divRef.current.focus();
      }, 100);
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
    if (soundRef.current) soundRef.current.playSound();
    processTyping(event.key);
  };

  const processTyping = (key) => {
    const input = key.toLowerCase();
    const correctChar = target[correctIndex]?.toLowerCase();
    setCountTyping((prev) => prev + 1);

    if (input === correctChar) {
      setCountCorrectTyping((prev) => prev + 1);
      if (correctIndex + 1 === target.length) {
        if (targetIndex + 1 === shuffledStrings.length) {
          navigate("/results", {
            state: {
              totalInputs: countTyping + 1,
              correctInputs: countCorrectTyping + 1,
              elapsedTime: time,
              isPractice: false,
              round: round,
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
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Sound ref={soundRef} />
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
          <h1>Typing Test</h1>
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
