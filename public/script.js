// public/script.js

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

    const hello = () => {
        // Fetch datetime from the server
        fetch('/hello')
          .then(response => response.text())
          .then(hello => {
            // Update the HTML with the received datetime
            document.getElementById('hello').innerText = hello;
          })
          .catch(error => console.error('Error fetching text:', error));
      };
  
    // Function to update count
    const updateCount = () => {
      // Fetch count from the server
      fetch('/count')
        .then(response => response.json())
        .then(data => {
          // Update the HTML with the received count
          document.getElementById('number').innerText = data.count;
        })
        .catch(error => console.error('Error fetching count:', error));
    };
  
    // Set interval to update datetime every 1000 ms (1 second)
    setInterval(updateDatetime, 1000);
    setInterval(hello,2000);
    // Set interval to update count every 5000 ms (5 seconds)
    setInterval(updateCount, 5000);
  
    // Add event listener to the "More" button
    const moreButton = document.getElementById('moreButton');
    moreButton.addEventListener('click', () => {
      // Increment the number and update the HTML
      const numberElement = document.getElementById('number');
      const currentNumber = parseInt(numberElement.innerText, 10);
      const newNumber = currentNumber + 1;
      numberElement.innerText = newNumber;
  
      // Send the updated number to the server
      fetch('/updateNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: newNumber }),
      })
      .then(response => response.json())
      .then(data => console.log('Number updated successfully:', data))
      .catch(error => console.error('Error updating number:', error));
    });
  });
  