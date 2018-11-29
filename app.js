import { AudioPlayer } from './src/api';

window.onload = () => {

    let btnPlay     = document.getElementById('btn-play'),
        btnPause    = document.getElementById('btn-pause'),
        btnStop     = document.getElementById('btn-stop'),
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

    inputFile.onchange = (event) => audio.addTrack(event);

    // on click on audio in the list , the audio play the current
    audio.onChildPlay();


    /* Audio Controls */
    btnPlay.onclick     = () => audio.playTrack();    
    btnPause.onclick    = () => audio.pauseTack();
    btnStop.onclick     = () => audio.stopTrack();
    btnMute.onclick     = () => audio.muteTack();
    btnNext.onclick     = () => audio.nextTack();
    btnPrev.onclick     = () => audio.prevTack();
    btnPlus.onclick     = () => audio.volPlus();
    btnMinus.onclick    = () => audio.volMinus();

    // get the current audio duration
    audio.onloadedmetadata = () => {
        console.log(audio.duration)
    }

    btnLoop.onclick = () => audio.loopTack();
    btnLoopAll.onclick = () => audio.playAll();
}