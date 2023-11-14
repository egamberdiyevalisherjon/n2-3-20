let timelineActual = document.querySelector(".timeline .actual");
let timelineCurrent = document.querySelector(".timeline .current");
let likeBtn = document.querySelector(".like-btn");
let volumeBtn = document.querySelector(".volume-btn");
let repeatBtn = document.querySelector(".repeat-btn");
let ppBtn = document.querySelector(".pp-btn");
let fFast = document.querySelector(".next-btn");
let bFast = document.querySelector(".prev-btn");
let updateCurrentTimeId;
let loop = false;

let music = new Audio("/audios/music.m4a");

music.onloadeddata = () => {
  let minutes = Math.floor(music.duration / 60)
    .toString(10)
    .padStart(2, 0);
  let seconds = Math.floor(music.duration % 60)
    .toString(10)
    .padStart(2, 0);
  timelineActual.innerHTML = minutes + ":" + seconds;
};

likeBtn.addEventListener("click", () => {
  if (likeBtn.classList.contains("active")) {
    likeBtn.classList.remove("active");
    likeBtn.children[0].classList.remove("fa-solid");
    likeBtn.children[0].classList.add("fa-regular");
  } else {
    likeBtn.children[0].classList.remove("fa-regular");
    likeBtn.children[0].classList.add("fa-solid");
    likeBtn.classList.add("active");
  }
});

volumeBtn.addEventListener("click", () => {
  let state = volumeBtn.children[0].classList[1];
  if (state.includes("high")) {
    volumeBtn.children[0].classList.replace("fa-volume-high", "fa-volume-low");
    music.volume = 0.5;
  } else if (state.includes("low")) {
    volumeBtn.children[0].classList.replace("fa-volume-low", "fa-volume-xmark");
    music.volume = 0;
  } else {
    volumeBtn.children[0].classList.replace(
      "fa-volume-xmark",
      "fa-volume-high"
    );
    music.volume = 1;
  }
});

repeatBtn.addEventListener("click", () => {
  loop = !loop;
  repeatBtn.classList.toggle("active");
});

const displayCurrentTime = () => {
  let minutes = Math.floor(music.currentTime / 60)
    .toString(10)
    .padStart(2, 0);
  let seconds = Math.floor(music.currentTime % 60)
    .toString(10)
    .padStart(2, 0);
  timelineCurrent.innerHTML = minutes + ":" + seconds;
};

fFast.addEventListener("click", () => {
  music.currentTime += 50;
  displayCurrentTime();
});

bFast.addEventListener("click", () => {
  music.currentTime -= 5;
  displayCurrentTime();
});

ppBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    ppBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    updateCurrentTimeId = setInterval(displayCurrentTime, 1000);
  } else {
    music.pause();
    ppBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(updateCurrentTimeId);
  }
});

music.onended = () => {
  ppBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  clearInterval(updateCurrentTimeId);

  if (loop) {
    ppBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    music.currentTime = 0;
    updateCurrentTimeId = setInterval(displayCurrentTime, 1000);
    music.play();
  }
};

// let music = new Audio("/audios/music.m4a");
// music.paused;
// music.duration;
// music.currentTime;
// music.volume;
// music.play();
// music.pause();
// music.onended = () => {};
// music.onloadeddata = () => {};
