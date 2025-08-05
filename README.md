# Meow! - Interactive Personal Bio Page

A modern, customizable personal bio page with dynamic video backgrounds, real-time Last.fm music integration, particle effects, and responsive design.

Perfect for developers and creators who want to showcase their personality online.

![Preview](image.png)

[Live Demo](https://bio.akryst.lol)

---

[![Status](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen?style=for-the-badge)](https://github.com/Akryst/Meow-)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Open%20Source-blue?style=for-the-badge)](LICENSE)

### What Makes This Special

- **Dynamic Backgrounds**: Seamlessly switch between video and image backgrounds
- **Last.fm Integration**: Show your current music taste in real-time
- **Built-in Music Player**: Play your own curated songs with visualizations
- **Visual Effects**: Particle effects and customizable bloom effects
- **Responsive Design**: Works on all devices - desktop, tablet, and mobile
- **Easy Configuration**: Simple `.env` file setup - no coding required
- **Social Media Links**: Connect all your social profiles in one place
- **Live Status**: Real-time clock and rotating location display
- **Visit Counter**: Track your page's popularity (Work in Progress)
- **Smooth Animations**: Beautiful fade-in effects and seamless transitions

## Quick Start

Get your personalized bio page running in just 5 minutes.

### Prerequisites

- Node.js (version 18+=
- npm or yarn
- Basic text editor.
- A machine to self-host it.

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Meow

# Install dependencies
npm install

# Set up your configuration
cp .env.example .env

# Edit .env with your personal information

# Generate configuration
npm run config

# Start the server
npm start

# Open http://localhost:3000
```

## Configuration Guide

Customize your bio page with simple edits to the `.env` file.

### Personal Information

```env
# Your display name
NAME=Your Name

# Short description about yourself
DESCRIPTION=Developer • Designer • Creator

# Your timezone (affects the live clock)
TIMEZONE=America/New_York
```

### Social Media Links

Add your social media URLs. Set to `off` to hide any platform you don't use.

```env
TWITTER=https://x.com/yourusername         # Twitter/X
GITHUB=https://github.com/yourusername     # GitHub
LASTFM=https://www.last.fm/user/yourusername # Last.fm
OSU=https://osu.ppy.sh/users/youruser      # osu!
VRCHAT=https://vrchat.com/home/user/usr_youruser # VRChat
INSTAGRAM=https://instagram.com/yourusername # Instagram
TIKTOK=off                                 # TikTok (disabled)
NAMEMC=off                                 # NameMC (disabled)
YOUTUBE=off                                # YouTube (disabled)
```

### Last.fm Integration

Show your currently playing music in real-time.

<details>
<summary>How to set up Last.fm integration</summary>

1. **Get a Last.fm API key**:
   - Visit [Last.fm API](https://www.last.fm/api/account/create)
   - Create an account and get your API key

2. **Configure in .env**:
   ```env
   LASTFM_API_KEY=your_api_key_here
   LASTFM_USERNAME=your_lastfm_username
   ```

3. **Start scrobbling music** and watch it appear on your bio page.

</details>

### Background Configuration

Choose between video backgrounds or static images.

```env
# For video background (recommended for maximum impact!)
BACKGROUND_TYPE=video
BACKGROUND_VIDEO=assets/videos/background.mp4
BACKGROUND_IMAGE=assets/images/background.jpg  # Fallback if video fails

# For image background only
BACKGROUND_TYPE=image
BACKGROUND_IMAGE=assets/images/background.jpg
```

### Visual Effects

Customize bloom effects and animations.

```env
BLOOM_ENABLED=true              # Enable/disable bloom effects
BLOOM_STRENGTH=0.1              # Glow intensity (0.0 to 1.0)
BLOOM_RADIUS=30px               # Size of the glow effect
BLOOM_PULSE_ANIMATION=true      # Enable/disable pulsing animation
```

### Location Display (Optional)

Show rotating locations on your page.

```env
LOCATIONS_ENABLED=true                                    # Enable location rotation
LOCATION_INTERVAL=10000                                   # Time between changes (ms)
FADE_TIME=1000                                           # Fade animation duration (ms)
LOCATIONS=["Home","Office","Coffee Shop","The Club"]     # Your favorite places
```

### Database (Work in Progress)

Visit tracking feature - Coming soon!

> **Note:** The database functionality is currently under development. Visit counter and analytics features will be available in a future update.

```env
MONGO_ENABLED=false                                # Database toggle (WIP)
MONGO_URI=mongodb://localhost:27017/yourdatabase   # Database connection
DATABASE_NAME=yourdatabase                         # Database name
```

## 🎨 Customization

### Adding Your Assets

1. **Profile Picture**: Replace `public/assets/images/profile.jpg`
2. **Background Image**: Replace `public/assets/images/background.jpg`
3. **Background Video**: Add `public/assets/videos/background.mp4`
4. **Music Files**: Add your songs to `public/assets/songs/`

### Styling Customization

- **Colors & Themes**: Edit `public/css/base/styles.css`
- **Visual Effects**: Modify `public/css/components/effects.css`
- **Layout**: Adjust `public/index.html`

##  Music Setup

### Adding Your Own Music

1. Add MP3 files to `public/assets/songs/`
2. Update the songs array in `public/js/modules/musicPlayer.js`:
   ```javascript
   const songs = [
       'assets/songs/YourSong1.mp3',
       'assets/songs/YourSong2.mp3',
       'assets/songs/YourSong3.mp3'
   ];
   ```

### Audio Format Requirements

- **Format**: MP3 (recommended) or WAV
- **Quality**: 128kbps or higher
- **Size**: Keep files under 10MB for faster loading

## Development Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm start` | Start development server | Ready to see your changes live |
| `npm run config` | Regenerate configuration | After editing `.env` file |
| `npm run serve` | Static files only | Frontend-only hosting |

## Deployment
### Heroku

1. **Set environment variables** on your hosting platform
2. **Deploy the entire project**

### PM2 Deployment (Own server/VPS)

Keep your bio page running 24/7 with PM2.

1. **Install PM2 globally**:
   ```bash
   npm install -g pm2
   ```

2. **Start your application**:
   ```bash
   pm2 start index.js --name meow
   ```

3. **Useful PM2 commands**:
   ```bash
   pm2 stop meow        # Stop the application
   pm2 restart meow     # Restart the application
   pm2 delete meow      # Remove from PM2
   pm2 logs meow        # View logs
   pm2 status               # Check status of all apps
   pm2 save                 # Save current PM2 list
   pm2 startup              # Setup PM2 to start on boot
   ```



## Troubleshooting

### 🎥 **Background video not playing?**
- Check file format (MP4 recommended)
- Ensure file size is reasonable (<50MB)
- Browser autoplay policies may prevent playback

### 🎵 **Last.fm not working?**
- Verify API key is correct
- Check username spelling
- Ensure you're actively scrobbling music

### 🎶 **Music player not working?**
- Check file paths in `musicPlayer.js`
- Verify audio files are in correct format
- Check browser console for errors

<summary><b>⚡ Performance Tips</b></summary>

### 🖼️ **Image Optimization**
- Use compressed JPG/PNG files
- Recommended max size: 2MB for images

### 🎬 **Video Optimization**
- Use H.264 encoding for MP4 files
- Recommended max size: 50MB for videos
- Consider using shorter clips (30-60 seconds)

### 🎵 **Audio Optimization**
- Use 128kbps MP3 files for best balance
- Keep files under 10MB each

</details>

---

<div align="center">

## 📝 License

**This project is open source and free to use**

Feel free to use, modify, and distribute however you like.

## 🤝 Contributing

<div align="center">

**Want to make Meow! even better?** 

</div>



---

### Enjoy your personalized bio page!

Show off your personality, share your music, and connect with the world.

*For questions, support, or just to say hi - feel free to open an issue or reach out to the community.*

**Made with ❤️ by Akryst (With some AI)**

[⭐ Star this repo](https://github.com/Akryst/Meow-) • [🐛 Report Issues](https://github.com/Akryst/Meow-/issues) • [💡 Suggest Features](https://github.com/Akryst/Meow-/discussions)
