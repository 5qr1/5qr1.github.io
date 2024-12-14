const audioPool = [
    "audio/ArrowRootMFDOOM.mp3",
    "audio/BergamotWildMFDOOM.mp3",
    "audio/ItsYourWorld.mp3",
    "audio/NasIsLikeNASInstrumental.mp3"
];

const textPool = [
    "i am not a very good writer",
    "how do i write javascript",
    "does anyone read these lol",
    "theres no hidden room below the igloos",
    "read about useless shit 4 free"
];

const blogPostsPool = [
    { title: "this is not a real link", link: "blog/UNReal.html" },
    { title: "nor is this", link: "blog/nope.html" },
    { title: "whatchu think i am", link: "blog/fake.html" }
];

const audio = document.getElementById('background-audio');

let currentAudioIndex = 0;

function pickRandomTrack() {
    return audioPool[Math.floor(Math.random() * audioPool.length)];
}

function playRandomTrack() {
    audio.src = pickRandomTrack();
    audio.play();
}

function displayRandomText() {
    const randomText = textPool[Math.floor(Math.random() * textPool.length)];
    document.getElementById('random-text').textContent = randomText;
}

function displayBlogPosts() {
    const blogList = document.getElementById('blog-list');
    blogPostsPool.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = post.link;
        a.textContent = post.title;
        li.appendChild(a);
        blogList.appendChild(li);
    });
}

window.onload = function() {
    playRandomTrack();
    displayRandomText();
    displayBlogPosts();
    window.scrollTo(0, 0);
};

audio.addEventListener('ended', playRandomTrack);

document.body.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    }
});

const containerMain = document.querySelector('.spacey-container .star-container');
const containerBlog = document.querySelector('#blog-section .star-container');
const blogSection = document.querySelector('#blog-section');

function createStars(container, numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        container.appendChild(star);
    }
}

createStars(containerMain, 500);
createStars(containerBlog, 500);

audio.volume = 0.5;

function goToBlog() {
    blogSection.classList.add('active');
    blogSection.classList.remove('hidden');
}

function goHome() {
    blogSection.classList.add('hidden');
    blogSection.classList.remove('active');
}

document.addEventListener('keydown', function(event) {
    const keybindsPopup = document.getElementById('keybinds-popup');
    
    if (event.key === 'q') {
        currentAudioIndex = (currentAudioIndex - 1 + audioPool.length) % audioPool.length;
        audio.src = audioPool[currentAudioIndex];
        audio.play();
    } else if (event.key === 'w') {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    } else if (event.key === 'e') {
        currentAudioIndex = (currentAudioIndex + 1) % audioPool.length;
        audio.src = audioPool[currentAudioIndex];
        audio.play();
    } else if (event.key === 'h') {
        if (keybindsPopup.style.display === 'none' || keybindsPopup.style.display === '') {
            keybindsPopup.style.display = 'block';
        } else {
            keybindsPopup.style.display = 'none';
        }
    }
});
