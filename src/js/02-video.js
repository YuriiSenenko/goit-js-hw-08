import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlayVideo, 1000));

let pause;

//Поточний час зберігаю в сховище
function onPlayVideo(event) {
  pause = event.seconds;
  localStorage.setItem('videoplayer-current-time', pause);
}

// Витягую збережений час із сховища
const saveCurrentTime = localStorage.getItem('videoplayer-current-time');

// Встановлення збереженого часу для відновлення відео
player
  .setCurrentTime(saveCurrentTime)
  .then(function () {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
