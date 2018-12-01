 // fixed 2 after comma : 5.125 => 5.12
function fixedAfterComma(num,decimals) {
    let sign = num >= 0 ? 1 : -1;
    return (Math.round((num*Math.pow(10,decimals)) + (sign*0.001)) / Math.pow(10,decimals)).toFixed(decimals);
}

// fixed two digits : 5 => 05
function fixed2Digits(num) {
    return ("0" + num).slice(-2);
}

// convert any size to KB Or MB
function sizeTo(size) {
    return size < 1000000 ? 
    (Math.floor(size / 1000) + 'KB') : (Math.floor(size / 1000000) + 'MB');
}

// convert time in seconds into hours & minutes & seconds => 01:02:50
function secdsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600) , m = Math.floor(d % 3600 / 60) , s = Math.floor(d % 3600 % 60);

    //var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    //var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return h > 0 ?
        fixed2Digits(h,2) +":"+ fixed2Digits(m,2) +":" + fixed2Digits(s,2) :
        fixed2Digits(m,2)+":" + fixed2Digits(s,2); 
}

/* 
    get track name from url :
    url : https://www.sample-videos.com/audio/mp3/wave.mp3
    return wave.mp3
*/
function getTrackName(url) {
    let str = url.split('/');
    return str[str.length-1];
}

export { fixedAfterComma , sizeTo , secdsToHms , getTrackName };