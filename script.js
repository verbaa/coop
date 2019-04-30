let recordButton = document.getElementById('record');

let stopButton = document.getElementById('stop');

let playButton = document.getElementById('play');


let audio = new Audio();
/* as we don't have a recorded audio file we can start by disabling the play button */
playButton.disabled;

console.log('started');

// @ https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
const audioContext = window.AudioContext || webKit.AudioContext;

const audioCtx = new AudioContext();

// we only need audio here
const audioConstraints = {audio: true, video: false};
let chunks = [];

/* we dont know what browser we are using so bring in the vendor prefixes */
// navigator.getUserMedia = (navigator.getUserMedia ||
// navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

successCallBack = function(audioStream) {
    /*
    * audiocontext docs: https://developer.mozilla.org/en/docs/Web/API/AudioContext
    */
    console.log('success');
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // const audioContext = new AudioContext();
    let mediaRecorder = new MediaRecorder(audioStream);
    // const audioBuffer = audioContext.createBuffer(1, 22500, 22500);
    // const mediaStream = audioContext.createMediaStreamSource(localMediaStream);
    console.log('OK, we have the Microphone.');
    // const filter = audioContext.createBiquadFilter();
    // mediaStream.connect(filter);
    // filter.connect(audioContext.destination);

    recordButton.onclick = function() {
        console.log('Record pressed');
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    }

    stopButton.onclick = function() {
        console.log('stop pressed');
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    }


    mediaRecorder.onstop = function(e) {
        console.log('onstop');
        // let audio = document.createElement('audio');
        // audio.setAttribute('controls', '');

        // audio.controls = true;

        let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        //var audio = new Audio(audioURL);
        audio.src = audioURL;
        playButton.enabled;
        console.log("recorder stopped");
    }

    playButton.onclick = function() {
        console.log('play pressed');
        audio.play();
    }

    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
    }
}








function errorCallBack(streamError) {
    console.log("WebRTC API not supported on this browser. " + streamError);
}


if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(audioConstraints).then(successCallBack, errorCallBack);
    console.log('getUserMedia API supported');
} else {
    console.log("Getusermedia API is not supported on this browser");
}

/**
 * will prompt the user for access to their media input device. In this case a mic.
 * if the user gives permission then the 'successCallBack' will be fired. If the user
 * doesnt give permission then the errorCallBack will be fired with a PermissionDeniedError.
 * if the media is not available then the errorCallBack will be fires with a NotFoundError.
 * note: The user is not obliged to make a choice here in which case neither error will be returned.
 */
/*recordButton.onclick = function(){
  navigator.getUserMedia(audioConstraints, successCallback, errorCallBack);
} */

// TODO: Switch between play and pause when playing

