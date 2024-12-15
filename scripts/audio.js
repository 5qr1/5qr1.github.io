const audioPool = [
    "audio/ArrowRootMFDOOM.mp3",
    "audio/BergamotWildMFDOOM.mp3",
    "audio/ItsYourWorld.mp3",
    "audio/NasIsLikeNASInstrumental.mp3"
];

let currentAudioIndex = 0;
const audio = document.getElementById('background-audio');

function pickRandomTrack() {
    return audioPool[Math.floor(Math.random() * audioPool.length)];
}

function playRandomTrack() {
    audio.src = pickRandomTrack();
    audio.play();
}

audio.addEventListener('ended', playRandomTrack);

document.body.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    }
});

document.addEventListener('keydown', function(event) {
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
});

function initAudio() {
    playRandomTrack();
    audio.volume = 0.5;
}

export { initAudio };
