// thanks to shykuni / shy1132 for providing the backend and making this possible
// visit their site(s):
// https://saws.land/
// https://shy.rocks/

let isDragging = false;
let offsetX, offsetY;
let backgroundAudio = document.getElementById('background-audio');
let currentAudio = null;

const soundcloudPopup = document.getElementById('soundcloud-popup');
const soundcloudInput = document.getElementById('soundcloud-search-input');
const soundcloudResults = document.getElementById('soundcloud-results');

const controlPanel = document.createElement('div');
controlPanel.id = 'control-panel';

const speedLabel = document.createElement('label');
speedLabel.setAttribute('for', 'speed-slider');
speedLabel.textContent = 'Speed:';
controlPanel.appendChild(speedLabel);

const speedSlider = document.createElement('input');
speedSlider.id = 'speed-slider';
speedSlider.type = 'range';
speedSlider.min = 0.5;
speedSlider.max = 2;
speedSlider.step = 0.1;
speedSlider.value = 1;
controlPanel.appendChild(speedSlider);

const volumeLabel = document.createElement('label');
volumeLabel.setAttribute('for', 'volume-slider');
volumeLabel.textContent = 'Volume:';
controlPanel.appendChild(volumeLabel);

const volumeSlider = document.createElement('input');
volumeSlider.id = 'volume-slider';
volumeSlider.type = 'range';
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.step = 0.1;
volumeSlider.value = 1;
controlPanel.appendChild(volumeSlider);

const pauseButton = document.createElement('button');
pauseButton.id = 'pause-button';
pauseButton.textContent = 'Pause';
controlPanel.appendChild(pauseButton);

soundcloudPopup.appendChild(controlPanel);

let isPaused = false;

function togglePopupSoundcloud() {
    if (soundcloudPopup.style.display === 'none' || soundcloudPopup.style.display === '') {
        soundcloudPopup.style.display = 'block';
    } else {
        soundcloudPopup.style.display = 'none';
    }
}

function startDrag(event) {
    if (isSliderBeingDragged) return;

    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    isDragging = true;
    offsetX = clientX - soundcloudPopup.getBoundingClientRect().left;
    offsetY = clientY - soundcloudPopup.getBoundingClientRect().top;
    document.body.style.cursor = 'grabbing';

    if (event.type === 'touchstart') {
        event.preventDefault();
    }
}

function doDrag(event) {
    if (!isDragging) return;

    const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;

    let newLeft = clientX - offsetX;
    let newTop = clientY - offsetY;

    newLeft = Math.max(0, Math.min(window.innerWidth - soundcloudPopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - soundcloudPopup.offsetHeight, newTop));

    soundcloudPopup.style.left = newLeft + 'px';
    soundcloudPopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

soundcloudPopup.addEventListener('mousedown', startDrag);
soundcloudPopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function sanitize(string = '') {
    let newString = string // thank you to shykuni for this code snippet
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .trim();

    return newString;
}

async function fetchSoundcloudResults(query) {
    soundcloudResults.innerHTML = '<p>Loading...</p>';

    const apiUrl = `https://api.shy.rocks/5qr1/soundcloud/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('failed to fetch the results');

        const data = await response.json();

        if (Array.isArray(data.tracks)) {
            const simplifiedResults = data.tracks.map(track => ({
                title: sanitize(track.title),
                playUrl: track.playUrl
            }));

            displayResults(simplifiedResults);
        }
    } catch (error) {
        soundcloudResults.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function displayResults(results) {
    if (!results || results.length === 0) {
        soundcloudResults.innerHTML = '<p>no results found</p>';
        return;
    }

    soundcloudResults.innerHTML = results.map(item => `
        <div class="soundcloud-item">
            <a href="#" class="soundcloud-link" data-url="${item.playUrl}">${item.title}</a>
        </div>
    `).join('');

    const links = document.querySelectorAll('.soundcloud-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const playUrl = e.target.dataset.url;
            playAudio(playUrl);
        });
    });
}

function playAudio(url) {
    if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0; 
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.remove();
    }

    currentAudio = document.createElement('audio');
    currentAudio.src = url;
    currentAudio.id = 'soundcloud-audio-player';
    document.body.appendChild(currentAudio);
    currentAudio.play();

    setAudioSpeed(speedSlider.value);
    setAudioVolume(volumeSlider.value);

    currentAudio.addEventListener('ended', () => {
        currentAudio.remove();
        currentAudio = null;

        if (backgroundAudio) {
            backgroundAudio.play(); 
        }
    });
}

function setAudioSpeed(speed) {
    if (currentAudio) {
        currentAudio.playbackRate = speed;
    }
}

function setAudioVolume(volume) {
    if (currentAudio) {
        currentAudio.volume = volume;
    }
}

function togglePause() {
    if (currentAudio) {
        if (isPaused) {
            currentAudio.play();
            isPaused = false;
            pauseButton.textContent = 'Pause';
        } else {
            currentAudio.pause();
            isPaused = true;
            pauseButton.textContent = 'Resume';
        }
    }
}

let isSliderBeingDragged = false;

speedSlider.addEventListener('input', (e) => {
    setAudioSpeed(e.target.value);
});

volumeSlider.addEventListener('input', (e) => {
    setAudioVolume(e.target.value);
});

speedSlider.addEventListener('mousedown', () => isSliderBeingDragged = true);
volumeSlider.addEventListener('mousedown', () => isSliderBeingDragged = true);
speedSlider.addEventListener('mouseup', () => isSliderBeingDragged = false);
volumeSlider.addEventListener('mouseup', () => isSliderBeingDragged = false);

pauseButton.addEventListener('click', togglePause);

soundcloudInput.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            fetchSoundcloudResults(query);
        } else {
            soundcloudResults.innerHTML = '';
        }
    }
});

export { togglePopupSoundcloud };
