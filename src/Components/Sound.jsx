import React, { forwardRef, useImperativeHandle } from "react";
import useSound from 'use-sound'

//サウンドのインポート
import r1s0 from '../Sounds/keySound0.wav'
import r1s1 from '../Sounds/keySound1.wav'
import r1s2 from '../Sounds/keySound2.wav'
import r1s3 from '../Sounds/keySound3.wav'
import r1s4 from '../Sounds/keySound4.wav'
import r1s5 from '../Sounds/keySound5.wav'
import r1s6 from '../Sounds/keySound6.wav'
import r1s7 from '../Sounds/keySound7.wav'
import r1s8 from '../Sounds/keySound8.wav'
import r1s9 from '../Sounds/keySound9.wav'
import r2s0 from '../Sounds/keyS20.wav'
import r2s1 from '../Sounds/keyS21.wav'
import r2s2 from '../Sounds/keyS22.wav'
import r2s3 from '../Sounds/keyS23.wav'
import r2s4 from '../Sounds/keyS24.wav'
import r2s5 from '../Sounds/keyS25.wav'
import r2s6 from '../Sounds/keyS26.wav'
import r2s7 from '../Sounds/keyS27.wav'
import r2s8 from '../Sounds/keyS28.wav'
import r2s9 from '../Sounds/keyS29.wav'
import r3s0 from '../Sounds/keyR3.mp3' //効果音ラボ　カーソル移動12
import r3s1 from '../Sounds/keyR3.mp3'
import r3s2 from '../Sounds/keyR3.mp3'
import r3s3 from '../Sounds/keyR3.mp3'
import r3s4 from '../Sounds/keyR3.mp3'
import r3s5 from '../Sounds/keyR3.mp3'
import r3s6 from '../Sounds/keyR3.mp3'
import r3s7 from '../Sounds/keyR3.mp3'
import r3s8 from '../Sounds/keyR3.mp3'
import r3s9 from '../Sounds/keyR3.mp3'
import r4s0 from '../Sounds/keyR4.mp3' //効果音ラボ　カーソル移動9
import r4s1 from '../Sounds/keyR4.mp3'
import r4s2 from '../Sounds/keyR4.mp3'
import r4s3 from '../Sounds/keyR4.mp3'
import r4s4 from '../Sounds/keyR4.mp3'
import r4s5 from '../Sounds/keyR4.mp3'
import r4s6 from '../Sounds/keyR4.mp3'
import r4s7 from '../Sounds/keyR4.mp3'
import r4s8 from '../Sounds/keyR4.mp3'
import r4s9 from '../Sounds/keyR4.mp3'
import pras0 from '../Sounds/keyPractice.mp3' //効果音ラボ　カーソル移動1
import beepSound from '../Sounds/beep.mp3'


export const Sound = forwardRef(({ round } , ref) => {
    const [play_r1s0] = useSound(r1s0);
    const [play_r1s1] = useSound(r1s1);
    const [play_r1s2] = useSound(r1s2);
    const [play_r1s3] = useSound(r1s3);
    const [play_r1s4] = useSound(r1s4);
    const [play_r1s5] = useSound(r1s5);
    const [play_r1s6] = useSound(r1s6);
    const [play_r1s7] = useSound(r1s7);
    const [play_r1s8] = useSound(r1s8);
    const [play_r1s9] = useSound(r1s9);
    const [play_r2s0] = useSound(r2s0, { volume: 0.2 });
    const [play_r2s1] = useSound(r2s1, { volume: 0.2 });
    const [play_r2s2] = useSound(r2s2, { volume: 0.2 });
    const [play_r2s3] = useSound(r2s3, { volume: 0.2 });
    const [play_r2s4] = useSound(r2s4, { volume: 0.2 });
    const [play_r2s5] = useSound(r2s5, { volume: 0.2 });
    const [play_r2s6] = useSound(r2s6, { volume: 0.2 });
    const [play_r2s7] = useSound(r2s7, { volume: 0.2 });
    const [play_r2s8] = useSound(r2s8, { volume: 0.2 });
    const [play_r2s9] = useSound(r2s9, { volume: 0.2 });
    const [play_r3s0] = useSound(r3s0, { volume: 0.2 });
    const [play_r3s1] = useSound(r3s1, { volume: 0.2 });
    const [play_r3s2] = useSound(r3s2, { volume: 0.2 });
    const [play_r3s3] = useSound(r3s3, { volume: 0.2 });
    const [play_r3s4] = useSound(r3s4, { volume: 0.2 });
    const [play_r3s5] = useSound(r3s5, { volume: 0.2 });
    const [play_r3s6] = useSound(r3s6, { volume: 0.2 });
    const [play_r3s7] = useSound(r3s7, { volume: 0.2 });
    const [play_r3s8] = useSound(r3s8, { volume: 0.2 });
    const [play_r3s9] = useSound(r3s9, { volume: 0.2 });
    const [play_r4s0] = useSound(r4s0, { volume: 0.2 });
    const [play_r4s1] = useSound(r4s1, { volume: 0.2 });
    const [play_r4s2] = useSound(r4s2, { volume: 0.2 });
    const [play_r4s3] = useSound(r4s3, { volume: 0.2 });
    const [play_r4s4] = useSound(r4s4, { volume: 0.2 });
    const [play_r4s5] = useSound(r4s5, { volume: 0.2 });
    const [play_r4s6] = useSound(r4s6, { volume: 0.2 });
    const [play_r4s7] = useSound(r4s7, { volume: 0.2 });
    const [play_r4s8] = useSound(r4s8, { volume: 0.2 });
    const [play_r4s9] = useSound(r4s9, { volume: 0.2 });
    const [playPractice] = useSound(pras0, { volume: 0.2 });
    const [playBeep] = useSound(beepSound, { volume: 0.2 });

    const soundPlayersPerRound = {
        1: [play_r1s0, play_r1s1, play_r1s2, play_r1s3, play_r1s4, play_r1s5, play_r1s6, play_r1s7, play_r1s8, play_r1s9],
        2: [play_r2s0, play_r2s1, play_r2s2, play_r2s3, play_r2s4, play_r2s5, play_r2s6, play_r2s7, play_r2s8, play_r2s9],
        3: [play_r3s0, play_r3s1, play_r3s2, play_r3s3, play_r3s4, play_r3s5, play_r3s6, play_r3s7, play_r3s8, play_r3s9],
        4: [play_r4s0, play_r4s1, play_r4s2, play_r4s3, play_r4s4, play_r4s5, play_r4s6, play_r4s7, play_r4s8, play_r4s9],
    }


    // 外部から再生関数を呼び出せるように設定
    useImperativeHandle(ref, () => ({
        playSound: () => {
            const currentRoundSoundSet = soundPlayersPerRound[round];

            if (round === 5) {
                playPractice();
            }

            if(currentRoundSoundSet && currentRoundSoundSet.length === 10) {
                const randomIndex = Math.floor(Math.random() * currentRoundSoundSet.length);
                const soundToPlay = currentRoundSoundSet[randomIndex];

                if(typeof soundToPlay === 'function') {
                    soundToPlay();
                    console.log(randomIndex)
                } else {
                    console.error(`Sound at index ${randomIndex} for round ${round} is not a playable function.`);
                }
            } else {
                console.warn(`Sound set for round ${round} is not found or does not contain 10 soudns. Playing beep as fallback.`);
            }
            // //ランダムなplaySoundを呼び出す
            // const index = Math.floor(Math.random() * playSounds.length);
            // playSounds[index]();
        },
        playBeep: () => {
            playBeep();
        },
        playPractice: () => {
            playPractice();
        }
    }));

    return null;
})