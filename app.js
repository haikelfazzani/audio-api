import EventEmitter from './src/event-emiter';
import { AudioPlayer } from './src/api';

// https://www.computerhope.com/jargon/m/example.mp3
window.onload = () => {

    let btnPlay = document.getElementById('btn-play'),
        btnPause = document.getElementById('btn-pause'),
        btnNext = document.getElementById('btn-next'),
        btnPrev = document.getElementById('btn-previous'),
        btnMute = document.getElementById('btn-mute'),
        btnPlus = document.getElementById('btn-plus'),
        btnMinus = document.getElementById('btn-minus');

    let inputFile = document.getElementById('input-file'),
        ul = document.getElementById('audio-list');

    let emitter = new EventEmitter();

    let audio = new AudioPlayer(ul, 'li');

    inputFile.onchange = (event) => audio.addAudio(event);

    // on click on audio in the list , the audio play the current
    audio.playCurrentAudio();


    /* Audio Controls */
    btnPlay.onclick = () => audio.play();
    btnMute.onclick = () => audio.mute()
    btnPause.onclick = () => audio.pause();
    btnNext.onclick = () => audio.next();
    btnPrev.onclick = () => audio.prev();
    btnPlus.onclick = () => audio.volUp();
    btnMinus.onclick = () => audio.volDown();

    // get the current audio duration
    audio.onloadedmetadata = () => {
        console.log(audio.duration)
    }
}