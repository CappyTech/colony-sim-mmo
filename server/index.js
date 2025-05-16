// server/index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const useragent = require('express-useragent');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
require('dotenv').config();
const logger = require('./services/loggerService');
const packageJson = require('../package.json');
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set('layout', 'layout');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));

const vendorPackages = ['bootstrap', 'bootstrap-icons', '@popperjs/core'];
vendorPackages.forEach(pkg => {
    app.use(`/resources/${pkg}`, express.static(path.join(__dirname, `node_modules/${pkg}`)));
});

app.use(useragent.express());

app.use(require('./services/securityService'));
app.use(require('./services/sessionService'));
app.use(flash());
app.use(require('./services/rateLimiterService'));

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

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  next();
});

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Register the error handler
app.use(require('./services/errorHandlerService'));

if (process.env.NODE_ENV === 'development') {
  app.listen(80, '127.0.0.1', () => {
      logger.info(`Server is running development`);
  });
} else {
  app.listen(443, '0.0.0.0', () => {
      logger.info(`Server is running production`);
  });
}

module.exports = app;
