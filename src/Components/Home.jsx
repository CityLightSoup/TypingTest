import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { generatePermutations, shuffleArray } from '../utils/Helpers.js';
import { Countdown } from './Countdown.jsx';

// 2. 定数とデータをインポート
import {
  allTypingStrings,
  PERMUTATION_SET_KEY,
  CURRENT_SESSION_KEY,
  TOTAL_PERMUTATIONS
} from '../constants/TypingConstans.js'

// ------------------- Home.jsx -------------------
// ホーム画面のコンポーネント
export const Home = () => {
  const navigate = useNavigate();
  const [completedInSet, setCompletedInSet] = useState(0);

  useEffect(() => {
    const savedSet = localStorage.getItem(PERMUTATION_SET_KEY);
    const remainingCount = savedSet ? JSON.parse(savedSet).length : TOTAL_PERMUTATIONS;
    setCompletedInSet(TOTAL_PERMUTATIONS - remainingCount);
  }, []);

  const handlePractice = () => {
    navigate("/Practice");
  };

  const handleTypingStart = () => {
    let permutationSet = JSON.parse(localStorage.getItem(PERMUTATION_SET_KEY) || '[]');
    if (permutationSet.length === 0) {
      // generatePermutations と shuffleArray を使う
      const roundIndexes = Array.from(Array(allTypingStrings.length).keys());
      const newPermutations = generatePermutations(roundIndexes);
      permutationSet = shuffleArray(newPermutations);
    }
    const currentSession = permutationSet.pop();
    localStorage.setItem(PERMUTATION_SET_KEY, JSON.stringify(permutationSet));
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(currentSession));
    navigate("/Typing", { 
        state: { 
            roundIndex: currentSession[0], 
            roundInSession: 0,
            sessionResults: [] // 結果を蓄積する配列
        } 
    });
  };

  const handleReset = () => {
    // localStorageからこのアプリ用のデータを削除
    localStorage.removeItem(PERMUTATION_SET_KEY);
    localStorage.removeItem(CURRENT_SESSION_KEY);
    // ページをリロードして、変更を即座に反映
    window.location.reload();
  };
  
  // JSX内のロジックは変更なし
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Typing</h1>
      <p>現在のセット: {completedInSet} / {TOTAL_PERMUTATIONS} 回 実行済み</p>
      <Button variant="contained" onClick={handlePractice} style={{ marginRight: '1rem' }}>
        練習
      </Button>
      <Button variant="outlined" onClick={handleTypingStart}>
        本番 ({completedInSet + 1}回目)
      </Button>
      <Button variant="text" color="error" onClick={handleReset} size="small">
          進捗をリセット
        </Button>
    </div>
  );
};