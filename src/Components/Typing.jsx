import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stopwatch } from "./Stopwatch";
import { Sound } from "./Sound";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from '@mui/material/Button';

const Font = css({
    fontFamily: "Arial"
})

const General = css({
    textAlign: "center",
    margin: "24px"
})

export const Typing = () => {
    // const targetStrings = ["apple", "banana", "orange"]; //入力させる文字列
    const originalStrings = [
        "The sky is blue",
        "I love coffee",
        "She walks fast",
        "Time flies quickly",
        "Life is a journey",
        "Open the window",
        "I lost my keys",
        "He reads every day",
        "Trust your heart",
        "This is my home",
        "Music makes me happy",
        "I will try again",
        "The world is changing",
        "Dreams can come true",
        "Just keep going",
        "Smile and move on",
        "Peace begins with you",
        "She sings so well",
        "The cat is sleeping",
        "I miss the summer",
        "Be kind to yourself",
        "Never stop learning",
        "Believe in magic",
        "Find your purpose",
        "Rainy days are calm",
        "You are not alone",
        "Enjoy the little things",
        "Challenge leads to growth",
        "Kindness changes everything",
        "Patience is powerful"
    ];

    const [targetStrings] = useState(() => [...originalStrings].sort(() => Math.random() - 0.5));
    const [target, setTarget] = useState(targetStrings[0]); //今入力する文字列
    const [targetIndex, setTargetIndex] = useState(0); //今入力する文字列をtargetStringsから指定するための数値
    
    const [correctWordsIndex, setCorrectWordsIndex] = useState(0); //入力があっていた文字数
    const [countTyping, setCountTyping] = useState(0); //入力回数
    const [countCorectTyping, setCountCorrectTyping] = useState(0); //正しく入力した回数
    const [correct, setCorrect] = useState(true); //入力した文字が合っているかどうか
    const divRef = useRef(null); //タイピングのdivタグにフォーカスするやつ
    const [time, setTime] = useState(0); //計測時間
    const [showBorder, setShowBorder] = useState(false); //タイプミス時のボーダー表示
    const soundRef = useRef(); //音を鳴らす

    //react-router-dom
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
    const { state } = useLocation(); //Homeから値を受け取る
    const [isTyping, setIsTyping] = useState(state?.isTyping || false); //初期値をstateに設定 Homeから受け継ぐのでtrueになる。なければfalse

    //targetStringsに格納した文字列をすべて入力し終えたらResultsに遷移。それまではtargetに次の文字列をセットする
    useEffect(() => {
        if (targetStrings.length > targetIndex) {
            setTarget(targetStrings[targetIndex]);
        } else { //総タイプ数と正しいタイプ数をリザルト画面に送る（あとは時間）
            navigate('/Results', {
                state: {
                    totalInputs: countTyping,
                    correctInputs: countCorectTyping,
                    elapsedTime: time
                }
            });
        }
    }, [targetIndex, targetStrings, navigate, time]);

    //タイピングされるdivタグに着目するためのもの
    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus();
        }
    }, []);

    //ミスタイプ時のアラート表示
    useEffect(() => {
        if (showBorder) {
            const timer = setTimeout(() => setShowBorder(false), 100);
            return () => clearTimeout(timer);
        }
    }, [showBorder]);

    const handleKeyDown = (event) => {
        const key = event.key;
        if (soundRef.current) {
            soundRef.current.playSound();
        }
        if (!isTyping && key === ' ') {
            setIsTyping(true);
            event.preventDefault();
        } else {
            Typing(event);
        }
    }

    const Typing = (event) => {
        const key = event.key.toLowerCase(); //入力された文字を小文字に
        const currentChar = target[correctWordsIndex]?.toLowerCase(); //正解の文字も小文字に

        // console.log("----------\n if the input is correct? : " + correct);
        // console.log("a current correct word is : " + target[correctWordsIndex]);
        // console.log("the index of correct words : " + correctWordsIndex + "\n----------");

        //タイプ数のカウント
        setCountTyping((prev) => prev + 1);

        //押されたキーが正しかったらindexを1増やす
        if (key === currentChar) {
            if (correctWordsIndex + 1 === target.length) {
                // 最後の文字を正しくタイプした場合
                setCorrect(true);
                setTargetIndex((prev) => prev + 1);
                setCorrectWordsIndex(0);
            } else {
                setCorrectWordsIndex((prev) => prev + 1);
                setCorrect(true);
            }
        } else {
            setCorrect(false);
            setShowBorder(true); // 🔥 ミスしたら赤枠表示 → useEffect で消す
        }
    };

    return (
        <>
            <Sound ref={soundRef} />
            <div css={General}>
                <div ref={divRef} tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: "none" }}>
                    <h1>Typing</h1>
                    <div style={{ borderWidth: "5px", borderStyle: "solid", borderColor: showBorder ? "red" : "white", transition: "border-color 0.1s" }}>
                        {target && target.split("").map((char, index) => (//targetがundefineでないことを確認
                            <span
                                key={index}
                                style={{ color: correctWordsIndex > index ? "gray" : "blue", fontSize: "50px", textAlign: "center" }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                    <Stopwatch isTyping={isTyping} onTimeUpdate={setTime} />
                </div>
                <Button variant="outlined" onClick={handleHome}>to Home</Button>
            </div>
        </>
    );
};
