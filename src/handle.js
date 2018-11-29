function roundTime(time) { // fixed 2 after comma
    return Math.round((time / 100) * 100) / 100
}

function sizeTo(size) {
    return size < 1000000 ? 
    (Math.floor(size / 1000) + 'KB') : (Math.floor(size / 1000000) + 'MB');
}

function secToMinutes(time) {
    return roundTime((time / 60) * 100);
}

// get track name from url
function getTrackName(url) {
    let str = url.split('/');
    return str[str.length-1];
}

export { roundTime , sizeTo , secToMinutes , getTrackName };