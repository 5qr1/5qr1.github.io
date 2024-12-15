export function showMobileButtonIfNeeded() {
    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !/Macintosh/i.test(navigator.userAgent);
    const mobileKeyboardButton = document.getElementById('mobile-keyboard-button');

    if (isMobile) {
        mobileKeyboardButton.style.display = 'block';

        mobileKeyboardButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.style.position = 'absolute';
            input.style.top = '0';
            input.style.left = '-9999px';
            input.style.height = '1px';
            input.style.width = '1px';

            document.body.appendChild(input);
            input.focus();

            input.addEventListener('blur', () => {
                document.body.removeChild(input);
            });
        });
    }
}
