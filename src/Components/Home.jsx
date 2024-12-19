import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"


export const Home = () => {
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
        if (event.key === " ") {
            navigate('/Typing', { state: { isTyping: true } }); //値をTyping.jsxに渡す
        }
    };

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
                style={{ outline: "none" }} //ォーカス時の枠線を非表示
            >
                <h1>HOME</h1>
                <p>スペースキーを押したらスタート</p>
                {/* <button onClick={handleTyping}>to Typing</button>
                <button onClick={handleStopwatch}>to Stopwatch</button> */}
            </div>

        </>
    )
}