import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

//css in JS
const Font = css({
    fontFamily:"Arial"
})

const Title = css({
    textAlign:"center",
    margin:"24px"
})

const Body = css({
    textAlign:"center",
    margin: "24px"
})

export const Home = () => {
    const [countdown, setCountdown] = useState(null);
    const [isCounting, setIsCounting] = useState(false);
    const navigate = useNavigate();
    const handleTyping = () => {
        navigate('/Typing');
    }
    const handleStopwatch = () => {
        navigate('/Stopwatch')
    }
    const divRef = useRef(null);

    //スペースキーを押したらTyping.jsxに遷移
    const handleKeyDown = (event) => {
        if (event.key === " " && !isCounting) {
            setIsCounting(true);
            setCountdown(3);
        }
    };

    useEffect(() => {
        if(countdown === null || countdown === 0) return;

        const timer = setTimeout(() => {
            if (countdown > 1) {
                setCountdown(countdown - 1);
            } else {
                navigate('/Typing', { state: { isTyping: true } }); //値をTyping.jsxに渡す
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus();
        }
    }, []);

    return (
        <>
            <div
                ref={divRef}
                tabIndex={0} //キーボード操作可能にする
                onKeyDown={handleKeyDown}
                style={{ outline: "none" }} //フォーカス時の枠線を非表示
            >
                <h1 css={[Font, Title]}>HOME</h1>
                {isCounting ? (
                    <p css={Body}>{countdown}</p>
                ) : (
                    <p css={Body}>スペースキーを押したらスタート</p>
                )}
                {/* <button onClick={handleTyping}>to Typing</button>
                <button onClick={handleStopwatch}>to Stopwatch</button> */}
            </div>

        </>
    )
}