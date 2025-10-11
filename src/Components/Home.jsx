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
  PERMUTATION_SET_KEY2,
  CURRENT_SESSION_KEY2,
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
    //サウンド用
    let permutationSet = JSON.parse(localStorage.getItem(PERMUTATION_SET_KEY) || '[]');
    if (permutationSet.length === 0) {
      // generatePermutations と shuffleArray を使う。サウンド用
      const roundIndexes = Array.from(Array(allTypingStrings.length).keys());
      const newPermutations = generatePermutations(roundIndexes);
      permutationSet = shuffleArray(newPermutations);
    }

    const currentSession = permutationSet.pop();
    localStorage.setItem(PERMUTATION_SET_KEY, JSON.stringify(permutationSet));
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(currentSession));
    
    //文章用
    let permutationSet2 = JSON.parse(localStorage.getItem(PERMUTATION_SET_KEY2) || '[]');
    if( permutationSet2.length === 0) {
      const roundIndexes2 = Array.from(Array(allTypingStrings.length).keys());
      const newPermutations2 = generatePermutations(roundIndexes2);
      permutationSet2 = shuffleArray(newPermutations2);
    }

    const currentSession2 = permutationSet2.pop();
    localStorage.setItem(PERMUTATION_SET_KEY2, JSON.stringify(permutationSet2));
    localStorage.setItem(CURRENT_SESSION_KEY2, JSON.stringify(currentSession2));
    currentSession.forEach(num => {
      console.log(num);
    });

    navigate("/Typing", { 
        state: { 
            roundIndex: currentSession[0], 
            roundIndex2: currentSession2[0],
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