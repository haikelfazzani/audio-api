import { AudioPlayer } from './src/api';

window.onload = () => {

    let btnPlay     = document.getElementById('btn-play'),
        btnPause    = document.getElementById('btn-pause'),
        btnNext     = document.getElementById('btn-next'),
        btnPrev     = document.getElementById('btn-previous'),
        btnMute     = document.getElementById('btn-mute'),
        btnPlus     = document.getElementById('btn-plus'),
        btnMinus    = document.getElementById('btn-minus') ,
        btnLoop     = document.getElementById('btn-loop') ,
        btnLoopAll  = document.getElementById('btn-loop-all') ;

    let inputFile = document.getElementById('input-file'),
        ul = document.getElementById('audio-list');

    /**  */
    let audio = new AudioPlayer(ul, 'li');

    inputFile.onchange = (event) => audio.addAudio(event);

    // on click on audio in the list , the audio play the current
    audio.playCurrentTack();


    /* Audio Controls */
    btnPlay.onclick     = () => audio.playTrack();
    btnMute.onclick     = () => audio.muteTack()
    btnPause.onclick    = () => audio.pauseTack();
    btnNext.onclick     = () => audio.nextTack();
    btnPrev.onclick     = () => audio.prevTack();
    btnPlus.onclick     = () => audio.volUp();
    btnMinus.onclick    = () => audio.volDown();

    // get the current audio duration
    audio.onloadedmetadata = () => {
        console.log(audio.duration)
    }

    btnLoop.onclick = () => audio.loopTack();
    btnLoopAll.onclick = () => audio.playAll();
}