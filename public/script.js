$(document).ready(() => {
  const socket = io();

  let timer;
  let seconds = 0;
  let lapCounter = 1;

  function displayTime() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const displayString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    $('#display').text(displayString);
  }

  $('#start').click(() => {
    socket.emit('start');
    timer = setInterval(() => {
      seconds++;
      displayTime();
    }, 1000);
  });

  $('#stop').click(() => {
    socket.emit('stop');
    clearInterval(timer);
  });

  $('#reset').click(() => {
    socket.emit('reset');
    clearInterval(timer);
    seconds = 0;
    lapCounter = 1;
    displayTime();
    $('#lapList').empty();
  });

  $('#lap').click(() => {
    const lapTime = $('#display').text();
    $('#lapList').append(`<li>Lap ${lapCounter}: ${lapTime}</li>`);
    lapCounter++;
  });

  socket.on('start', () => {
    clearInterval(timer);
    timer = setInterval(() => {
      seconds++;
      displayTime();
    }, 1000);
  });

  socket.on('stop', () => {
    clearInterval(timer);
  });

  socket.on('reset', () => {
    clearInterval(timer);
    seconds = 0;
    lapCounter = 1;
    displayTime();
    $('#lapList').empty();
  });
});
