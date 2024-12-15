let isDragging = false;
let offsetX, offsetY;
let touchTimeout = null;

const markdownPopup = document.getElementById('markdown-popup');
const markdownContent = document.getElementById('markdown-content'); // Scrollable content
const closeMarkdownPopup = document.getElementById('close-markdown-popup');

const md = window.markdownit();

// Helper to detect touch devices
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

export function showMarkdownPopup(fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(text => {
            const htmlContent = md.render(text);
            markdownContent.innerHTML = htmlContent; 
            markdownPopup.style.display = 'block'; 
        })
        .catch(error => {
            markdownContent.textContent = 'Error loading file.';
            console.error(error);
        });
}

function startDrag(event) {
    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    // Allow dragging the entire popup except for the scrollable content on mobile
    if (isTouchDevice && event.target === markdownContent) return;

    isDragging = true;
    offsetX = clientX - markdownPopup.getBoundingClientRect().left;
    offsetY = clientY - markdownPopup.getBoundingClientRect().top;
    document.body.style.cursor = 'grabbing';

    if (event.type === 'touchstart') {
        event.preventDefault();
    }

    if (touchTimeout) {
        clearTimeout(touchTimeout);
        touchTimeout = null;
    }
}

function doDrag(event) {
    if (!isDragging) return;

    const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;

    let newLeft = clientX - offsetX;
    let newTop = clientY - offsetY;

    // Keep the popup within the screen boundaries
    newLeft = Math.max(0, Math.min(window.innerWidth - markdownPopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - markdownPopup.offsetHeight, newTop));

    markdownPopup.style.left = newLeft + 'px';
    markdownPopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

// Event listeners for dragging (works for both desktop and mobile)
markdownPopup.addEventListener('mousedown', startDrag);
markdownPopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

// Allow scrolling on the content area only for touch devices
if (isTouchDevice) {
    markdownContent.addEventListener('touchmove', function(event) {
        event.stopPropagation(); // Allow scrolling inside the content area without triggering drag
    });
}

// Timeout mechanism for close button (to prevent accidental long presses on mobile)
closeMarkdownPopup.addEventListener('touchstart', function(event) {
    touchTimeout = setTimeout(() => {
        markdownPopup.style.display = 'none';
    }, 200);
});

closeMarkdownPopup.addEventListener('touchend', function(event) {
    if (touchTimeout) {
        clearTimeout(touchTimeout);
        touchTimeout = null;
    } else {
        markdownPopup.style.display = 'none';
    }
});

// Standard close button click handler for desktop
closeMarkdownPopup.addEventListener('click', () => {
    markdownPopup.style.display = 'none';
});
