import { useEffect } from "react";
import { useRef } from "react";
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
                <h1 css={[Font, Title]}>HOME</h1>
                <p css={Body}>スペースキーを押したらスタート</p>
                {/* <button onClick={handleTyping}>to Typing</button>
                <button onClick={handleStopwatch}>to Stopwatch</button> */}
            </div>

        </>
    )
}