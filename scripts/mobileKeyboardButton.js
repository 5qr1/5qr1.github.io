export function showMobileButtonIfNeeded() {
    const isMobile = (() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /android/i.test(userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(userAgent) && !/Macintosh/i.test(userAgent);
        const isMobileHint = /mobile/i.test(userAgent);
        return isAndroid || isIOS || isMobileHint;
    })();
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

            let lastInputTime = 0; 
            const DEBOUNCE_DELAY = 100; 

            input.addEventListener('input', (event) => {
                const value = event.target.value;
                const currentTime = Date.now();

                if (currentTime - lastInputTime > DEBOUNCE_DELAY && value) {
                    const key = value[value.length - 1].toLowerCase();
                    dispatchKeyEvent(key); 
                    input.value = '';
                    lastInputTime = currentTime; 
                }
            });

            input.addEventListener('blur', () => {
                document.body.removeChild(input);
            });
        });
    }
}

function dispatchKeyEvent(key) {
    const normalizedKey = key.toLowerCase();
    const event = new KeyboardEvent('keydown', { key: normalizedKey });
    document.dispatchEvent(event);
}
