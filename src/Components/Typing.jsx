import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Countdown } from "../Components/Countdown";
import { Stopwatch } from "../Components/Stopwatch";
import { Sound } from "../Components/Sound";
import Button from "@mui/material/Button";

const typingStrings1 = [
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

const typingStrings3 = [
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

const typingStrings4 = [
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
};

export const Typing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const round = location.state?.round || 1;
  let selectedTypingStrings;
  if (round === 1) {
    selectedTypingStrings = typingStrings1;
  } else if (round === 2) {
    selectedTypingStrings = typingStrings2;
  } else if (round === 3) {
    selectedTypingStrings = typingStrings3;
  } else {
    selectedTypingStrings = typingStrings1; // Fallback to round 1 if round is invalid
  }
  const [shuffledStrings] = useState(() => shuffleArray(selectedTypingStrings));

  const [phase, setPhase] = useState('countdown'); // 初期値は countdown
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
    if (phase === 'typing' && divRef.current) {
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
    if (phase !== 'typing') return;
    if (soundRef.current) soundRef.current.playSound();
    processTyping(event.key);
  };

  const processTyping = (key) => {
    // Prevent default behavior for spacebar to avoid scrolling
    if (key === ' ') {
      // event.preventDefault(); // If event is passed, prevent default
    }

    const input = key.toLowerCase();
    const correctChar = target[correctIndex]?.toLowerCase();
    setCountTyping((prev) => prev + 1);

    if (input === correctChar) {
      setCountCorrectTyping((prev) => prev + 1);
      if (correctIndex + 1 === target.length) {
        // End of current string
        if (targetIndex + 1 === shuffledStrings.length) {
          // End of all strings for this round
          setIsTyping(false); // Stop the stopwatch
          navigate('/results', {
            state: {
              totalInputs: countTyping + 1,
              correctInputs: countCorrectTyping + 1,
              elapsedTime: time,
              isPractice: false,
              round: round, // Pass the current round number
            },
          });
        } else {
          // Next string
          setTargetIndex((prev) => prev + 1);
          setCorrectIndex(0);
        }
      } else {
        // Next character in current string
        setCorrectIndex((prev) => prev + 1);
      }
    } else {
      // Incorrect character
      setShowBorder(true);
      if (soundRef.current) {
        soundRef.current.playBeep();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-inter">
      <Sound ref={soundRef} round={round} />
      {phase === 'countdown' && (
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
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Typing Test - Round {round}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {targetIndex + 1} / {shuffledStrings.length}問目
          </p>
          <div
            ref={divRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={`
              relative w-full max-w-2xl p-6 rounded-xl shadow-lg bg-white
              border-4 transition-colors duration-100 ease-out
              ${showBorder ? 'border-red-500' : 'border-gray-200'}
              focus:outline-none focus:ring-4 focus:ring-blue-200
            `}
            style={{ userSelect: 'none' }}
          >
            <p className="text-5xl font-mono leading-relaxed break-words">
              {target.split('').map((char, index) => {
                let colorClass = 'text-gray-800';
                let underlineClass = '';

                if (index < correctIndex) {
                  colorClass = 'text-blue-600'; // Correctly typed characters
                } else if (index === correctIndex) {
                  underlineClass = 'border-b-4 border-blue-500'; // Current character
                }

                return (
                  <span key={index} className={`${colorClass} ${underlineClass}`}>
                    {char}
                  </span>
                );
              })}
            </p>
          </div>
          <Stopwatch isTyping={isTyping} onTimeUpdate={setTime} />
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              borderRadius: '1rem',
              borderColor: '#607D8B', // Grey
              color: '#607D8B',
              '&:hover': {
                backgroundColor: '#ECEFF1', // Light grey hover
                borderColor: '#455A64',
              },
            }}
          >
            Back to Home
          </Button>
        </>
      )}
    </div>
  );
};