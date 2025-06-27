import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

// --- Mock Dependencies for Canvas Environment ---
// プレビュー環境で動作させるためのダミーデータです。
// ご自身のプロジェクトでは、このセクションを削除し、
// 正しいimport文を使用してください。
const allTypingStrings = [
    [ "he drinks tea" ],
    [ "she folded laundry" ],
    [ "the sun rose slowly" ]
];
const CURRENT_SESSION_KEY = 'typingCurrentSession';

// --- ここまで Mock Dependencies ---

/*
// 本来のプロジェクトでのインポート文の例
import {
  allTypingStrings,
  CURRENT_SESSION_KEY
} from '../constants/typingConstants.js';
*/

export const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // stateがない場合はホームに戻る
  // このロジックはフックのルールに従うためuseEffect内で処理
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  // stateがない場合は、ここでレンダリングを中断
  if (!state) {
    return null; 
  }

  const { totalInputs, correctInputs, elapsedTime, isPractice, roundInSession } = state;
  const accuracy = totalInputs ? ((correctInputs / totalInputs) * 100).toFixed(2) : 0;
  const timeSeconds = (elapsedTime / 1000).toFixed(2);
  
  // インポートしたallTypingStringsを使って最後のラウンドか判定
  const isLastInSession = roundInSession >= allTypingStrings.length - 1;

  const handleNextRound = () => {
    // インポートしたCURRENT_SESSION_KEYを使ってlocalStorageから読み込む
    const currentSession = JSON.parse(localStorage.getItem(CURRENT_SESSION_KEY) || '[]');
    if (currentSession.length === 0) {
        navigate('/');
        return;
    }

    const nextRoundInSession = roundInSession + 1;
    const nextRoundIndex = currentSession[nextRoundInSession];

    navigate("/Typing", {
      state: {
        roundIndex: nextRoundIndex,
        roundInSession: nextRoundInSession,
      },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>{isPractice ? "Practice Results" : `Typing Test Results (Session Round ${roundInSession + 1})`}</h1>
      <p>Total Inputs: {totalInputs}</p>
      <p>Correct Inputs: {correctInputs}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Elapsed Time: {timeSeconds} seconds</p>
      
      {!isPractice && (
        <>
          {isLastInSession ? (
            <Button variant="contained" onClick={() => navigate("/")} style={{ marginTop: 20 }}>
              セッション完了！ホームに戻る
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNextRound} style={{ marginTop: 20 }}>
              次のラウンドへ (Round {roundInSession + 2})
            </Button>
          )}
        </>
      )}
    </div>
  );
};