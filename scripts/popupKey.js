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

keybindsPopup.addEventListener('mousedown', function(event) {
    if (event.target !== keybindsPopup) {
        isDragging = true;
        offsetX = event.clientX - keybindsPopup.getBoundingClientRect().left;
        offsetY = event.clientY - keybindsPopup.getBoundingClientRect().top;
        document.body.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;
        newLeft = Math.max(0, Math.min(window.innerWidth - keybindsPopup.offsetWidth, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - keybindsPopup.offsetHeight, newTop));
        keybindsPopup.style.left = newLeft + 'px';
        keybindsPopup.style.top = newTop + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    document.body.style.cursor = '';
});

export { togglePopupKey };
