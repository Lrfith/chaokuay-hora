const images = [
    './img/BG01.png',
    './img/BG02.png',
    './img/BG03.png',
    './img/BG04.png',
    './img/BG05.png'
];

let previousIndex = -1;

function changeBackgroundAutomatically() {
    setInterval(() => {
        let randomIndex;

        // Ensure randomIndex is not the same as previousIndex
        do {
            randomIndex = Math.floor(Math.random() * images.length);
        } while (randomIndex === previousIndex);

        previousIndex = randomIndex;

        // Set new background
        const randomImage = images[randomIndex];
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${randomImage})`;
    }, 15000); // Change every 15 seconds
}

// Start background slide
changeBackgroundAutomatically();
