let isDragging = false;
let offsetX, offsetY;

const keybindsPopup = document.getElementById('keybinds-popup');

function togglePopupKey() {
    if (keybindsPopup.style.display === 'none' || keybindsPopup.style.display === '') {
        keybindsPopup.style.display = 'block';
    } else {
        keybindsPopup.style.display = 'none';
    }
}

function startDrag(event) {
    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    isDragging = true;
    offsetX = clientX - keybindsPopup.getBoundingClientRect().left;
    offsetY = clientY - keybindsPopup.getBoundingClientRect().top;
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

    newLeft = Math.max(0, Math.min(window.innerWidth - keybindsPopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - keybindsPopup.offsetHeight, newTop));

    keybindsPopup.style.left = newLeft + 'px';
    keybindsPopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

keybindsPopup.addEventListener('mousedown', startDrag);
keybindsPopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

export { togglePopupKey };
