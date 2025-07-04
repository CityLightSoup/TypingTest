import { useEffect, useState } from "react";

export const Stopwatch = (props) => {
    const { isTyping, onTimeUpdate, reset } = props;
    const [time, setTime] = useState(0);

    // isTyping propに応じてタイマーを開始・停止する
    useEffect(() => {
        let interval = null;
        if (isTyping) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime + 10;
                    onTimeUpdate(newTime); // 親コンポーネントの時間を更新
                    return newTime;        // 自身の時間を更新
                });
            }, 10);
        }
        // コンポーネントが消えるか、isTypingがfalseになったらタイマーを停止
        return () => clearInterval(interval);
    }, [isTyping, onTimeUpdate]);

    // reset propに応じてタイマーをリセットする
    useEffect(() => {
        if (reset) {
            setTime(0);
            onTimeUpdate(0);
        }
    }, [reset, onTimeUpdate]);

    return (
        <>
            <h1>Time</h1>
            <p style={{ fontSize: "40px" }}>
                {Math.floor(time / 60000)}:
                {Math.floor((time % 60000) / 1000).toString().padStart(2, "0")}:
                {Math.floor((time % 1000) / 10).toString().padStart(2, "0")}
            </p>
        </>
    );
};