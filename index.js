const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const ENV_PATH = path.join(__dirname, '.env');
const LOCK_PATH = path.join(__dirname, '.setup-complete');
const IMAGES_PATH = path.join(__dirname, 'public', 'assets', 'images');

if (!fs.existsSync(IMAGES_PATH)) fs.mkdirSync(IMAGES_PATH, { recursive: true });

const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, IMAGES_PATH),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '');
    const base = file.fieldname === 'profile' ? 'profile' : 'background';
    cb(null, `${base}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMAGE_MIME.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only image files are allowed (jpg, png, gif, webp)'));
  }
});

function isSetupComplete() {
  return fs.existsSync(LOCK_PATH);
}

function guardSetup(req, res, next) {
  if (isSetupComplete()) return res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
  next();
}

function buildEnvContent(data) {
  return [
    `NAME=${data.name || ''}`,
    `DESCRIPTION=${data.description || ''}`,
    `FOOTER=${data.footer || `Made with ❤️ by ${data.name || 'You'}`}`,
    `TIMEZONE=${data.timezone || 'America/New_York'}`,
    ``,
    `PROFILE_IMAGE=assets/images/${data.profileImageFile || 'profile.jpg'}`,
    `PROFILE_IMAGE_TYPE=${data.profileImageType || 'jpg'}`,
    ``,
    `WELCOME_SCREEN_ENABLED=${data.welcomeEnabled || 'true'}`,
    `WELCOME_TEXT=${data.welcomeText || 'Hey! Been trying to meet you.'}`,
    ``,
    `TWITTER=${data.twitter || 'off'}`,
    `LASTFM=${data.lastfmProfile || 'off'}`,
    `GITHUB=${data.github || 'off'}`,
    `OSU=${data.osu || 'off'}`,
    `VRCHAT=${data.vrchat || 'off'}`,
    `STEAM=${data.steam || 'off'}`,
    `INSTAGRAM=${data.instagram || 'off'}`,
    `TIKTOK=${data.tiktok || 'off'}`,
    `NAMEMC=${data.namemc || 'off'}`,
    `YOUTUBE=${data.youtube || 'off'}`,
    ``,
    `LASTFM_ENABLED=${data.lastfmEnabled || 'false'}`,
    `LASTFM_API_KEY=${data.lastfmApiKey || ''}`,
    `LASTFM_USERNAME=${data.lastfmUsername || ''}`,
    ``,
    `DISCORD_ENABLED=${data.discordEnabled || 'false'}`,
    `DISCORD_USER_ID=${data.discordUserId || ''}`,
    `DISCORD_UPDATE_INTERVAL=5000`,
    `DISCORD_USE_WEBSOCKET=true`,
    `DISCORD_SHOW_BADGES=true`,
    ``,
    `LOCATIONS_ENABLED=${data.locationsEnabled || 'false'}`,
    `LOCATION_INTERVAL=10000`,
    `FADE_TIME=1000`,
    `LOCATIONS=${data.locations || '["Home","Office"]'}`,
    ``,
    `BACKGROUND_TYPE=${data.backgroundType || 'image'}`,
    `BACKGROUND_VIDEO=assets/videos/background.mp4`,
    `BACKGROUND_IMAGE=assets/images/${data.backgroundImageFile || 'background.jpg'}`,
    `BACKGROUND_BLUR=${data.backgroundBlur || '20px'}`,
    `BACKGROUND_OPACITY=${data.backgroundOpacity || '0.3'}`,
    ``,
    `MUSIC_PLAYER_ENABLED=${data.musicEnabled || 'false'}`,
    `MUSIC_PLAYER_VOLUME=${data.musicVolume || '50'}`,
    `MUSIC_PLAYER_AUTOPLAY=false`,
    `MUSIC_PLAYER_TRACKS=["assets/songs/track1.mp3"]`,
    ``,
    `BLOOM_ENABLED=true`,
    `BLOOM_STRENGTH=.1`,
    `BLOOM_RADIUS=30px`,
    `BLOOM_PULSE_ANIMATION=true`,
    ``,
    `FONT_FAMILY=${data.fontFamily || 'Poppins'}`,
    `FONT_WEIGHTS=300;400;500;600;700`,
  ].join('\n');
}

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', { maxAge: '1y', etag: false }));

app.use('/setup', (req, res, next) => {
  if (isSetupComplete() && !req.path.endsWith('.css') && !req.path.endsWith('.js')) {
    return res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
}, express.static(path.join(__dirname, 'setup'), { maxAge: 0 }));

app.get('/setup', guardSetup, (_req, res) => {
  res.sendFile(path.join(__dirname, 'setup', 'index.html'));
});

app.post(
  '/setup',
  guardSetup,
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),
  (req, res) => {
    try {
      const body = req.body;
      const files = req.files || {};

      const profileFile = files.profile?.[0]?.filename;
      const backgroundFile = files.background?.[0]?.filename;

      if (profileFile)    body.profileImageFile    = profileFile;
      if (backgroundFile) body.backgroundImageFile = backgroundFile;
      if (profileFile)    body.profileImageType    = path.extname(profileFile).slice(1).toLowerCase();

      fs.writeFileSync(ENV_PATH, buildEnvContent(body), 'utf8');

      delete require.cache[require.resolve('./scripts/generateConfig')];
      require('./scripts/generateConfig').main();

      fs.writeFileSync(LOCK_PATH, new Date().toISOString(), 'utf8');

      res.json({ success: true });
    } catch (err) {
      console.error('Setup error:', err);
      res.status(500).json({ error: 'Setup failed: ' + err.message });
    }
  }
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  if (!isSetupComplete()) {
    console.log(`\nFirst run detected. Visit http://localhost:${PORT}/setup to configure your page.\n`);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
