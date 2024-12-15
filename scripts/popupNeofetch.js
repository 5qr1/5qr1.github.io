function detectOS() {
    const platform = navigator.platform.toLowerCase();

    if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) {
        updateAsciiArt('apple');
        return 'macOS/iOS';
    }

    if (platform.includes('win')) {
        updateAsciiArt('windows');
        return 'Windows';
    }

    updateAsciiArt('linux');
    return navigator.platform;
}

function updateAsciiArt(os) {
    const asciiLines = {
        linux: [
            "   ___      ",
            "  (.. \\     ",
            "  (<>  )    ",
            " //  \\ \\    ",
            "( |  | /|   ",
            "/\\ __)/_)   ",
            "\\/-____\\/   "
        ],
        apple: [
            "        .:'      ",
            "    __ :'__      ",
            " .'`__`-'__``.   ",
            ":__________.-'   ",
            ":_________:      ",
            " :_________`-;   ",
            "  `.__.-.__.'    "
        ],
        windows: [
            "lllllll  lllllll  ",
            "lllllll  lllllll  ",
            "lllllll  lllllll  ",
            "                  ",
            "lllllll  lllllll  ",
            "lllllll  lllllll  ",
            "lllllll  lllllll  "
        ]
    };

    const lines = asciiLines[os] || asciiLines['linux']; 

    for (let i = 0; i < 7; i++) {
        const lineElement = document.getElementById(`line${i + 1}`);
        if (lineElement) {
            lineElement.textContent = lines[i] || ''; 
        }
    }
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    const browserInfo = userAgent.match(/(firefox|chrome|safari|edge|opera|brave)\/?\s*(\d+)/i) || [];
    return `${browserInfo[1] || 'Unknown'} ${browserInfo[2] || ''}`;
}

function detectBrowserEngine() {
    const userAgent = navigator.userAgent.toLowerCase();

    const engine = userAgent.includes('webkit')
        ? 'WebKit'
        : userAgent.includes('gecko')
        ? 'Gecko'
        : userAgent.includes('trident')
        ? 'Trident'
        : userAgent.includes('blink')
        ? 'Blink'
        : 'Unknown';

    const versionMatch = userAgent.match(/applewebkit\/([\d.]+)/) || [];
    const version = versionMatch[1] || 'N/A';

    return `${engine} ${version}`;
}

function detectSearchEngine() {
    const referrer = document.referrer.toLowerCase();

    if (referrer.includes('google.com')) return 'Google';
    if (referrer.includes('bing.com')) return 'Bing';
    if (referrer.includes('yahoo.com')) return 'Yahoo';
    if (referrer.includes('duckduckgo.com')) return 'DuckDuckGo';
    if (referrer.includes('qwant.com')) return 'Qwant';
    if (referrer.includes('baidu.com')) return 'Baidu';
    if (referrer.includes('yandex.com')) return 'Yandex';

    return 'Unknown';
}

function updateSystemInfo() {
    const osLine = document.getElementById('os-line');
    const browserLine = document.getElementById('browser-line');
    const engineLine = document.getElementById('engine-line');
    const searchEngineLine = document.getElementById('search-engine-line');

    if (osLine) osLine.textContent = detectOS();
    if (browserLine) browserLine.textContent = detectBrowser();
    if (engineLine) engineLine.textContent = detectBrowserEngine();
    if (searchEngineLine) searchEngineLine.textContent = detectSearchEngine();
}

function togglePopupNeofetch() {
    const neofetchPopup = document.getElementById('neofetch-popup');

    if (neofetchPopup.style.display === 'none' || neofetchPopup.style.display === '') {
        neofetchPopup.style.display = 'block';
        updateSystemInfo(); 
    } else {
        neofetchPopup.style.display = 'none';
    }
}

let isDragging = false;
let offsetX, offsetY;
const neofetchPopup = document.getElementById('neofetch-popup');

neofetchPopup.addEventListener('mousedown', function (event) {
    if (event.target !== neofetchPopup) {
        isDragging = true;
        offsetX = event.clientX - neofetchPopup.getBoundingClientRect().left;
        offsetY = event.clientY - neofetchPopup.getBoundingClientRect().top;
        document.body.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', function (event) {
    if (isDragging) {
        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;
        newLeft = Math.max(0, Math.min(window.innerWidth - neofetchPopup.offsetWidth, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - neofetchPopup.offsetHeight, newTop));
        neofetchPopup.style.left = newLeft + 'px';
        neofetchPopup.style.top = newTop + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.cursor = '';
});

export { togglePopupNeofetch };
