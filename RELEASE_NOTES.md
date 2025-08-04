# 🎉 Release v1.0.0 - Interactive Bio Page

## ✨ New Features

### 🌟 Welcome Screen System
- **Configurable Welcome Screen**: Customizable welcome message via `.env` configuration
- **Smooth Blur Effects**: Professional backdrop blur with particle animations
- **Instant Response**: Optimized 300ms transition times for better UX
- **Click-to-Continue**: Simple, clean interaction design

### ⚙️ Configuration System
- **Environment-Based Config**: All settings managed through `.env` file
- **Auto-Generated Config**: Automatic `config.js` generation from environment variables
- **Hot-Reload Support**: Changes reflect immediately with `npm run config`

### 🎨 Enhanced UI/UX
- **Responsive Design**: Works perfectly on desktop and mobile
- **Hover Effects**: Interactive widgets with smooth animations
- **Professional Styling**: Clean, modern design with glass morphism effects
- **Customizable Footer**: Personalize footer text via configuration

## 🔧 Configuration Options

### Welcome Screen
```env
WELCOME_SCREEN_ENABLED=true
WELCOME_TEXT=Hey! Been trying to meet you.
```

### Personal Information
```env
NAME=Your Name
DESCRIPTION=Your Description
FOOTER=Made with ❤️ by You
TIMEZONE=Your/Timezone
```

### Social Media Integration
```env
TWITTER=https://x.com/yourusername
GITHUB=https://github.com/yourusername
LASTFM=https://www.last.fm/user/yourusername
# ... and more
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akryst/Meow-.git
   cd Meow-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your settings**
   ```bash
   cp .env .env.local  # Copy and customize
   nano .env.local     # Edit your settings
   ```

4. **Generate configuration**
   ```bash
   npm run config
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Features Included

- ✅ **Welcome Screen** with configurable text and blur effects
- ✅ **Last.fm Integration** for real-time music display
- ✅ **Music Player Widget** with volume controls and visualizer
- ✅ **Social Media Links** (Twitter, GitHub, Last.fm, osu!, VRChat, etc.)
- ✅ **Responsive Design** for all screen sizes
- ✅ **Background Support** (Video/Image backgrounds)
- ✅ **Bloom Effects** and visual enhancements
- ✅ **Location Rotation** system
- ✅ **Visit Counter** with MongoDB support
- ✅ **Time Display** with timezone support
- ✅ **Configurable Footer**

## 🛠️ Technical Details

- **Frontend**: Vanilla JavaScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (optional)
- **Configuration**: Environment-based (.env)
- **Build System**: Auto-generated config from environment variables

## 📋 Requirements

- Node.js 16+ 
- Modern web browser
- Optional: MongoDB for visit tracking

## 🎨 Customization

All visual and functional aspects can be customized through the `.env` file:
- Welcome screen text and behavior
- Personal information and social links
- Background images/videos
- Visual effects (bloom, particles, etc.)
- Footer text and branding

## 🐛 Bug Fixes

- ✅ Fixed widget hover effects interference with welcome screen blur
- ✅ Optimized transition timing for smoother experience
- ✅ Resolved scroll bar flash during welcome screen transitions
- ✅ Improved CSS specificity conflicts

## 📝 Notes

This release represents a complete, production-ready interactive bio page with professional-grade welcome screen functionality and comprehensive customization options.

---

**Made with ❤️ by Akryst**
