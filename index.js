const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');
const { Server } = require('socket.io');
const chokidar = require('chokidar');
const { Howl, Howler } = require('howler');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Config file path
const configPath = path.join(__dirname, '.env');

// MongoDB setup
let VisitCount;
let IPVisit;
let isMongoConnected = false;

async function connectMongoDB() {
  try {
    const config = fs.readJsonSync(configPath);
    if (config.integrations?.database?.mongodb?.enabled) {
      const mongoUri = config.integrations.database.mongodb.uri;
      await mongoose.connect(mongoUri);
      console.log('✓ Connected to MongoDB');
      
      // Define Visit Count Schema
      const visitCountSchema = new mongoose.Schema({
        siteName: { type: String, required: true, unique: true },
        count: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now }
      });

      // Define IP Visit Log Schema
      const ipVisitSchema = new mongoose.Schema({
        ip: { type: String, required: true },
        siteName: { type: String, required: true },
        visitDate: { type: Date, default: Date.now },
        userAgent: { type: String },
        country: { type: String }
      });

      // Create compound index for efficient IP lookups
      ipVisitSchema.index({ ip: 1, siteName: 1, visitDate: 1 });

      VisitCount = mongoose.model('VisitCount', visitCountSchema);
      IPVisit = mongoose.model('IPVisit', ipVisitSchema);
      isMongoConnected = true;
      
      // Initialize counter if doesn't exist
      await VisitCount.findOneAndUpdate(
        { siteName: 'akryst-bio' },
        { $setOnInsert: { count: 0 } },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.warn('MongoDB connection failed:', error.message);
    console.log('Continuing without MongoDB...');
    isMongoConnected = false;
  }
}

// Watch for changes in the config file
const watcher = chokidar.watch(configPath, {
  persistent: true,
  ignoreInitial: true
});

watcher.on('change', async () => {
  try {
    const config = await fs.readJson(configPath);
    io.emit('config-updated', config);
    console.log('Configuration updated, notifying clients');
  } catch (error) {
    console.error('Error reading updated config:', error);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] SYSTEM BOOT COMPLETE

> akryst-bio-server --port ${PORT} --mode production
✓ MongoDB status: ${isMongoConnected ? 'CONNECTED' : 'CHECKING'}

🌍 Server accessible at: http://localhost:${PORT}

Ready for connections...`);
});
