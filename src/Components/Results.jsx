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

  useEffect(() => {
    if (!state?.finalResults) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.finalResults) return null; 

  const { finalResults } = state;

  // 全ラウンドの合計値を計算
  const totalStats = finalResults.reduce(
    (acc, result) => {
      acc.totalInputs += result.totalInputs;
      acc.correctInputs += result.correctInputs;
      acc.elapsedTime += result.elapsedTime;
      return acc;
    },
    { totalInputs: 0, correctInputs: 0, elapsedTime: 0 }
  );
  
  const totalAccuracy = totalStats.totalInputs ? ((totalStats.correctInputs / totalStats.totalInputs) * 100).toFixed(2) : 0;
  const totalTimeSeconds = (totalStats.elapsedTime / 1000).toFixed(2);


  return (
    <div style={{ textAlign: "center", marginTop: 40, padding: '0 1rem' }}>
      <h1>Final Results</h1>
      
      {/* 全ラウンドの合計結果 */}
      <div style={{ border: '2px solid #2196f3', borderRadius: '8px', padding: '1rem', margin: '2rem auto', maxWidth: '500px' }}>
        <h2>総合結果</h2>
        <p>合計タイプ数: {totalStats.totalInputs}</p>
        <p>合計正解タイプ数: {totalStats.correctInputs}</p>
        <p>総合正解率: {totalAccuracy}%</p>
        <p>合計時間: {totalTimeSeconds} 秒</p>
      </div>

      {/* 各ラウンドの結果 */}
      <h2>各ラウンドの結果</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {finalResults.map((result, index) => {
          const accuracy = result.totalInputs ? ((result.correctInputs / result.totalInputs) * 100).toFixed(2) : 0;
          const timeSeconds = (result.elapsedTime / 1000).toFixed(2);
          return (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', minWidth: '200px' }}>
              <h3>Round {result.roundNumber}</h3>
              <p>タイプ数: {result.totalInputs}</p>
              <p>正解率: {accuracy}%</p>
              <p>時間: {timeSeconds} 秒</p>
              <p style={{ color: '#555', fontSize: '0.9em' }}>サウンドタイプ: {result.soundType}</p>
              <p style={{ color: '#555', fontSize: '0.9em' }}>文章タイプ: {result.stringsType}</p>
            </div>
          );
        })}
      </div>

      <Button variant="contained" onClick={() => navigate("/")} style={{ marginTop: '2rem' }}>
        ホームに戻る
      </Button>
    </div>
  );
};