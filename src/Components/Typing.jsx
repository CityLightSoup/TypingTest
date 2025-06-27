import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Countdown } from './Countdown';
import { Sound } from './Sound';
import { Stopwatch } from './Stopwatch';
import { allTypingStrings } from '../constants/TypingConstans';

// --- Mock Dependencies for Canvas Environment ---
// プレビュー環境では外部ファイルを解決できないため、
// 必要な関数、データ、コンポーネントをここで直接定義します。
// ご自身のプロジェクトでは、このセクションを削除し、正しいimport文を使用してください。

// from ../utils/helpers.js
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const Typing = () => {
  // --- Reactフックは必ずトップレベルで呼び出します ---
  const navigate = useNavigate();
  const location = useLocation();

  // stateの初期化
  const [phase, setPhase] = useState("loading"); // 初期状態は'loading'
  const [shuffledStrings, setShuffledStrings] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [countTyping, setCountTyping] = useState(0);
  const [countCorrectTyping, setCountCorrectTyping] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const [time, setTime] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // refの初期化
  const divRef = useRef(null);
  const soundRef = useRef(null);
  
  // location.stateから値を取り出す（存在しない可能性も考慮）
  const roundIndex = location.state?.roundIndex;
  const roundInSession = location.state?.roundInSession;

  // --- useEffectで副作用（ロジック）を処理します ---

  // location.stateのチェックと、タイピングデータの初期設定
  useEffect(() => {
    // location.stateや必須の値がなければホームに戻す
    if (roundIndex === undefined || roundInSession === undefined) {
      setPhase("redirecting");
      navigate('/');
      return; // このeffectの処理を中断
    }
    
    // 正常な場合は、英文をシャッフルしてstateを更新し、ゲーム開始準備
    const selectedTypingStrings = allTypingStrings[roundIndex];
    setShuffledStrings(shuffleArray(selectedTypingStrings));
    setPhase("countdown"); // 準備完了、カウントダウンへ

  }, [roundIndex, roundInSession, navigate]); // 依存配列

  // デバッグ機能 (Shift + Enter)
  useEffect(() => {
    const handleDebugCommand = (event) => {
      // roundInSessionが未定義の場合は実行しない
      if (event.shiftKey && event.key === 'Enter' && roundInSession !== undefined) {
        event.preventDefault();
        console.log("デバッグコマンド実行: 結果画面へ遷移します。");
        navigate("/results", {
          state: {
            totalInputs: countTyping,
            correctInputs: countCorrectTyping,
            elapsedTime: time,
            isPractice: false,
            roundInSession: roundInSession, // セッションのラウンド番号を渡す
          },
        });
      }
    };
    document.addEventListener('keydown', handleDebugCommand);
    return () => {
      document.removeEventListener('keydown', handleDebugCommand);
    };
  }, [navigate, countTyping, countCorrectTyping, time, roundInSession]);

  
  // タイピングエリアにフォーカスを当てる
  useEffect(() => {
    if (phase === "typing" && divRef.current) {
      const timer = setTimeout(() => divRef.current.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // ミスタイプ時の赤枠表示
  useEffect(() => {
    if (showBorder) {
      const timer = setTimeout(() => setShowBorder(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showBorder]);


  // --- 関数定義 ---
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
    const currentTarget = shuffledStrings[targetIndex] || "";
    const correctChar = currentTarget[correctIndex]?.toLowerCase();
    
    setCountTyping((prev) => prev + 1);

    if (input === correctChar) {
      setCountCorrectTyping((prev) => prev + 1);
      // 正解した文字が最後の文字か判定
      if (correctIndex + 1 === currentTarget.length) {
        // 現在のお題が最後のお題か判定
        if (targetIndex + 1 === shuffledStrings.length) {
          // すべて終了、結果画面へ
          navigate("/results", {
            state: {
              totalInputs: countTyping + 1,
              correctInputs: countCorrectTyping + 1,
              elapsedTime: time,
              isPractice: false,
              roundInSession: roundInSession, // セッションのラウンド番号を渡す
            },
          });
        } else {
          // 次のお題へ
          setTargetIndex((prev) => prev + 1);
          setCorrectIndex(0);
        }
      } else {
        // 次の文字へ
        setCorrectIndex((prev) => prev + 1);
      }
    } else {
      // ミスタイプ
      setShowBorder(true);
      if (soundRef.current) soundRef.current.playBeep();
    }
  };

  // --- レンダリング ---
  
  // データの読み込み中やリダイレクト中は何も表示しない
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
              outline: "none",
              borderWidth: "5px",
              borderStyle: "solid",
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