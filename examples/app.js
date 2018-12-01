import { AudioPlayer } from '../src/api';

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
        btnLoopAll  = document.getElementById('btn-loop-all') ,
        seekbar     = document.getElementById('seekbar') ,
        spanElemnt = document.getElementById('progress-time'); 

    let inputFile = document.getElementById('input-file'),
        inputText = document.getElementById('input-text'),
        btnAdd = document.getElementById('btn-add'),
        parent = document.getElementById('audio-list');

    /**  */
    let audio = new AudioPlayer({parent});

    inputFile.onchange = (event) => { audio.addTracks(event); };
    btnAdd.onclick = () => {
        audio.setTracksURL(inputText.value)
    }

    // on click on audio in the list , the audio play the current
    audio.onChildPlay();    

    /* Audio Controls */
    btnPlay.onclick     = () => audio.playTrack();    
    btnPause.onclick    = () => audio.pauseTack();
    btnStop.onclick     = () => audio.stopTrack();
    btnMute.onclick     = () => audio.muteTack();    
    btnPrev.onclick     = () => audio.prevTack();
    btnNext.onclick     = () => audio.nextTack();
    btnPlus.onclick     = () => audio.volPlus();
    btnMinus.onclick    = () => audio.volMinus();

    // get the current audio duration
    //audio.getDuration().then(res => console.log(res));
    audio.setProgress(seekbar , spanElemnt);

    // audio.getAudioObject().onloadeddata = () => {
    //     console.log(audio.getAudioObject().duration)
    // };

    // audio.getAudioObject().ontimeupdate = () => {
    //     console.log(audio.getAudioObject().currentTime)
    // };

    btnLoop.onclick = () => audio.loopTack();
    btnLoopAll.onclick = () => audio.playAll();

}