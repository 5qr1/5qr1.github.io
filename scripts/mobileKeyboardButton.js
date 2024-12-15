export function showMobileButtonIfNeeded() {
    const isMobile = (
        (window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent)) && window.matchMedia("(max-width: 768px)").matches
    ) || /iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream;

    const mobileKeyboardButton = document.getElementById('mobile-keyboard-button');

    if (isMobile) {
        mobileKeyboardButton.style.display = 'block';

        mobileKeyboardButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.style.position = 'absolute';
            input.style.opacity = '0';
            input.style.height = '0';
            input.style.width = '0';
            input.style.top = '0';
            document.body.appendChild(input);

            input.focus();
            input.blur();
            document.body.removeChild(input);
        });
    }
}

