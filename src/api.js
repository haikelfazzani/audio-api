import EventEmitter from "./event-emiter";

export class AudioPlayer {

    constructor(parentElment, childs = 'li' , activeClass = "active") {
        this.emitter                = new EventEmitter();
        this.audio                  = new Audio();
        this.tracks                 = []; // list of tracks
        this.currentTrackIndex      = 0;
        this.i                      = 0; // index of each audio stored in the array : tracks
        this.parentElment           = parentElment; // example ul elements
        this.childs                 = childs; // example li elements
        this.duration               = this.audio.duration;
        this.hasChild               = false; // parent element (ul) has childs (li)
        this.activeClass            = activeClass; // active track class (css)
        this.loopAllAudios          = false;
    }

    addAudio(event) {
        event.preventDefault();
        let audioFile = event.target.files[0] , audioBlob = URL.createObjectURL(audioFile);

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
        let element = document.createElement(this.childs);
        element.innerHTML = url.name;
        this.parentElment.appendChild(element);
    }

    /* ------- Audio Controls -------- */

    play() {
        if (this.tracks.length > 0) {
            this.removeActiveClass();
            this.parentElment.childNodes[0].classList.add(this.activeClass);
            this.audio.src = this.tracks[0].name;
            this.audio.play();
        }
    }

    pause() {
        if (this.audio.paused) this.audio.play()
        else this.audio.pause();
    }

    next() {
        if (this.tracks.length > 0) {
            this.currentTrackIndex++;
            this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ? 0 : 
                                    this.currentTrackIndex;
            this.audio.src = this.tracks[this.currentTrackIndex].name;
            this.audio.play();
        }
    }

    prev() {
        if (this.tracks.length > 0) {
            this.currentTrackIndex--;tracks
            this.currentTrackIndex = this.currentTrackIndex < 0 ? this.tracks.length - 1 : 
                                    this.currentTrackIndex;
            this.audio.src = this.tracks[this.currentTrackIndex].name;
            this.audio.play();
        }
    }

    mute() { this.audio.muted = this.audio.muted === false ? true : false; }
    volUp() { return this.audio.volume = this.audio.volume < 1 ? this.audio.volume + 0.1 : 0.9; }
    volDown() { return this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume - 0.1 : 0.1;  }
    
    // loop all tracks list
    actLoopAll() {
        this.currentTrackIndex++;
        this.currentTrackIndex = this.currentTrackIndex > this.tracks.length - 1 ? 0 : this.currentTrackIndex;
        this.audio.src = this.tracks[this.currentTrackIndex].name;
        this.audio.play();
    }

    /* __________ Methods to handle the tracks list */

    // remove class 'active' from the previous active track
    removeActiveClass() {
        [...this.parentElment.childNodes].map(child => child.classList.remove("active"));
    }
}