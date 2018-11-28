import EventEmitter from "./event-emiter";

export class AudioPlayer {

    constructor(parentElment , childs = 'li') {   
        this.emitter            = new EventEmitter(); 
        this.audio              = new Audio();
        this.audioList          = []; // list of audios
        this.currentAudioIndex  = 0;
        this.i                  = 0; // index of each audio stored in the array audioList
        this.parentElment       = parentElment; // example ul elements
        this.childs             = childs; // example li elements
        this.duration           = this.audio.duration;      
        this.hasChild = false;
    }

    addAudio(event) {
        event.preventDefault();
        let audioFile = event.target.files[0];
        let audioBlob = URL.createObjectURL(audioFile);
        
        this.createPlayList(audioFile);
        this.audioList.push({ id: this.i++, name: audioBlob });

        this.emitter.emit('haschild' , this.hasChild = true)
    }

    // on click on audio in the list , the audio play the current
    playCurrentAudio() {
        this.emitter.on('haschild' , (hasChild) => {
            if(hasChild) {
                [...this.parentElment.childNodes].map((child, index) => {
                    this.emitter.removeListener('haschild' , this.hasChild);
                    child.onclick = () => {                
                        this.currentAudioIndex = index;
                        this.audio.src = this.audioList[index].name;
                        this.audio.play();                        
                    }
                });                
            }
        })
    }

    // create li list from audioList after converting links to urls object
    createPlayList(url) {
        let element = document.createElement(this.childs);
        element.innerHTML = url.name;
        this.parentElment.appendChild(element);
    }    

    /* ------- Audio Controls -------- */

    play() {
        if (this.audioList.length > 0) {
            this.audio.src = this.audioList[0].name;
            this.audio.play();
        }
    }

    pause() {
        if (this.audio.paused) this.audio.play()
        else this.audio.pause();
    }

    next() {
        this.currentAudioIndex++;
        this.currentAudioIndex = this.currentAudioIndex > this.audioList.length - 1 ? 0 : this.currentAudioIndex;
        this.audio.src = this.audioList[this.currentAudioIndex].name;
        this.audio.play();
    }

    prev() {
        this.currentAudioIndex--;
        this.currentAudioIndex = this.currentAudioIndex < 0 ? this.audioList.length - 1 : this.currentAudioIndex;
        this.audio.src = this.audioList[this.currentAudioIndex].name;
        this.audio.play();
    }

    mute() { this.audio.muted = this.audio.muted === false ? true : false; }

    volUp() {
        this.audio.volume = this.audio.volume < 1 ? this.audio.volume+0.1 : 0.9; 
        return this.audio.volume;
    }

    volDown() {
        this.audio.volume = this.audio.volume > 0.1 ? this.audio.volume-0.1 : 0.1; 
        return this.audio.volume;
    }

}