/* Create your own playlist from url or your local computer */
/* API Author : Haikel Fazzani */
/* 
    Api tested on : chrome , firefox , opera , edge 
    System : windows
    support : mp3 , mp4 , wav , mov , ogg
*/
import EventEmitter from "./event-emiter";
import { sizeTo, getTrackName, secdsToHms } from "./format";

export class AudioPlayer {

    constructor({ parent, childs = 'li', activeClass = "active", loop = false, loopAll = false }) {
        this.emitter = new EventEmitter();
        this.audio = new Audio();
        this.tracks = []; // list of tracks
        this.currentTrackIndex = 0;
        this.i = 0; // index of each audio stored in the array : tracks
        this.parentElmnt = parent; // example ul elements
        this.childs = childs; // example li elements        
        this.hasChild = false; // parent element (ul) has childs (li)
        this.activeClass = activeClass; // active track class (css)
        this.loopAll = loopAll; // loop all tracks ( : boolean)
        this.audio.loop = loop; // loop single track ( : boolean)

        this.loopAllTacks(); // ( : method)
    }

    addTracks(event) {
        event.preventDefault();
        this.setTracks([...event.target.files]);
        this.emitter.emit('haschild', this.hasChild = true);
    }

    setTracksURL(url) {
        let track = { name: getTrackName(url), url };

        if (!this.tracks.some(({ url }) => url === track.url)) {
            this.createPlayList(track);
            this.tracks.push(track);
        }
        this.emitter.emit('haschild', this.hasChild = true);
    }

    setTracks(audioLinks) {
        audioLinks.map(audio => {
            if (!this.tracks.some(({ name }) => name === audio.name)) {
                this.createPlayList(audio);
                this.tracks.push(
                    {
                        name: audio.name, size: audio.size, sizeTo: sizeTo(audio.size),
                        url: URL.createObjectURL(audio)
                    }
                );
            }
        });
    }

    // on child element click , play track
    onChildPlay() {
        this.emitter.on('haschild', (hasChild) => {
            if (hasChild) {
                [...this.parentElmnt.childNodes].map((child, index) => {
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
    createPlayList(audio) { this.createElemnt(this.parentElmnt, this.childs, audio.name); }

    // create a child element and appended to the parent element passed in the constructor
    createElemnt(parent = "ul", child = "li", text = "") {
        let element = document.createElement(child);
        element.innerHTML = text;
        element.dataset.track = text;
        parent.appendChild(element);
    }

    /** set progress , duration ---- */
    setProgress(seekbar, spanElmnt = {}) {
        this.audio.ontimeupdate = () => {
            let duration = this.audio.duration,
                currentTime = this.audio.currentTime,
                seekValue = Math.floor((100 / duration) * currentTime);

            if (!isNaN(seekValue)) {
                seekbar.value = seekValue;
                spanElmnt.innerHTML = secdsToHms(currentTime) + '/' + secdsToHms(duration);
            }
        }
    }


    getAudioObject() { return this.audio; }
    /* --------------------- Audio Controls -------- */

    playTrack() {
        if (this.tracks.length > 0) {
            this.removeActiveClass();
            this.addActiveClassByIndex(this.currentTrackIndex);
            this.playCurrentByIndex(this.currentTrackIndex);
        }
    }

    pauseTack() {
        if (this.audio.readyState > 1) {
            if (this.audio.paused) this.audio.play()
            else this.audio.pause();
        }
    }

    stopTrack() {
        if (this.audio.readyState > 1) {
            //this.audio.currentTime = 0;
            this.audio.pause();
        }
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

    muteTack() { return this.audio.muted = this.audio.muted ? false : true; }
    volPlus() { return this.audio.volume = this.audio.volume > 0.9 ? 0.9 : this.audio.volume + 0.1; }
    volMinus() { return this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume - 0.1 : 0.1; }

    // loop single track
    loopTack() {
        this.loopAll = false;
        this.audio.loop = this.audio.loop ? false : true;
        return this.audio.loop;
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

                    if (this.currentTrackIndex === this.tracks.length) {
                        this.currentTrackIndex = 0;
                    }

                    this.addActiveClassByIndex(this.currentTrackIndex);
                    this.playCurrentByIndex(this.currentTrackIndex);
                }
            }
        });
    }

    // play current track by its index passed in parameters
    playCurrentByIndex(trackIndex) {
        let isPlaying = this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended
            && this.audio.readyState > 2;

        this.audio.src = this.tracks[trackIndex].url;
        if (!isPlaying) {
            this.audio.oncanplay = () => this.audio.play();
        }
        return this.tracks[trackIndex].name;
    }

    /* add & remove a active class to the current child play (css) */
    addActiveClassByIndex(index = 0) {
        this.parentElmnt.childNodes[index].classList.add(this.activeClass);
    }

    // remove all active classes expect the current track play
    removeActiveClass() {
        [...this.parentElmnt.childNodes].map(child => child.classList.remove(this.activeClass));
    }

    removeActiveClassByIndex(index = 0) {
        this.parentElmnt.childNodes[index].classList.remove(this.activeClass);
    }
}