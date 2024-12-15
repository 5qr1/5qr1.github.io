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
            const focusableDiv = document.createElement('div');
            focusableDiv.tabIndex = 0; 
            focusableDiv.style.position = 'absolute';
            focusableDiv.style.top = '0';
            focusableDiv.style.left = '-9999px';
            focusableDiv.style.height = '1px';
            focusableDiv.style.width = '1px';
            document.body.appendChild(focusableDiv);
            focusableDiv.focus(); 
            focusableDiv.addEventListener('keydown', (event) => {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: event.key }));
            });
            focusableDiv.addEventListener('blur', () => {
                document.body.removeChild(focusableDiv);
            });
        });
    }
}
