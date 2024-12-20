let isDragging = false;
let offsetX, offsetY;
let touchTimeout = null; 

const blogPopup = document.getElementById('blog-popup');
const blogButtons = document.querySelectorAll('.blog-btn');

export function togglePopupBlog() {
    console.log('Toggling popup visibility...');
    if (blogPopup.style.display === 'none' || blogPopup.style.display === '') {
        blogPopup.style.display = 'block';
    } else {
        blogPopup.style.display = 'none';
    }
}

function startDrag(event) {
    const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    const clientY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;

    isDragging = true;
    offsetX = clientX - blogPopup.getBoundingClientRect().left;
    offsetY = clientY - blogPopup.getBoundingClientRect().top;
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

    newLeft = Math.max(0, Math.min(window.innerWidth - blogPopup.offsetWidth, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - blogPopup.offsetHeight, newTop));

    blogPopup.style.left = newLeft + 'px';
    blogPopup.style.top = newTop + 'px';
}

function endDrag() {
    isDragging = false;
    document.body.style.cursor = '';
}

blogPopup.addEventListener('mousedown', startDrag);
blogPopup.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', doDrag);
document.addEventListener('touchmove', doDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

window.addEventListener('load', () => {
    blogButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const markdownFile = button.getAttribute('data-markdown');
            document.getElementById('markdown-popup').style.display = 'block';
            import('./popupMarkdown.js').then(module => {
                module.showMarkdownPopup(markdownFile); 
            }).catch(error => {
                console.error('Error importing popupMarkdown.js:', error);
            });
        });

        button.addEventListener('touchstart', function(event) {
            touchTimeout = setTimeout(() => {
                const markdownFile = button.getAttribute('data-markdown');
                document.getElementById('markdown-popup').style.display = 'block';
                import('./popupMarkdown.js').then(module => {
                    module.showMarkdownPopup(markdownFile); 
                }).catch(error => {
                    console.error('Error importing popupMarkdown.js:', error);
                });
            }, 200);  
        });

        button.addEventListener('touchend', function(event) {
            if (touchTimeout) {
                clearTimeout(touchTimeout);
                touchTimeout = null;
            } else {
                const markdownFile = button.getAttribute('data-markdown');
                document.getElementById('markdown-popup').style.display = 'block';
                import('./popupMarkdown.js').then(module => {
                    module.showMarkdownPopup(markdownFile); 
                }).catch(error => {
                    console.error('Error importing popupMarkdown.js:', error);
                });
            }
        });
    });
});
