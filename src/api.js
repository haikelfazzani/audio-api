/* Create your own playlist from your local computer */
/* API Author : Haikel Fazzani */
/* Api tested on : chrome , firefox , opera , edge */
import EventEmitter from "./event-emiter";

export class AudioPlayer {

    constructor(parentElment, childs = 'li', activeClass = "active", loop = false, loopAll = false) {
        this.emitter = new EventEmitter();
        this.audio = new Audio();
        this.tracks = []; // list of tracks
        this.currentTrackIndex = 0;
        this.i = 0; // index of each audio stored in the array : tracks
        this.parentElment = parentElment; // example ul elements
        this.childs = childs; // example li elements
        this.duration = this.audio.duration;
        this.hasChild = false; // parent element (ul) has childs (li)
        this.activeClass = activeClass; // active track class (css)
        this.loopAll = loopAll; // loop all tracks
        this.audio.loop = loop; // loop single track
        this.loopAllTacks();
    }

    addAudio(event) {
        event.preventDefault();
        let audioFile = event.target.files[0], audioBlob = URL.createObjectURL(audioFile);

        this.createPlayList(audioFile);
        this.tracks.push({ id: this.i++, name: audioBlob });

        this.emitter.emit('haschild', this.hasChild = true);
        return this.tracks;
    }

    // on click on audio in the list , the audio play the current
    playCurrentAudio() {
        this.emitter.on('haschild', (hasChild) => {
            if (hasChild) {
                [...this.parentElment.childNodes].map((child, index) => {
                    this.emitter.removeListener('haschild', this.hasChild);
                    child.onclick = () => {
                        this.removeActiveClass();
                        child.classList.add(this.activeClass);
                        this.currentTrackIndex = index;
                        this.audio.src = this.tracks[index].name;
                        this.audio.play();
                    }
                });
            }
        })
    }

    // create li list from tracks after converting links to urls object
    createPlayList(url) {
        this.createElemnt(this.parentElment, this.childs, url.name);
    }

    /* ------- Audio Controls -------- */

    playTrack() {
        if (this.tracks.length > 0) {
            this.removeActiveClass();
            this.addActiveClassByIndex(this.currentTrackIndex);
            this.audio.src = this.tracks[this.currentTrackIndex].name;
            this.audio.play();
        }
    }

    pauseTack() {
        if (this.audio.paused) this.audio.play()
        else this.audio.pause();
    }

    nextTack() {
        if (this.tracks.length > 0) {
            this.removeActiveClassByIndex(this.currentTrackIndex);
            this.currentTrackIndex++;

            this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ?
                0 : this.currentTrackIndex;

            this.addActiveClassByIndex(this.currentTrackIndex);
            this.audio.src = this.tracks[this.currentTrackIndex].name;
            this.audio.play();
        }
    }

    prevTack() {
        if (this.tracks.length > 0) {
            this.removeActiveClassByIndex(this.currentTrackIndex);
            this.currentTrackIndex--;
            this.currentTrackIndex = this.currentTrackIndex < 0 ? this.tracks.length - 1 :
                this.currentTrackIndex;
            this.addActiveClassByIndex(this.currentTrackIndex);
            this.audio.src = this.tracks[this.currentTrackIndex].name;
            this.audio.play();
        }
    }

    muteTack() { this.audio.muted = this.audio.muted === false ? true : false; }
    volUp() { return this.audio.volume = this.audio.volume < 1 ? this.audio.volume + 0.1 : 0.9; }
    volDown() { return this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume - 0.1 : 0.1; }

    // loop single track
    loopTack() {
        if (this.audio.loop) this.audio.loop = false;
        else this.audio.loop = true;
    }

    // loop all tracks list
    playAll() {
        this.audio.loop = false;
        this.loopAll = this.loopAll ? false : true;
        this.emitter.emit('playall', this.loopAll);
    }

    loopAllTacks() {
        this.emitter.on('playall', (playall) => {
            this.audio.onended = () => {
                if (playall) {
                    this.removeActiveClassByIndex(this.currentTrackIndex);
                    this.currentTrackIndex++;

                    this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ?
                        0 : this.tracks.length - 1;

                    this.addActiveClassByIndex(this.currentTrackIndex);
                    this.audio.src = this.tracks[this.currentTrackIndex].name;
                    this.audio.play();
                }
            }
        });
    }

    /* __________ Methods to handle the tracks list Elements */

    addActiveClassByIndex(index = 0) {
        this.parentElment.childNodes[index].classList.add(this.activeClass);
    }

    // remove class 'active' from the previous active track
    removeActiveClass() {
        [...this.parentElment.childNodes].map(child => child.classList.remove(this.activeClass));
    }

    removeActiveClassByIndex(index = 0) {
        this.parentElment.childNodes[index].classList.remove(this.activeClass);
    }


    // create element dom
    createElemnt(parent = "ul", child = "li", text = "") {
        let element = document.createElement(child);
        element.innerHTML = text;
        parent.appendChild(element);
    }
}