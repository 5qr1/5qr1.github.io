let isDragging = false;
let offsetX, offsetY;

const soundcloudPopup = document.getElementById('soundcloud-popup');
const soundcloudInput = document.getElementById('soundcloud-search-input');
const soundcloudResults = document.getElementById('soundcloud-results');

function togglePopupSoundcloud() {
    if (soundcloudPopup.style.display === 'none' || soundcloudPopup.style.display === '') {
        soundcloudPopup.style.display = 'block';
    } else {
        soundcloudPopup.style.display = 'none';
    }
}

function startDrag(event) {
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

async function fetchSoundcloudResults(query) {
    soundcloudResults.innerHTML = '<p>Loading...</p>';

    const apiUrl = `https://api.shy.rocks/5qr1/soundcloud/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('we fucked up:', error);
        soundcloudResults.innerHTML = `<p style="color: red;">we fucked up: ${error.message}</p>`;
    }
}

function displayResults(results) {
    if (!results || results.length === 0) {
        soundcloudResults.innerHTML = '<p>No results found</p>';
        return;
    }

    soundcloudResults.innerHTML = results.map(item => `
        <div>
            <a href="${item.url}" target="_blank">${item.title}</a>
        </div>
    `).join('');
}

soundcloudInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query) {
        fetchSoundcloudResults(query);
    } else {
        soundcloudResults.innerHTML = '';
    }
});

export { togglePopupSoundcloud };
