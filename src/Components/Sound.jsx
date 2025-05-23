import React, { forwardRef, useImperativeHandle } from "react";
import useSound from 'use-sound'

//サウンドのインポート
import sound0 from '../Sounds/keySound0.wav'
import sound1 from '../Sounds/keySound1.wav'
import sound2 from '../Sounds/keySound2.wav'
import sound3 from '../Sounds/keySound3.wav'
import sound4 from '../Sounds/keySound4.wav'
import sound5 from '../Sounds/keySound5.wav'
import sound6 from '../Sounds/keySound6.wav'
import sound7 from '../Sounds/keySound7.wav'
import sound8 from '../Sounds/keySound8.wav'
import sound9 from '../Sounds/keySound9.wav'
import beepSound0 from '../Sounds/beep.mp3'
import beepSound1 from '../Sounds/cursor.mp3'


export const Sound = forwardRef((props, ref) => {
    const sounds = [sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8,sound9];
    const [playSound0] = useSound(sounds[0]);
    const [playSound1] = useSound(sounds[1]);
    const [playSound2] = useSound(sounds[2]);
    const [playSound3] = useSound(sounds[3]);
    const [playSound4] = useSound(sounds[4]);
    const [playSound5] = useSound(sounds[5]);
    const [playSound6] = useSound(sounds[6]);
    const [playSound7] = useSound(sounds[7]);
    const [playSound8] = useSound(sounds[8]);
    const [playSound9] = useSound(sounds[9]);
    // 効果音ラボ（https://soundeffect-lab.info/sound/button/）より拝借
    // 「ボタン・システム音」よりビープ音5, カーソル移動1
    const [playBeep] = useSound(beepSound0, { volume: 0.2 });
    const [PlayPractice] = useSound(beepSound1, { volume: 0.2 });

    const playSounds = [playSound0, playSound1, playSound2, playSound3, playSound4, playSound5, playSound6, playSound7, playSound8, playSound9];


    // 外部から再生関数を呼び出せるように設定
    useImperativeHandle(ref, () => ({
        playSound: () => {
            //ランダムなplaySoundを呼び出す
            const index = Math.floor(Math.random() * playSounds.length);
            playSounds[index]();
        },
        playBeep: () => {
            playBeep();
        },
        playPractice: () => {
            PlayPractice();
        }
    }));

    return null;
})