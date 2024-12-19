import { useEffect, useState } from "react";

export const Stopwatch = (props) => {
    const { isTyping, onTimeUpdate } = props;
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(isTyping);

    useEffect(() => {
        let interval;
        if(isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 10;
                    onTimeUpdate(newTime); //Typing.jsxのTimeを更新
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // const handleStart = () => setIsRunning(true);
    // const handleStop = () => setIsRunning(false);
    // const handleReset = () => {
    //     setIsRunning(false);
    //     setTime(0);
    // }

    return (
        <>
            <h1>Time</h1>
            <p style={{ fontSize: "40px" }}>
                {Math.floor(time / 60000)}:
                {Math.floor((time % 60000) / 1000).toString().padStart(2, "0")}:
                {Math.floor((time % 1000) / 10).toString().padStart(2, "0")}
            </p>
            {/* <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button> */}
        </>
        
    )

}