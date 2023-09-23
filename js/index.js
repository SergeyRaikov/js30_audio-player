window.onload = function () {
  playOrPausePlayListItems();
};

const pageBackGroung = document.querySelector('.back-ground');
const playerBackGround = document.querySelector('.player__bg');
const songTitleNode = document.querySelector('.song-title');
const playerNode = document.querySelector('.player');
const prevBtnNode = document.querySelector('.play-prev');
const playBtnNode = document.querySelector('.play');
const itemPlayBtnNode = document.querySelector('.play-item');
const pauseBtnNode = document.querySelector('.pause');

const nextBtnNode = document.querySelector('.play-next');
const playListNode = document.querySelector('.play-list');
const playItemNode = document.querySelectorAll('.play-item');
const audioNode = document.querySelector('.play-list__audio');

const volumeNode = document.querySelector('.volume');
const volumeIconNode = document.querySelector('.volume-mute-icon');
const progressNode = document.querySelector('.progress');
const durationInfoNode = document.querySelector('.duration');
const trackCurentTimeNode = document.querySelector('.timer');

// Список воспроизведения
const tracks = [
  'Король И Шут - Я жив покуда я верю в чудо',
  'Король И Шут - Лесник',
  'Король И Шут - Охотник',
  'Король и Шут - Проклятый старый дом',
];
const listOfBg = [
  './assets/img/gorshok1.jpg',
  './assets/img/gorshok2.jpg',
  './assets/img/gorshok3.jpg',
  './assets/img/gorshok4.jpg',
];

// Трек по умолчанию
let trackIndex = 0;

const loadTrack = (track) => {
  audioNode.src = `./assets/audio/${track}.mp3`;
};

const playTrack = () => {
  playerNode.classList.add('js-play');
  loadTrack(tracks[trackIndex]);
  audioNode.play();
  changePlayItemIcon();
  playBtnNode.style.backgroundImage = 'url(./assets/img/controls/pause.svg)';
  songTitleNode.textContent = `${trackIndex + 1}.${tracks[trackIndex]}`;
  pageBackGroung.src = listOfBg[trackIndex];
  playerBackGround.src = listOfBg[trackIndex];
  playerBackGround.classList.add('scaled');
  selectPlayListItems();
};
// последовательное воспроизведение
audioNode.addEventListener('ended', switchNextTrack);
// смена проигрывания (паузы) в плейлисте
const playOrPausePlayListItems = () => {
  playListNode.addEventListener('click', (event) => {
    const isPlayingItem = event.target.classList.contains('paused-item');
    const currentItem = event.target.textContent;
    const selectedTrackIndex = tracks.indexOf(currentItem);
    if (!isPlayingItem) {
      loadTrack(tracks[selectedTrackIndex]);
      audioNode.play();
      playItemNode.forEach((elem) => {
        elem.classList.remove('paused-item');
        playBtnNode.style.backgroundImage =
          'url(./assets/img/controls/pause.svg)';
      });
      playItemNode[selectedTrackIndex].classList.add('paused-item');
      songTitleNode.textContent = `${selectedTrackIndex + 1}.   ${
        tracks[selectedTrackIndex]
      }`;
    } else {
      item.classList.add('play-item_active');
      playItemNode.forEach((elem) => {
        elem.classList.remove('paused-item');
      });
      pauseTrack();
    }
  });
};
// выделение текущего трека
const selectPlayListItems = () => {
  playItemNode.forEach((item) => {
    if (tracks[trackIndex] === item.textContent) {
      item.classList.add('play-item_active');
    } else {
      item.classList.remove('play-item_active');
    }
  });
};
pauseTrack = () => {
  playerNode.classList.remove('js-play');
  playerBackGround.classList.remove('scaled');
  audioNode.pause();
  playBtnNode.style.backgroundImage = 'url(./assets/img/controls/play.svg)';
  playItemNode[trackIndex].classList.remove('paused-item');
};
// включение и остановка воспроизведения
playBtnNode.addEventListener('click', () => {
  const isPlaying = playerNode.classList.contains('js-play');
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// следующий трек
nextBtnNode.addEventListener('click', switchNextTrack);
function switchNextTrack() {
  trackIndex++;
  if (trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }

  loadTrack(tracks[trackIndex]);
  changePlayItemIcon();
  playTrack();
}

// предидущий трек
prevBtnNode.addEventListener('click', switchPrevTrack);
function switchPrevTrack() {
  if (trackIndex >= 0) {
    trackIndex--;
  }
  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }
  loadTrack(tracks[trackIndex]);
  changePlayItemIcon();
  playTrack();
}

function changePlayItemIcon() {
  playItemNode.forEach((elem) => {
    elem.classList.remove('paused-item');
  });
  playItemNode[trackIndex].classList.add('paused-item');
}

// Volume
const IsMuted = () => {
  console.log();
  if (audioNode.volume === 0) {
    console.log(audioNode.volume);
    setMute();
  }
};

function setVolume() {
  let volume = this.value;
  audioNode.volume = volume / 100;
}

document.querySelector('.volume').oninput = setVolume;

// Mute
audioNode.addEventListener('volumechange', () => {
  if (audioNode.volume === 0) {
    volumeIconNode.classList.add('volume-muted');
  }
  if (audioNode.volume > 0) {
    volumeIconNode.classList.remove('volume-muted');
  }
});
volumeIconNode.addEventListener('click', setMute);

function setMute() {
  volumeIconNode.classList.toggle('volume-muted');
  const isMute = volumeIconNode.classList.contains('volume-muted');
  if (isMute) {
    audioNode.volume = 0;
    volumeNode.value = 0;
  }
  if (!isMute) {
    audioNode.volume = 0.5;
    volumeNode.value = 50;
  }
}
function setUnMute() {
  volumeIconNode.classList.remove('volume-muted');
  audioNode.volume = 0.5;
  volumeNode.value = 50;
}
// Progress bar update
const progressUpdate = () => {
  const time = audioNode.currentTime;
  const duration = audioNode.duration;
  const timeMinutes = parseInt(time / 60);
  const timeSeconds =
    Math.floor(time % 60) < 10
      ? '0' + Math.floor(time % 60)
      : Math.floor(time % 60);
  const durationMinutes = parseInt(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  const progress = (100 * time) / duration;

  progressNode.value = progress;
  trackCurentTimeNode.textContent = `${timeMinutes}:${timeSeconds}`;
  durationInfoNode.textContent = `${durationMinutes}:${durationSeconds}`;
};
audioNode.ontimeupdate = progressUpdate;
const rewindTrack = () => {
  const progressBarWidth = progressNode.offsetWidth;
  const trackDuration = audioNode.duration;

  const currentPositionOfProgressBar = event.offsetX;
  const rewindedWidth =
    progressBarWidth - (progressBarWidth - currentPositionOfProgressBar);
  const currentPlaybackTime =
    (trackDuration / progressBarWidth) * rewindedWidth;
  progressNode.value = currentPositionOfProgressBar;
  audioNode.currentTime = currentPlaybackTime;
};
progressNode.addEventListener('click', rewindTrack);
