let isDragging = false;
let offsetX, offsetY;

const markdownPopup = document.getElementById('markdown-popup');
const markdownContent = document.getElementById('markdown-content');
const closeMarkdownPopup = document.getElementById('close-markdown-popup');
const md = window.markdownit();

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

    isDragging = true;
    offsetX = clientX - markdownPopup.getBoundingClientRect().left;
    offsetY = clientY - markdownPopup.getBoundingClientRect().top;
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

    newLeft = Math.max(0, Math.min(window.innerWidth - markdownPopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - markdownPopup.offsetHeight, newTop));

    markdownPopup.style.left = newLeft + 'px';
    markdownPopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

markdownPopup.addEventListener('mousedown', startDrag);
markdownPopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

closeMarkdownPopup.addEventListener('click', () => {
    markdownPopup.style.display = 'none';
});
