$(document).ready(() => {
  const socket = io();

  let startTime;
  let timer;
  let milliseconds = 0;
  let lapCounter = 1;

  function displayTime() {
    const elapsedMilliseconds = performance.now() - startTime + milliseconds;
    const hours = Math.floor(elapsedMilliseconds / 3600000);
    const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
    const remainingMilliseconds = Math.floor(elapsedMilliseconds % 1000);

    const displayString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(remainingMilliseconds).padStart(3, '0')}`;
    $('#display').text(displayString);
  }

  $('#start').click(() => {
    socket.emit('start');
    startTime = performance.now();
    timer = setInterval(() => {
      displayTime();
    }, 10); // Adjust the interval to a more reasonable value, e.g., 10 milliseconds
  });

  $('#stop').click(() => {
    socket.emit('stop');
    clearInterval(timer);
    milliseconds += performance.now() - startTime;
  });

  $('#reset').click(() => {
    socket.emit('reset');
    clearInterval(timer);
    milliseconds = 0;
    startTime = performance.now(); // Reset the start time
    lapCounter = 0;
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
    startTime = performance.now();
    timer = setInterval(() => {
      displayTime();
    }, 10);
  });

  socket.on('stop', () => {
    clearInterval(timer);
    milliseconds += performance.now() - startTime;
  });

  socket.on('reset', () => {
    clearInterval(timer);
    milliseconds = 0;
    lapCounter = 1;
    displayTime();
    $('#lapList').empty();
  });
});
