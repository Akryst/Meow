# Contributing to Personal Bio Page

Thank you for your interest in contributing to this project! 🎉

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/bio-page.git
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up your development environment**
   ```bash
   npm run setup
   ```

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run status    # Check project health
   npm start         # Test the application
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` code style changes (formatting, etc.)
- `refactor:` code refactoring
- `test:` adding or updating tests
- `chore:` maintenance tasks

## 📝 Code Style Guidelines

### JavaScript
- Use modern ES6+ features
- Use meaningful variable names
- Add comments for complex logic
- Follow the existing module pattern

### CSS
- Use CSS custom properties (variables) when possible
- Follow the BEM methodology for class naming
- Keep styles organized in logical sections

### HTML
- Use semantic HTML elements
- Include proper accessibility attributes
- Keep the structure clean and readable

## 🧪 Testing

Before submitting a pull request:

1. **Test all features**
   - Configuration system
   - Background switching
   - Music player
   - Last.fm integration
   - Visual effects
   - Responsive design

2. **Check for errors**
   - Browser console errors
   - Network request failures
   - Loading issues

3. **Test on different devices**
   - Desktop browsers
   - Mobile devices
   - Different screen sizes

## 📚 Documentation

When adding new features:

1. **Update the README.md**
   - Add configuration options
   - Update the features list
   - Include usage examples

2. **Update the Spanish guide**
   - Keep GUIA-RAPIDA.md in sync
   - Translate new features

3. **Add code comments**
   - Explain complex functions
   - Document configuration options
   - Include usage examples

## 🎯 Feature Requests

When adding new features, consider:

### Good Feature Ideas
- New social media integrations
- Additional visual effects
- Performance improvements
- Accessibility enhancements
- Mobile optimizations
- New configuration options

### Guidelines
- Keep it simple and lightweight
- Maintain backward compatibility
- Make it configurable
- Follow the existing patterns

## 🐛 Bug Reports

When reporting bugs:

1. **Check existing issues** first
2. **Provide clear reproduction steps**
3. **Include system information**
   - Browser version
   - Operating system
   - Node.js version
4. **Include error messages** and console output

## 🔧 Project Structure

Understanding the codebase:

```
├── 📄 .env                    # Configuration template
├── 📄 dev.js                 # Development helper script
├── 📂 scripts/
│   └── 📄 generateConfig.js  # Configuration parser
├── 📂 public/
│   ├── 📄 index.html         # Main HTML template
│   ├── 📂 css/               # Styles
│   ├── 📂 js/
│   │   ├── 📄 config.js      # Generated configuration
│   │   └── 📂 modules/       # JavaScript modules
│   └── 📂 assets/            # Static assets
```

### Key Modules
- **configurator.js**: Main initialization logic
- **backgroundManager.js**: Video/image background handling
- **effects.js**: Visual effects and particles
- **services.js**: Last.fm API integration
- **musicPlayer.js**: Built-in music player

## 🌟 Contributing Ideas

### Easy Contributions
- Fix typos in documentation
- Improve error messages
- Add new social media icons
- Optimize images and assets

### Medium Contributions
- Add new visual effects
- Improve responsive design
- Add configuration validation
- Enhance accessibility

### Advanced Contributions
- Add new API integrations (Spotify, Discord, etc.)
- Implement new background types
- Add animation system
- Create theme system

## 📋 Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Update documentation** for any new features
3. **Test thoroughly** on multiple browsers/devices
4. **Create a clear pull request description**
   - What changes were made
   - Why they were made
   - How to test them

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## 📞 Getting Help

- **Questions**: Open a discussion or issue
- **Ideas**: Share in discussions
- **Bugs**: Create a detailed issue report

---

Thank you for contributing! 🙏
