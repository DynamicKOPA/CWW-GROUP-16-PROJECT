const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
var audio1 = document.getElementById("audio1");
var slider1 = document.getElementById("slider1");
var display1 = document.getElementById("display1");
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Ebenezeri',
    artist: 'Kent Edunjobi & Apex Choir Ft EmmaOMG',
    coverPath: 'image/M1.jfif',
    discPath: 'music/Kent_Edunjobi_Apex_Choir_ft_EmmaOMG_-_Ebenezeri.mp3',
    duration: '4:54',
  },
  {
    title: 'Benediction',
    artist: 'Dunsin Oyekan',
    coverPath: 'image/M3.jfif',
    discPath: 'music/Dunsin_Oyekan_-_Benediction.mp3',
    duration: '13:29',
  },
  {
    title: 'Lonely at the top',
    artist: 'Asake',
    coverPath: 'image/avatar.jpeg',
    discPath: 'music/Asake-Lonely-At-The-Top-(JustNaija.com).mp3',
    duration: '2:37',
  },
  {
    title: 'Abogun Ni',
    artist: 'Adeyinka Alaseyori',
    coverPath: 'image/cover.jpg',
    discPath: 'music/Adeyinka-Aleseyori-Abogun-Ni.mp3',
    duration: '6:58',
  },
  {
    title: 'Tobechukwu',
    artist: 'Adeyinka Alaseyori',
    coverPath: 'image/cover2.jpg',
    discPath: 'music/Nathaniel-Bassey-Ft-Mercy-Chinwo-Tobechukwu-(TrendyBeatz.com).mp3',
    duration: '8:06',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}
// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}
// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}
function setVolume(id, value) {
  var audio = document.getElementById(`sound${id}`);
  audio.volume = value / 100;
};

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);

