import EventEmitter from './src/event-emiter';
import {AudioPlayer} from './src/api';

// https://www.computerhope.com/jargon/m/example.mp3
window.onload = () => {

    let btnPlay     = document.getElementById('btn-play'),
        btnPause    = document.getElementById('btn-pause'),
        btnNext     = document.getElementById('btn-next'),
        btnPrev     = document.getElementById('btn-previous'),
        btnMute     = document.getElementById('btn-mute');

    let inputFile   = document.getElementById('input-file'),
        ul          = document.getElementById('audio-list');

    let emitter = new EventEmitter();

    let audio = new AudioPlayer(), audioList = [], i = 0, currentAudioIndex = 0;

    inputFile.onchange = (event) => {
        event.preventDefault();
        let audioFile = event.target.files[0];
        let audioBlob = URL.createObjectURL(audioFile);

        console.log(typeof inputFile , typeof event);

        createPlayList(audioFile);

        audioList.push({ id: i++, name: audioBlob });
        //console.log(audioList)
    }

    // on click on audio in the list , the audio play the current
    ul.onclick = () => {
        [...ul.childNodes].map((child, index) => {
            child.onclick = () => {
                getDuration();
                currentAudioIndex = index;
                audio.src = audioList[index].name;
                play();
            }
        });
    }

    // create li list from audioList after converting links to urls object
    function createPlayList(url) {
        let li = document.createElement('li');
        li.innerHTML = url.name;
        ul.appendChild(li);
    }

    // get the current audio duration
    function getDuration() {
        audio.onloadedmetadata = () => {
            console.log(audio.duration, audio.textTracks)
        }
    }

    /* Audio Controls */
    btnPlay.onclick = () => {
        if (audioList.length > 0) {
            audio.src = audioList[0].name;
            play();
        }
    }
    btnMute.onclick     = () => mute()
    btnPause.onclick    = () => pause();
    btnNext.onclick     = () => next();
    btnPrev.onclick     = () => prev();

    function play() { audio.play(); }

    function pause() {
        if (audio.paused) audio.play()
        else audio.pause();
    }

    function next() {
        currentAudioIndex++;
        currentAudioIndex = currentAudioIndex > audioList.length - 1 ? 0 : currentAudioIndex;
        audio.src = audioList[currentAudioIndex].name;
        play();
    }

    function prev() {
        currentAudioIndex--;
        currentAudioIndex = currentAudioIndex < 0 ? audioList.length-1 : currentAudioIndex;
        audio.src = audioList[currentAudioIndex].name;
        play();
    }

    function mute() { audio.muted = audio.muted === false ? true : false; }

}