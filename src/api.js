/* Create your own playlist from your local computer */
/* API Author : Haikel Fazzani */
/* Api tested on : chrome , firefox , opera , edge */
import EventEmitter from "./event-emiter";

export class AudioPlayer {

    constructor(parentId, childs = 'li', activeClass = "active", loop = false, loopAll = false) {
        this.emitter = new EventEmitter();
        this.audio = new Audio();
        this.tracks = []; // list of tracks
        this.currentTrackIndex = 0;
        this.i = 0; // index of each audio stored in the array : tracks
        this.parentId = parentId; // example ul elements
        this.childs = childs; // example li elements
        this.duration = this.audio.duration;
        this.hasChild = false; // parent element (ul) has childs (li)
        this.activeClass = activeClass; // active track class (css)
        this.loopAll = loopAll; // loop all tracks ( : boolean)
        this.audio.loop = loop; // loop single track ( : boolean)
        this.loopAllTacks(); // ( : method)
    }

    addTrack(event) {
        event.preventDefault();
        let audioFile = event.target.files[0], audioBlob = URL.createObjectURL(audioFile);

        this.createPlayList(audioFile);
        this.tracks.push({ id: this.i++, name: audioBlob });

        this.emitter.emit('haschild', this.hasChild = true);
        return this.tracks;
    }

    // on child element click , play track
    onChildPlay() {
        this.emitter.on('haschild', (hasChild) => {
            if (hasChild) {
                [...this.parentId.childNodes].map((child, index) => {
                    this.emitter.removeListener('haschild', this.hasChild);
                    child.onclick = () => {
                        this.removeActiveClass();
                        child.classList.add(this.activeClass);
                        this.currentTrackIndex = index;
                        this.playCurrentByIndex(index);
                    }
                });
            }
        })
    }

    // create li list from tracks after converting links to urls object
    createPlayList(url) { this.createElemnt(this.parentId, this.childs, url.name); }

    /* ------- Audio Controls -------- */

    playTrack() {
        if (this.tracks.length > 0) {
            this.removeActiveClass();
            this.addActiveClassByIndex(this.currentTrackIndex);
            this.playCurrentByIndex(this.currentTrackIndex);
        }
    }

    pauseTack() {
        if (this.audio.paused) this.audio.play()
        else this.audio.pause();
    }

    stopTrack() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    nextTack() {
        if (this.tracks.length > 0) {
            this.removeActiveClassByIndex(this.currentTrackIndex);
            this.currentTrackIndex++;

            this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ?
                0 : this.currentTrackIndex;

            this.addActiveClassByIndex(this.currentTrackIndex);
            this.playCurrentByIndex(this.currentTrackIndex);
        }
    }

    prevTack() {
        if (this.tracks.length > 0) {
            this.removeActiveClassByIndex(this.currentTrackIndex);
            this.currentTrackIndex--;
            this.currentTrackIndex = this.currentTrackIndex < 0 ? this.tracks.length - 1 :
                this.currentTrackIndex;

            this.addActiveClassByIndex(this.currentTrackIndex);
            this.playCurrentByIndex(this.currentTrackIndex);
        }
    }

    muteTack() { this.audio.muted = this.audio.muted === false ? true : false; }
    volPlus() { return this.audio.volume = this.audio.volume < 1 ? this.audio.volume + 0.1 : 0.9; }
    volMinus() { return this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume - 0.1 : 0.1; }

    // loop single track
    loopTack() {
        this.loopAll = false;
        this.audio.loop = this.audio.loop ? false : true;
    }

    // loop all tracks list
    playAll() {
        this.audio.loop = false;
        this.loopAll = this.loopAll ? false : true;
        this.emitter.emit('playall', this.loopAll);
        return this.loopAll;
    }
    
    // this method listen for the event 'playall' emited by playAll() method
    loopAllTacks() {
        this.emitter.on('playall', (playall) => {
            this.audio.onended = () => {
                if (playall) {
                    this.removeActiveClassByIndex(this.currentTrackIndex);
                    this.currentTrackIndex++;

                    this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ?
                        0 : this.tracks.length - 1;

                    this.addActiveClassByIndex(this.currentTrackIndex);
                    this.playCurrentByIndex(this.currentTrackIndex);
                }
            }
        });
    }

    // play current track by its index passed in parameters
    playCurrentByIndex(trackIndex) {        
        this.audio.src = this.tracks[trackIndex].name;
        this.audio.play();
    }

    /* add & remove a active class to the current child play (css) */
    addActiveClassByIndex(index = 0) {
        this.parentId.childNodes[index].classList.add(this.activeClass);
    }

    removeActiveClass() {
        [...this.parentId.childNodes].map(child => child.classList.remove(this.activeClass));
    }

    removeActiveClassByIndex(index = 0) {
        this.parentId.childNodes[index].classList.remove(this.activeClass);
    }


    // create a child element and appended to the parent element passed in the constructor
    createElemnt(parent = "ul", child = "li", text = "") {
        let element = document.createElement(child);
        element.innerHTML = text;
        parent.appendChild(element);
    }
}