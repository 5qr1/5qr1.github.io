import { initAudio } from './audio.js';
import { togglePopupKey } from './popupKey.js';
import { toggleYoutubePopup, embedYouTubeVideo } from './popupYoutube.js';
import { togglePopupNeofetch } from './popupNeofetch.js';
import { togglePopupBlog } from './popupBlog.js';

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
    } else if (event.key === 'e') {
        toggleYoutubePopup(); // Trigger the YouTube input popup
    } else if (event.key === 'p') {
        togglePopupNeofetch();  
    } else if (event.key === 'b') {
        togglePopupBlog();
    }
});

// Optional: Listen for the Enter key to embed the YouTube video
document.getElementById('youtube-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        embedYouTubeVideo();
    }
});
