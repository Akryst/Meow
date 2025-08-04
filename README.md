# 🎵 MusicBio - Interactive Personal Bio Page Template

A modern, customizable personal bio page with dynamic video backgrounds, real-time Last.fm music integration, particle effects, and responsive design. Perfect for developers, creators, and music enthusiasts.

![Bio Page Preview](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![HTML5](https://img.shields.io/badge/HTML5-Modern-orange)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue)

## ✨ Features

- **🎨 Dynamic Backgrounds**: Support for both video and image backgrounds
- **🎵 Last.fm Integration**: Real-time music tracking and display
- **🎶 Built-in Music Player**: Play your own music with visualizations
- **✨ Visual Effects**: Particle effects and customizable bloom effects
- **📱 Responsive Design**: Works perfectly on all devices
- **🔧 Easy Configuration**: Simple `.env` file setup
- **🌐 Social Media Links**: Customizable social media integration
- **⏰ Live Status**: Real-time clock and location display
- **🎯 Visit Counter**: Track page visits
- **🌟 Smooth Animations**: Beautiful fade-in effects and transitions

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- Basic knowledge of editing configuration files

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd musicbio-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy and configure the environment file**
   ```bash
   cp .env.example .env
   ```

4. **Edit your configuration** (see [Configuration Guide](#-configuration-guide) below)

5. **Generate the configuration file**
   ```bash
   npm run config
   ```

6. **Start the development server**
   ```bash
   npm start
   ```

7. **Open your browser** and visit `http://localhost:3000`

## 📁 Project Structure

```
musicbio-template/
├── 📄 .env                    # Your personal configuration
├── 📄 package.json           # Project dependencies
├── 📄 index.js               # Main server file
├── 📂 scripts/
│   └── 📄 generateConfig.js  # Configuration generator
├── 📂 public/
│   ├── 📄 index.html         # Main HTML file
│   ├── 📂 css/
│   │   ├── 📂 base/
│   │   │   └── 📄 styles.css # Main styles
│   │   └── 📂 components/
│   │       └── 📄 effects.css # Visual effects styles
│   ├── 📂 js/
│   │   ├── 📄 config.js      # Generated configuration (auto-created)
│   │   ├── 📄 main.js        # Main JavaScript
│   │   └── 📂 modules/
│   │       ├── 📄 configurator.js    # Page initialization
│   │       ├── 📄 backgroundManager.js # Background handling
│   │       ├── 📄 effects.js         # Visual effects
│   │       ├── 📄 musicPlayer.js     # Music player
│   │       ├── 📄 services.js        # Last.fm integration
│   │       └── 📄 timeUtils.js       # Time utilities
│   └── 📂 assets/
│       ├── 📂 images/
│       │   ├── 📷 profile.jpg        # Your profile picture
│       │   └── 📷 background.jpg     # Background image
│       ├── 📂 videos/
│       │   └── 🎥 background.mp4     # Background video (optional)
│       └── 📂 songs/
│           ├── 🎵 Song1.mp3          # Your music files
│           └── 🎵 Song2.mp3
```

## ⚙️ Configuration Guide

Edit the `.env` file to customize your bio page:

### 👤 Personal Information

```env
# Your display name
NAME=Your Name

# Short description about yourself
DESCRIPTION=Developer • Designer • Creator

# Your timezone (affects the live clock)
TIMEZONE=America/New_York
```

### 🌐 Social Media Links

Add your social media URLs. Set to `off` to hide:

```env
TWITTER=https://x.com/yourusername
GITHUB=https://github.com/yourusername
LASTFM=https://www.last.fm/user/yourusername
OSU=https://osu.ppy.sh/users/youruser
VRCHAT=https://vrchat.com/home/user/usr_youruser
INSTAGRAM=https://instagram.com/yourusername
TIKTOK=off
NAMEMC=off
YOUTUBE=off
```

### 🎵 Last.fm Integration

To show your currently playing music:

1. **Get a Last.fm API key**:
   - Visit [Last.fm API](https://www.last.fm/api/account/create)
   - Create an account and get your API key

2. **Configure in .env**:
   ```env
   LASTFM_API_KEY=your_api_key_here
   LASTFM_USERNAME=your_lastfm_username
   ```

### 🎨 Background Configuration

Choose between video or image background:

```env
# For video background
BACKGROUND_TYPE=video
BACKGROUND_VIDEO=assets/videos/background.mp4
BACKGROUND_IMAGE=assets/images/background.jpg  # Fallback if video fails

# For image background only
BACKGROUND_TYPE=image
BACKGROUND_IMAGE=assets/images/background.jpg
```

### ✨ Visual Effects

Customize the bloom effects:

```env
BLOOM_ENABLED=true
BLOOM_STRENGTH=0.1          # 0.0 to 1.0
BLOOM_RADIUS=30px           # Size of the glow effect
BLOOM_PULSE_ANIMATION=true  # Enable/disable pulsing animation
```

### 📍 Location Display (Optional)

Show rotating locations:

```env
LOCATIONS_ENABLED=true
LOCATION_INTERVAL=10000     # Time between location changes (ms)
FADE_TIME=1000             # Fade animation duration (ms)
LOCATIONS=["Home","Office","Coffee Shop","The Club"]
```

### 💾 Database (Optional)

For visit tracking:

```env
MONGO_ENABLED=false
MONGO_URI=mongodb://localhost:27017/yourdatabase
DATABASE_NAME=yourdatabase
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

### Adding More Social Icons

1. **Add the URL to `.env`**:
   ```env
   CUSTOM_SOCIAL=https://example.com/yourprofile
   ```

2. **Edit `public/index.html`** to add the icon:
   ```html
   <a href="#" class="social-icon" data-social="custom_social" aria-label="Custom">
       <i class="fab fa-custom-icon"></i>
   </a>
   ```

3. **Regenerate config**:
   ```bash
   npm run config
   ```

## 🎵 Music Setup

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

## 🔧 Development Commands

```bash
# Start the development server
npm start

# Regenerate configuration after .env changes
npm run config

# Serve static files only (no backend)
npm run serve
```

## 🌐 Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. **Build for static hosting**:
   ```bash
   npm run config
   ```

2. **Deploy the `public` folder** to your hosting platform

3. **Note**: Last.fm integration and visit counter won't work without a backend

### Full Deployment (Heroku, Railway, DigitalOcean)

1. **Set environment variables** on your hosting platform
2. **Deploy the entire project**
3. **Ensure MongoDB is configured** if using visit tracking

## 🛠️ Troubleshooting

### Common Issues

**Configuration not updating?**
```bash
npm run config
```

**Background video not playing?**
- Check file format (MP4 recommended)
- Ensure file size is reasonable (<50MB)
- Browser autoplay policies may prevent playback

**Last.fm not working?**
- Verify API key is correct
- Check username spelling
- Ensure you're actively scrobbling music

**Music player not working?**
- Check file paths in `musicPlayer.js`
- Verify audio files are in correct format
- Check browser console for errors

### Performance Tips

- **Optimize images**: Use compressed JPG/PNG files
- **Video optimization**: Use H.264 encoding for MP4 files
- **Audio optimization**: Use 128kbps MP3 files
- **Enable caching**: Configure proper cache headers for production

## 📝 License

This project is open source. Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 💡 Tips & Best Practices

1. **Keep your .env file secure** - never commit it to public repositories
2. **Optimize your assets** - compress images and videos for faster loading
3. **Test on multiple devices** - ensure responsive design works everywhere
4. **Regular backups** - backup your configuration and assets
5. **Monitor performance** - large video files can affect loading times

---

**Enjoy your personalized bio page! 🎉**

For questions or support, feel free to open an issue or reach out to the community.
# Meow-
