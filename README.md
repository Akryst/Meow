<div align="center">

# Meow! - Interactive Personal Bio Page Template

*A modern, customizable personal bio page with dynamic video backgrounds, real-time Last.fm music integration, particle effects, and responsive design.*

**Perfect for developers, and creators who want to showcase their personality!** 🐱✨

---

[![Status](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen?style=for-the-badge)](https://github.com/Akryst/Meow-)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Last.fm](https://img.shields.io/badge/Last.fm-D51007?style=for-the-badge&logo=last.fm&logoColor=white)](https://www.last.fm/)
[![License](https://img.shields.io/badge/License-Open%20Source-blue?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

<div align="center">

| 🎨 **Visual** | � **Audio** | 🔧 **Technical** | 📱 **Social** |
|:---:|:---:|:---:|:---:|
| Dynamic Video/Image Backgrounds | Last.fm Real-time Music | Easy `.env` Configuration | Customizable Social Links |
| Particle Effects & Bloom | Built-in Music Player | Responsive Design | Live Status Display |
| Smooth Animations | Audio Visualizations | Node.js Backend | Visit Counter |

</div>

### 🌟 **What Makes Meow! Special?**

- **🎨 Dynamic Backgrounds**: Seamlessly switch between stunning video and image backgrounds
- **🎵 Last.fm Integration**: Show your current music taste in real-time
- **🎶 Built-in Music Player**: Play your own curated songs with beautiful visualizations
- **✨ Visual Effects**: Mesmerizing particle effects and customizable bloom effects
- **📱 Responsive Design**: Looks amazing on all devices - desktop, tablet, and mobile
- **🔧 Easy Configuration**: Simple `.env` file setup - no coding required
- **🌐 Social Media Links**: Connect all your social profiles in one place
- **⏰ Live Status**: Real-time clock and rotating location display
- **🎯 Visit Counter**: Track your page's popularity *(Work in Progress)*
- **🌟 Smooth Animations**: Beautiful fade-in effects and seamless transitions

## 🚀 Quick Start

<div align="center">

**Get your personalized bio page running in just 5 minutes!** ⚡

</div>

### 📋 Prerequisites

**🟢 Required:**
- Node.js (version 18+)
- npm or yarn
- Basic text editor

### ⚡ Installation Steps

```bash
# 1️⃣ Clone the repository
git clone <repository-url>
cd musicbio-template

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up your configuration
cp .env.example .env
# Edit .env with your personal information
# ⚠️ IMPORTANT: Never commit .env to version control!

# 4️⃣ Generate configuration
npm run config

# 5️⃣ Start the magic! ✨
npm start

# 6️⃣ Open http://localhost:3000 and enjoy! 🎉
```

## 📁 Project Structure

<details>
<summary><b>🗂️ Click to explore the project structure</b></summary>

```
musicbio-template/
├── 📄 .env                    # 🔧 Your personal configuration
├── 📄 package.json           # 📦 Project dependencies
├── 📄 index.js               # 🚀 Main server file
├── � dev.js                 # 🛠️ Development helper script
├── �📂 scripts/
│   └── 📄 generateConfig.js  # ⚙️ Configuration generator
├── 📂 public/                # 🌐 Frontend files
│   ├── 📄 index.html         # 🏠 Main HTML file
│   ├── 📂 css/
│   │   ├── 📂 base/
│   │   │   └── 📄 styles.css # 🎨 Main styles
│   │   └── 📂 components/
│   │       └── 📄 effects.css # ✨ Visual effects styles
│   ├── 📂 js/
│   │   ├── 📄 config.js      # 🔄 Generated configuration (auto-created)
│   │   ├── 📄 main.js        # 🧠 Main JavaScript
│   │   └── 📂 modules/
│   │       ├── 📄 configurator.js    # 🎛️ Page initialization
│   │       ├── 📄 backgroundManager.js # 🖼️ Background handling
│   │       ├── 📄 effects.js         # ✨ Visual effects
│   │       ├── 📄 musicPlayer.js     # 🎵 Music player
│   │       ├── 📄 services.js        # 🌐 Last.fm integration
│   │       └── 📄 timeUtils.js       # ⏰ Time utilities
│   └── 📂 assets/            # 🎭 Your personal assets
│       ├── 📂 images/
│       │   ├── 📷 profile.jpg        # 👤 Your profile picture
│       │   └── 📷 background.jpg     # 🖼️ Background image
│       ├── 📂 videos/
│       │   └── 🎥 background.mp4     # 🎬 Background video (optional)
│       └── 📂 songs/
│           ├── 🎵 Song1.mp3          # 🎶 Your music files
│           └── 🎵 Song2.mp3          # 🎶 Add more songs here!
```

</details>

## ⚙️ Configuration Guide

<div align="center">

**🎨 Customize your bio page with just a few simple edits to the `.env` file!**

</div>

### 👤 Personal Information

```env
# 🏷️ Your display name
NAME=Your Name

# 📝 Short description about yourself
DESCRIPTION=Developer • Designer • Creator

# 🌍 Your timezone (affects the live clock)
TIMEZONE=America/New_York
```

### 🌐 Social Media Links

<div align="center">

*Add your social media URLs. Set to `off` to hide any platform you don't use.*

</div>

```env
TWITTER=https://x.com/yourusername         # 🐦 Twitter/X
GITHUB=https://github.com/yourusername     # 🐙 GitHub
LASTFM=https://www.last.fm/user/yourusername # 🎵 Last.fm
OSU=https://osu.ppy.sh/users/youruser      # 🎮 osu!
VRCHAT=https://vrchat.com/home/user/usr_youruser # 🥽 VRChat
INSTAGRAM=https://instagram.com/yourusername # 📸 Instagram
TIKTOK=off                                 # 🎪 TikTok (disabled)
NAMEMC=off                                 # ⛏️ NameMC (disabled)
YOUTUBE=off                                # 📺 YouTube (disabled)
```

### 🎵 Last.fm Integration

<div align="center">

**Show your currently playing music in real-time!** 🎶

</div>

<details>
<summary><b>🔧 How to set up Last.fm integration</b></summary>

1. **Get a Last.fm API key**:
   - Visit [Last.fm API](https://www.last.fm/api/account/create)
   - Create an account and get your API key

2. **Configure in .env**:
   ```env
   LASTFM_API_KEY=your_api_key_here
   LASTFM_USERNAME=your_lastfm_username
   ```

3. **Start scrobbling music** and watch it appear on your bio page! 🎉

</details>

### 🎨 Background Configuration

<div align="center">

**Choose your vibe: stunning video backgrounds or beautiful static images!** 🌟

</div>

```env
# 🎬 For video background (recommended for maximum impact!)
BACKGROUND_TYPE=video
BACKGROUND_VIDEO=assets/videos/background.mp4
BACKGROUND_IMAGE=assets/images/background.jpg  # Fallback if video fails

# 🖼️ For image background only
BACKGROUND_TYPE=image
BACKGROUND_IMAGE=assets/images/background.jpg
```

### ✨ Visual Effects

<div align="center">

**Make your page glow with customizable bloom effects!** ✨

</div>

```env
BLOOM_ENABLED=true              # 🌟 Enable/disable bloom effects
BLOOM_STRENGTH=0.1              # 💫 Glow intensity (0.0 to 1.0)
BLOOM_RADIUS=30px               # 📏 Size of the glow effect
BLOOM_PULSE_ANIMATION=true      # 💓 Enable/disable pulsing animation
```

### 📍 Location Display *(Optional)*

<div align="center">

**Show off your favorite hangout spots with rotating locations!** 🌍

</div>

```env
LOCATIONS_ENABLED=true                                    # 🗺️ Enable location rotation
LOCATION_INTERVAL=10000                                   # ⏱️ Time between changes (ms)
FADE_TIME=1000                                           # 🌊 Fade animation duration (ms)
LOCATIONS=["Home","Office","Coffee Shop","The Club"]     # 📍 Your favorite places
```

### 💾 Database *(Work in Progress)* 🚧

<div align="center">

**Visit tracking feature - Coming soon!** 🔄

</div>

> **⚠️ Note:** The database functionality is currently under development. Visit counter and analytics features will be available in a future update.

```env
MONGO_ENABLED=false                                # 🗄️ Database toggle (WIP)
MONGO_URI=mongodb://localhost:27017/yourdatabase   # 🔗 Database connection
DATABASE_NAME=yourdatabase                         # 📝 Database name
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

<div align="center">

**Powerful development tools at your fingertips!** ⚡

</div>

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm start` | 🚀 Start development server | Ready to see your changes live |
| `npm run config` | 🔄 Regenerate configuration | After editing `.env` file |
| `npm run serve` | 📡 Static files only | Frontend-only hosting |

<details>
<summary><b>💡 Pro Development Tips</b></summary>

- **🔄 Always run `npm run config`** after changing your `.env` file
- **🚀 `npm start`** includes hot-reload for instant development feedback

</details>

## 🌐 Deployment

<div align="center">

**Ready to share your bio page with the world?** 🚀

</div>

> **🔒 Security First:** Before deploying, ensure your `.env` file is never committed to version control. The included `.gitignore` file handles this automatically.

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

## � Security & Git Best Practices

<div align="center">

**Protect your sensitive information!** 🛡️

</div>

### 🚫 What NOT to Commit

The project includes a comprehensive `.gitignore` file that automatically excludes:

- ✅ **`.env` files** - Contains your API keys and personal information
- ✅ **`node_modules/`** - Large dependency folder (rebuilt with `npm install`)
- ✅ **Log files** - Runtime logs and debug information
- ✅ **OS files** - System-generated files like `.DS_Store`
- ✅ **IDE files** - Editor-specific configuration files

### 🔐 Environment Variables Security

<details>
<summary><b>🛡️ How to handle sensitive data safely</b></summary>

**✅ Do:**
- Use `.env.example` as a template for others
- Set environment variables on hosting platforms
- Keep API keys in `.env` only
- Use different `.env` files for different environments

**❌ Don't:**
- Commit `.env` to version control
- Share API keys in public repositories
- Hardcode secrets in your code
- Use production keys in development

**🔄 If you accidentally committed secrets:**
1. Remove them from the repository history
2. Regenerate the compromised keys/tokens
3. Update your `.env` with new credentials

</details>

### 📤 Safe Repository Setup

```bash
# 1️⃣ Initialize git (if not already done)
git init

# 2️⃣ The .gitignore is already set up to protect you!
# Check what will be committed
git status

# 3️⃣ Add your files (sensitive files are automatically excluded)
git add .

# 4️⃣ Make your first commit
git commit -m "Initial commit: Add Meow! bio page template"

# 5️⃣ Add your remote repository
git remote add origin https://github.com/yourusername/your-repo.git

# 6️⃣ Push to GitHub
git push -u origin main
```

## ��️ Troubleshooting

<div align="center">

**Having issues? We've got you covered!** 🔧

</div>

<details>
<summary><b>🔧 Common Issues & Solutions</b></summary>

### ❓ **Configuration not updating?**
```bash
npm run config  # Regenerate configuration from .env
```

### 🎥 **Background video not playing?**
- ✅ Check file format (MP4 recommended)
- ✅ Ensure file size is reasonable (<50MB)
- ⚠️ Browser autoplay policies may prevent playback

### 🎵 **Last.fm not working?**
- ✅ Verify API key is correct
- ✅ Check username spelling
- ✅ Ensure you're actively scrobbling music

### 🎶 **Music player not working?**
- ✅ Check file paths in `musicPlayer.js`
- ✅ Verify audio files are in correct format
- ✅ Check browser console for errors

</details>

<details>
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

### 🚀 **General Performance**
- Enable caching headers for production
- Use a CDN for large assets
- Test on different devices and connections

</details>

---

<div align="center">

## 📝 License

**This project is open source and free to use!** 🎉

Feel free to use, modify, and distribute however you like.

## 🤝 Contributing

<div align="center">

**Want to make Meow! even better?** 🐱✨

</div>

We welcome contributions with open arms! Here's how you can help:

| 🐛 **Report Bugs** | 💡 **Suggest Features** | 🔧 **Submit PRs** | 📚 **Improve Docs** |
|:---:|:---:|:---:|:---:|
| Found an issue? | Have a cool idea? | Code improvements? | Better explanations? |
| Let me know! | Share it with us! | We'd love to see! | Help others learn! |

## 💡 Tips & Best Practices

<div align="center">

**🌟 Make the most out of your Meow! bio page** 🌟

</div>

| 🔐 **Security** | 🚀 **Performance** | 📱 **Compatibility** | 💾 **Maintenance** |
|:---:|:---:|:---:|:---:|
| Keep `.env` secure | Optimize your assets | Test on all devices | Regular backups |
| Never commit secrets | Compress images/videos | Check responsiveness | Update dependencies |
| Use `.gitignore` properly | Use CDN for large files | Test different browsers | Monitor for vulnerabilities |

---

<div align="center">

### 🎉 **Enjoy your personalized bio page!** 🎉

**Show off your personality, share your music, and connect with the world!** 🌍✨

*For questions, support, or just to say hi - feel free to open an issue or reach out to the community!* 💬

<br>

**Made with 💖 by Akryst (and a little bit of IA)** 🐱

[⭐ Star this repo](https://github.com/Akryst/Meow-) • [🐛 Report Issues](https://github.com/Akryst/Meow-/issues) • [💡 Suggest Features](https://github.com/Akryst/Meow-/discussions)

</div>

</div>
