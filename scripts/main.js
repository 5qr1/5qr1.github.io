import { initAudio, playSoundcloudAudio } from './audio/audio.js'; 
import { togglePopupKey } from './popups/popupKey.js';
import { togglePopupNeofetch } from './popups/popupNeofetch.js';
import { togglePopupBlog } from './popups/popupBlog.js';
import { togglePopupSoundcloud } from './audio/popupSoundcloud.js';

window.onload = function() {
    initAudio();
    initMiscellaneous();
};

function createStars(container, numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        container.appendChild(star);
    }
}

function initMiscellaneous() {
    const containerMain = document.querySelector('.spacey-container .star-container');
    createStars(containerMain, 500);
    window.scrollTo(0, 0);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'h') {
        togglePopupKey(); 
    } else if (event.key === 'p') {
        togglePopupNeofetch();  
    } else if (event.key === 'b') {
        togglePopupBlog();
    } else if (event.key === 's') {
        togglePopupSoundcloud();
    }
});

document.addEventListener('playSoundcloud', (event) => {
    const { playUrl } = event.detail; 
    if (playUrl) {
        playSoundcloudAudio(playUrl); 
    }
});
