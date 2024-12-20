const audioPool = [
    "audio/ArrowRootMFDOOM.mp3",
    "audio/BergamotWildMFDOOM.mp3",
    "audio/ItsYourWorld.mp3",
    "audio/NasIsLikeNASInstrumental.mp3"
];

let currentAudioIndex = 0;
const audio = document.getElementById('background-audio');
let soundcloudAudio = null; 
let isSoundcloudActive = false;

function pickRandomTrack() {
    return audioPool[Math.floor(Math.random() * audioPool.length)];
}

function playRandomTrack() {
    if (!isSoundcloudActive) {
        audio.src = pickRandomTrack();
        audio.play();
    }
}

audio.addEventListener('ended', playRandomTrack);

function playOnce() {
    audio.play();
    document.body.removeEventListener('keydown', playOnce);
    document.body.removeEventListener('click', playOnce);
}

document.body.addEventListener('keydown', playOnce);
document.body.addEventListener('click', playOnce);

document.addEventListener('keydown', function(event) {
    if (!isSoundcloudActive) {
        if (event.key === 'q') {
            currentAudioIndex = (currentAudioIndex - 1 + audioPool.length) % audioPool.length;
            audio.src = audioPool[currentAudioIndex];
            audio.play();
        } else if (event.key === 'w') {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        } else if (event.key === 'e') {
            currentAudioIndex = (currentAudioIndex + 1) % audioPool.length;
            audio.src = audioPool[currentAudioIndex];
            audio.play();
        }
    }
});

function initAudio() {
    playRandomTrack();
    audio.volume = 0.5;
}

function playSoundcloudAudio(url) {
    if (audio) {
        audio.pause();
    }

    isSoundcloudActive = true; 

    if (soundcloudAudio) {
        soundcloudAudio.pause();
        soundcloudAudio.remove();
    }

    soundcloudAudio = document.createElement('audio');
    soundcloudAudio.src = url;
    soundcloudAudio.id = 'soundcloud-audio-player';
    document.body.appendChild(soundcloudAudio);
    soundcloudAudio.play();

    soundcloudAudio.addEventListener('ended', () => {
        soundcloudAudio.remove();
        soundcloudAudio = null;
        isSoundcloudActive = false;
        playRandomTrack();
    });
}

export { initAudio, playSoundcloudAudio };
