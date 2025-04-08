// server/index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (if any)
app.use(express.static(path.join(__dirname, '../client')));

// Set up EJS as the view engine (assumes views folder exists)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Import and mount the auth routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Import and mount the API routes under /api/v1
const apiRoutes = require('./routes/api');
app.use('/api/v1', apiRoutes);

// Initialize database models
const db = require('./models/init');

// Global active players set (stores player IDs)
global.activePlayerIds = new Set();

// Import and start the game loop
const startGameLoop = require('./gameLoop');
startGameLoop(io); // Pass the io instance if you plan to emit updates

// Set up Socket.IO connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // (Place additional socket event handlers here if needed)
  // We are using server/sockets/
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Sync database and start the server
const PORT = 80;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
