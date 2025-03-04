const playButtons = document.querySelectorAll(".play-button");
const audioPlayer = document.getElementById("audio-player");
let currentPlaying = null;

playButtons.forEach(button => {
    button.addEventListener("click", function () {
        const songElement = this.closest(".song");
        let songSrc = songElement.getAttribute("data-src");

        if (!songSrc) {
            console.error("Atribut data-src tidak ditemukan!");
            return;
        }

        songSrc = encodeURI(songSrc);

        // Jika lagu yang sama sedang dimainkan, toggle play/pause
        if (audioPlayer.src.includes(songSrc)) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                this.innerHTML = "⏸";
            } else {
                audioPlayer.pause();
                this.innerHTML = "▶";
            }
        } else {
            // Ganti lagu baru
            audioPlayer.src = songSrc;
            audioPlayer.play();

            resetButtons();
            this.innerHTML = "⏸";
            currentPlaying = this;
        }
    });
});

// Reset tombol saat lagu berhenti
audioPlayer.addEventListener("ended", function () {
    if (currentPlaying) {
        currentPlaying.innerHTML = "▶";
    }
});

// Fungsi untuk mereset tombol Play
function resetButtons() {
    playButtons.forEach(button => {
        button.innerHTML = "▶";
    });
}
