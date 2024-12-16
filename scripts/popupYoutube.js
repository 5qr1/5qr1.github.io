let isDragging = false;
let offsetX, offsetY;

const youtubePopup = document.getElementById('youtube-popup');
const youtubeInput = document.getElementById('youtube-input');
const youtubeEmbed = document.getElementById('youtube-embed');

function toggleYoutubePopup() {
    if (youtubePopup.style.display === 'none' || youtubePopup.style.display === '') {
        youtubePopup.style.display = 'block';
    } else {
        youtubePopup.style.display = 'none';
    }
}

function startDrag(event) {
    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    isDragging = true;
    offsetX = clientX - youtubePopup.getBoundingClientRect().left;
    offsetY = clientY - youtubePopup.getBoundingClientRect().top;
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

    newLeft = Math.max(0, Math.min(window.innerWidth - youtubePopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - youtubePopup.offsetHeight, newTop));

    youtubePopup.style.left = newLeft + 'px';
    youtubePopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

youtubePopup.addEventListener('mousedown', startDrag);
youtubePopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function embedYouTubeVideo() {
    const youtubeUrl = youtubeInput.value.trim();
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (videoId) {
        youtubeEmbed.src = `https://www.youtube.com/embed/${videoId}`;
        youtubeEmbed.style.display = 'block';
    } else {
        alert('Invalid YouTube link');
    }
}

function getYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/)([a-zA-Z0-9_-]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export { toggleYoutubePopup, embedYouTubeVideo };
