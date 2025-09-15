# Deployment Guide for ElephantFly Website

## 🚀 Quick Start

### Prerequisites
- Node.js installed (for local development)
- Vercel CLI (optional, for command-line deployment)
- Git (for version control)

## 📦 Local Development

1. **Start Development Server**
   ```bash
   # Using Python (recommended)
   python3 -m http.server 3000
   
   # Or using Node.js
   npx serve -p 3000
   ```

2. **Access the Site**
   ```
   http://localhost:3000
   ```

## 🌐 Vercel Deployment

### Option 1: Via Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with default settings
4. Your site will be live at `https://your-project.vercel.app`

### Option 2: Via Command Line

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Production**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Confirm deployment settings

## 🎯 Custom Domain Setup

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings > Domains
   - Add `elephantfly.tech` or `www.elephantfly.tech`

2. **Update DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 📝 Content Updates

### Adding New Apps

1. **Edit `config/apps.json`**
   ```json
   {
     "id": "newapp",
     "name": "New App Name",
     "tagline": "Your tagline",
     "description": "App description",
     ...
   }
   ```

2. **Add Policy Documents**
   - Create `/policies/newapp/privacy.html`
   - Create `/policies/newapp/terms.html`

3. **Add Assets**
   - Upload icon to `/assets/apps/newapp/icon.png`
   - Upload hero image to `/assets/apps/newapp/hero.jpg`

### Updating Policies

1. Navigate to `/policies/[app-name]/`
2. Edit the relevant HTML file
3. Update the "Last updated" date
4. Deploy changes

## 🔍 Pre-Deployment Checklist

- [ ] Test all links and navigation
- [ ] Verify responsive design on mobile
- [ ] Check policy document dates
- [ ] Validate app configuration in `apps.json`
- [ ] Test contact forms (if applicable)
- [ ] Optimize images (< 200KB each)
- [ ] Review SEO meta tags
- [ ] Test loading performance

## 🛠️ Troubleshooting

### Common Issues

1. **404 on Policy Pages**
   - Check `vercel.json` rewrites
   - Ensure HTML files exist in correct paths

2. **Apps Not Loading**
   - Verify `apps.json` is valid JSON
   - Check browser console for errors

3. **Styles Not Applied**
   - Clear browser cache
   - Check CSS file paths in HTML

4. **Slow Loading**
   - Optimize images (use WebP format)
   - Enable Vercel Edge caching
   - Minimize CSS/JS files

## 📊 Performance Monitoring

### Recommended Tools

- **Google Lighthouse** - Performance auditing
- **GTmetrix** - Speed testing
- **Vercel Analytics** - Real user metrics

### Target Metrics

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

## 🔐 Security Considerations

1. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

2. **Review Headers**
   - Check `vercel.json` security headers
   - Test with securityheaders.com

3. **Monitor for Issues**
   - Set up Vercel notifications
   - Regular security audits

## 📱 Mobile App Links

### iOS App Store
- Ensure proper deep linking
- Test App Store redirect

### Google Play Store
- Verify package names
- Test Play Store redirect

## 🌍 Internationalization (Future)

### Preparation
- Structure content for easy translation
- Use semantic HTML
- Consider RTL language support

## 💡 Best Practices

1. **Version Control**
   - Commit before major changes
   - Use descriptive commit messages
   - Tag releases

2. **Testing**
   - Test on multiple browsers
   - Verify on real devices
   - Check different network speeds

3. **Backup**
   - Keep local backups
   - Use Git branches for experiments
   - Document configuration changes

## 📞 Support

- **Technical Issues**: dev@elephantfly.tech
- **Content Updates**: content@elephantfly.tech
- **Urgent**: hello@elephantfly.tech

---

Last Updated: December 2024
