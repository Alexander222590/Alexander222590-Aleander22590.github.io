document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE FUNCTIONALITY ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preferences
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    // --- VIDEO MODAL POPUP ENGINE ---
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeModal = document.querySelector('.close-modal');
    const trailerButtons = document.querySelectorAll('.watch-trailer-btn');

    trailerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Stop propagation in case cards have internal links later
            e.stopPropagation(); 
            const videoUrl = button.getAttribute('data-video');
            if (videoUrl) {
                videoPlayer.src = videoUrl;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Stop page scrolling
            }
        });
    });

    closeModal.addEventListener('click', closeVideoModal);
    
    // Close modal if user clicks outside the video frame box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    function closeVideoModal() {
        modal.style.display = 'none';
        videoPlayer.src = ''; // Clear source to kill video playback/audio
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});
