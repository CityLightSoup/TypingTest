import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Wating = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 前の画面から渡されたstateがない場合はホームに戻る
    useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!location.state) return null;

    const { nextRoundIndex, nextRoundIndex2, nextRoundInSession, sessionResults } = location.state;
    const prevRoundNumber = nextRoundInSession; // 次が2なら前は1

    const handleStartNextRound = () => {
        navigate("/Typing", {
            state: {
                roundIndex: nextRoundIndex,
                roundIndex2: nextRoundIndex2,
                roundInSession: nextRoundInSession,
                sessionResults: sessionResults,
            },
            replace: true // ブラウザ履歴にこの中間ページを残さない
        });
    };
    
    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1>Round {prevRoundNumber} Complete!</h1>
            <p>お疲れ様でした。準備ができたら次のラウンドに進んでください。</p>
            <Button variant="contained" size="large" onClick={handleStartNextRound} style={{ marginTop: '2rem' }}>
                Start Round {prevRoundNumber + 1}
            </Button>
        </div>
    );
};