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
    }, 10);
    disableButton('#start');
  });

  $('#stop').click(() => {
    socket.emit('stop');
    clearInterval(timer);
    milliseconds += performance.now() - startTime;
    enableButton('#start');
  });

  $('#reset').click(() => {
    socket.emit('reset');
    clearInterval(timer);
    milliseconds = 0;
    startTime = performance.now();
    lapCounter = 1;
    displayTime();
    $('#lapList').empty();
    enableButton('#start');
  });

  $('#lap').click(() => {
    const lapTime = $('#display').text();
    $('#lapList').append(`<li>รอบที่ ${lapCounter}: ${lapTime}</li>`);
    lapCounter++;
  });

  socket.on('start', () => {
    clearInterval(timer);
    startTime = performance.now();
    timer = setInterval(() => {
      displayTime();
    }, 10);
    disableButton('#start');
  });

  socket.on('stop', () => {
    clearInterval(timer);
    milliseconds += performance.now() - startTime;
    enableButton('#start');
  });

  socket.on('reset', () => {
    clearInterval(timer);
    milliseconds = 0;
    startTime = performance.now();
    lapCounter = 1;
    displayTime();
    $('#lapList').empty();
    enableButton('#start');
  });

  function disableButton(buttonId) {
    $(buttonId).prop('disabled', true);
  }

  function enableButton(buttonId) {
    $(buttonId).prop('disabled', false);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Function to update datetime
  const updateDatetime = () => {
    // Fetch datetime from the server
    fetch('/datetime')
      .then(response => response.text())
      .then(datetime => {
        // Update the HTML with the received datetime
        document.getElementById('datetime').innerText = datetime;
      })
      .catch(error => console.error('Error fetching datetime:', error));
  };
  setInterval(updateDatetime);
})
