// server.js

const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS)
app.use(express.static('public'));

// Define a route to handle the datetime request
app.get('/datetime', (req, res) => {
  const currentDatetime = new Date().toLocaleString();
  res.send(currentDatetime);
});

app.get('/hello', (req, res) => {
  res.send("hello world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
