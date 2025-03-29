const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up EJS as the view engine and set views folder
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Render the EJS template for the home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Colony Sim MMO' });
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for a custom event (e.g., "gatherResource")
  socket.on('gatherResource', (data) => {
    console.log(`Resource gathered: ${data.resource}`);
    // Emit a response back to the client
    socket.emit('resourceUpdate', { resource: data.resource, amount: 1 });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = 80;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
