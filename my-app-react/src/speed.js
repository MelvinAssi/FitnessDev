document.addEventListener('keydown', function(event) {
    const video = document.querySelector('video');
    if (!video) return; // Vérifier si la vidéo existe

    if (event.key === 'ArrowRight') {
        incSpeed();
    }
    if (event.key === 'ArrowLeft') {
        decSpeed();
    }
    if (event.key === 'ArrowUp') {
        twoXSpeed();
    }
    if (event.key === 'ArrowDown') {
        halfSpeed();
    }
    if (event.key === ' ') {
        normalSpeed();
    }
});

function halfSpeed() {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = 0.5;
    }
}

function normalSpeed() {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = 1.0;
    }
}

function twoXSpeed() {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate = 2.0;
    }
}

function incSpeed() {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate += 0.1;
    }
}

function decSpeed() {
    const video = document.querySelector('video');
    if (video) {
        video.playbackRate -= 0.1;
    }
}