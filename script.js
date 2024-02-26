let isPlaying = false;
let currentSongIndex = 0;
const audioElement = document.getElementById('myAudio');
const seekBar = document.querySelector('.seek-bar');
const coverArtElement = document.getElementById('coverArt');
const songQueue = [
  { src: "01-taylor_swift-ready_for_it.mp3", cover: 'reputation.jpg', title: "...Ready For It?" },
  { src: "02-taylor_swift-end_game_(feat_ed_sheeran_and_future).mp3", cover: 'reputation.jpg', title: "End Game (feat. Ed Sheeran and Future)" },
  { src: "03-taylor_swift-i_did_something_bad.mp3", cover: 'reputation.jpg', title: "I Did Something Bad" },
  { src: "04-taylor_swift-dont_blame_me.mp3", cover: 'reputation.jpg', title: "Dont Blame Me" },
  { src: "05-taylor_swift-delicate.mp3", cover: 'reputation.jpg', title: "Delicate" },
  { src: "06-taylor_swift-look_what_you_made_me_do.mp3", cover: 'reputation.jpg', title: "Look What You Made Me Do" },
  { src: "07-taylor_swift-so_it_goes.mp3", cover: 'reputation.jpg', title: "So It Goes" },
  { src: "08-taylor_swift-gorgeous.mp3", cover: 'reputation.jpg', title: "Gorgeous" },
  { src: "09-taylor_swift-getaway_car.mp3", cover: 'reputation.jpg', title: "Getaway Car" },
  { src: "10-taylor_swift-king_of_my_heart.mp3", cover: 'reputation.jpg', title: "King of My Heart" },
  { src: "11-taylor_swift-dancing_with_our_hands_tied.mp3", cover: 'reputation.jpg', title: "Dancing With Our Hands Tied" },
  { src: "12-taylor_swift-dress.mp3", cover: 'reputation.jpg', title: "Dress" },
  { src: "13-taylor_swift-this_is_why_we_cant_have_nice_things.mp3", cover: 'reputation.jpg', title: "This Is Why We Cant Have Nice Things" },
  { src: "14-taylor_swift-call_it_what_you_want.mp3", cover: 'reputation.jpg', title: "Call It What You Want" },
  { src: "15-taylor_swift-new_years_day.mp3", cover: 'reputation.jpg', title: "New Years Day" },
  

] 
const playPauseButton = document.querySelector('.play-pause');

function togglePlayPause() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseButton.textContent = 'Pause';
    audioElement.play();
  } else{
    playPauseButton.textContent = 'Play';
    audioElement.pause();
  }
}



audioElement.addEventListener('ended', playNext);

let isShuffleMode = false;
let shuffledQueue = [];

function toggleShuffleMode() {
  isShuffleMode = !isShuffleMode;

  if (isShuffleMode) {
    shuffledQueue = shuffleArray([...songQueue]);
    document.querySelector('.shuffle').textContent = 'Shuffle: On';
  } else {
    shuffledQueue = [];
    document.querySelector('.shuffle').textContent = 'Shuffle: Off';
  }

  updateQueue();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playNext() {
  if (isShuffleMode) {
    if (shuffledQueue.length === 0) {
      shuffledQueue = shuffleArray([...songQueue]);
    }
    currentSongIndex = songQueue.indexOf(shuffledQueue.shift());
  } else {
    currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  }

  // Update play/pause button text based on playback state
  const playPauseButton = document.querySelector('.play-pause');

  // Check if the audio is paused, update button text accordingly
  if (audioElement.paused) {
    playPauseButton.textContent = 'Play';
  } else {
    playPauseButton.textContent = 'Pause';
  }

  playCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
  playCurrentSong();
}

const currentSongTitleElement = document.getElementById('currentSongTitle');

function playCurrentSong() {
  const currentSong = songQueue[currentSongIndex];
  audioElement.src = currentSong.src;
  coverArtElement.src = currentSong.cover;
  currentSongTitleElement.textContent = currentSong.title; // Display the title
  audioElement.play();
  updateQueue();
}

function updateQueue() {
  const songQueueElement = document.getElementById('songQueue');
  songQueueElement.innerHTML = '';

  const displayQueue = isShuffleMode ? shuffledQueue : songQueue;

  displayQueue.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title}`;
    if (isShuffleMode && currentSongIndex === songQueue.indexOf(song)) {
      listItem.classList.add('current-song-shuffle');
    } else if (!isShuffleMode && currentSongIndex === index) {
      listItem.classList.add('current-song');
    }
    songQueueElement.appendChild(listItem);
  });
}


function handleQueueItemClick(event) {
  console.log('Queue item clicked!');
  // ... (rest of the function)
}



// ... (rest of the code)



// ... (rest of the code)


function updateSeekBar(value) {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = (value / 100) * duration;

  audioElement.currentTime = currentTime;
  currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;



  seekBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
});

// ... (previous JavaScript code)

const totalTimeElement = document.querySelector('.total-time');

audioElement.addEventListener('loadedmetadata', updateTotalTime);

function updateTotalTime() {
  const totalMinutes = Math.floor(audioElement.duration / 60);
  const totalSeconds = Math.floor(audioElement.duration % 60);
  totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// ... (rest of the JavaScript code)


// Optional: Auto-play the first song on page load
window.addEventListener('load', () => {
  playCurrentSong();
});

