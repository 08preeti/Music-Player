const audio = new Audio();

const songs = [
    {
        title: "Kulke Jeene Ka..",
        src: "songs/Kulke Jeene Ka...mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Nashe Si Chadh Gayi..",
        src: "songs/Nashe Si Chadh Gayi...mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Aaj Kal Zindagi",
        src: "songs/Aaj Kal Zindagi.mp3",
        cover: "images/cover3.jpg"
    },

    {
        title: "Iktara..",
        src: "songs/Iktara...mp3",
        cover: "images/cover4.jpg"
    },

    {
        title: "Ilahi..",
        src: "songs/Ilahi...mp3",
        cover: "images/cover5.jpg"
    },

    {
        title: "Love You Zindagi..",
        src: "songs/Love You Zindagi...mp3",
        cover: "images/cover6.jpg"
    }
];

let songIndex = 0;
let isPlaying = false;

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volumeIcon");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistItems = document.querySelectorAll(".playlist li");

loadSong(songIndex);

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    cover.src = songs[index].cover;

    playlistItems.forEach(li => li.classList.remove("active"));
    playlistItems[index].classList.add("active");
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
    document.querySelector(".player").classList.add("playing");
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
    document.querySelector(".player").classList.remove("playing");
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;

    if (volume.value == 0) volumeIcon.textContent = "🔇";
    else if (volume.value < 0.5) volumeIcon.textContent = "🔉";
    else volumeIcon.textContent = "🔊";
});

playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        songIndex = index;
        loadSong(songIndex);
        playSong();
    });
});

function formatTime(time) {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
