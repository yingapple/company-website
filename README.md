# ElephantFly Technology Website

A modern, premium website for ElephantFly Technology - showcasing AI innovation and digital solutions.

## 🚀 Features

- **Modern Design**: Clean, Apple-inspired interface with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Performance Optimized**: Fast loading with optimized images and code
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Contact Form**: Interactive contact form with validation
- **Accessibility**: WCAG compliant with proper focus states and screen reader support

## 🛠 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Interactive functionality without dependencies
- **Google Fonts**: Inter font family for clean typography

## 📁 Project Structure

```
company-website/
├── index.html              # Main HTML file
├── styles.css             # Main stylesheet
├── script.js              # JavaScript functionality
├── package.json           # Project configuration
├── vercel.json           # Vercel deployment config
├── assets/               # Images and media files
│   ├── logo.svg          # Company logo
│   ├── hero-visual.jpg   # Hero section image
│   ├── about-image.jpg   # About section image
│   └── icons/            # Product/service icons
├── IMAGE_ASSETS_REQUIRED.md  # Image specifications guide
└── README.md             # This file
```

## 🎨 Design System

### Colors
- **Primary**: #007AFF (iOS Blue)
- **Secondary**: #5856D6 (Purple)
- **Text Primary**: #1d1d1f
- **Text Secondary**: #6e6e73
- **Background**: #ffffff / #fbfbfd

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📚 Documentation

- **[快速部署指南](QUICK_DEPLOY.md)** - 5分钟快速上线
- **[Vercel + 阿里云完整部署教程](VERCEL_ALIYUN_DEPLOYMENT.md)** - 详细的部署和域名配置步骤
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - General deployment instructions
- [Project Structure](PROJECT_STRUCTURE.md) - Detailed file and folder organization
- [Image Assets Guide](IMAGE_ASSETS_REQUIRED.md) - Required images and specifications
- [Favicon Setup](FAVICON_SETUP.md) - How to configure site favicon
- [Update Summary](UPDATE_SUMMARY.md) - Recent changes and improvements

## 🚀 Getting Started

### Local Development

1. **Clone or download the project files**

2. **Install dependencies (optional - for development tools)**
   ```bash
   npm install
   ```

3. **Run local development server**
   ```bash
   # Option 1: Using Python (recommended)
   python3 -m http.server 3000
   
   # Option 2: Using Node.js (if you have live-server installed)
   npx live-server --port=3000
   
   # Option 3: Using PHP
   php -S localhost:3000
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Custom Domain Setup**
   - Add your custom domain (eleflytech.com) in Vercel dashboard
   - Update DNS settings to point to Vercel

## 📝 Content Customization

### Company Information
- Update company details in `index.html`
- Modify contact information and email addresses
- Customize product/service descriptions

### Images
- Follow the `IMAGE_ASSETS_REQUIRED.md` guide
- Replace placeholder images with your branded assets
- Optimize images for web delivery

### Colors and Branding
- Update CSS custom properties in `styles.css`
- Modify logo and brand elements
- Adjust color scheme to match brand guidelines

## 🔧 Configuration

### SEO Optimization
- Update meta tags in HTML head
- Add relevant keywords and descriptions
- Configure Open Graph and Twitter Card tags

### Analytics (Optional)
Add your analytics code before the closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Make your changes
2. Test across different browsers and devices
3. Ensure accessibility compliance
4. Optimize any new images
5. Update documentation if needed

## 📄 License

MIT License - feel free to use this template for your own projects.

## 📞 Support

For questions about this website template:
- Check the `IMAGE_ASSETS_REQUIRED.md` for asset specifications
- Review the code comments for implementation details
- Test thoroughly before deploying to production

---

**ElephantFly Technology** - Building the Future, Independently