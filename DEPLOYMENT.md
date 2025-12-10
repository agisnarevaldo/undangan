# 🚀 Deployment Guide for Next.js Wedding Invitation

This guide covers various deployment options for the Next.js wedding invitation website.

## 📋 Pre-Deployment Checklist

Before deploying, make sure to:

1. ✅ Update wedding information in `components/GuestPage.tsx`
2. ✅ Update metadata in `app/layout.tsx`
3. ✅ Replace placeholder images in `public/assets/images/`
4. ✅ Test the build locally: `npm run build`
5. ✅ Verify the static export in the `out/` directory

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the company behind Next.js and provides the best deployment experience.

#### Steps:

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

**Configuration:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `out`

#### Environment Variables (if needed):
```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_TENOR_KEY=your-tenor-key
```

### Option 2: Netlify

Netlify provides excellent static site hosting with continuous deployment.

#### Steps:

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
6. Click "Deploy site"

#### netlify.toml Configuration:

Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

Deploy directly to GitHub Pages for free hosting.

#### Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. The static files will be in the `out/` directory

3. **Option A: Manual Upload**
   - Go to your repository Settings → Pages
   - Upload the contents of the `out/` directory

4. **Option B: GitHub Actions**
   
   Create `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy Next.js to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '20'
           
       - name: Install dependencies
         run: npm install
         
       - name: Build
         run: npm run build
         
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

5. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / root

### Option 4: Firebase Hosting

Firebase provides fast and secure hosting.

#### Steps:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```

   Select:
   - Public directory: `out`
   - Configure as single-page app: No
   - Set up automatic builds: No

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

#### firebase.json Configuration:

```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

### Option 5: AWS S3 + CloudFront

For AWS hosting with CDN distribution.

#### Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Create an S3 bucket:
   - Enable static website hosting
   - Set index document to `index.html`

3. Upload the `out/` directory to S3:
   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

4. Create CloudFront distribution:
   - Origin: Your S3 bucket
   - Default root object: `index.html`

5. Update DNS to point to CloudFront distribution

### Option 6: Traditional Web Hosting

For any shared hosting or VPS.

#### Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `out/` directory to your web host:
   - Via FTP/SFTP
   - Via cPanel File Manager
   - Via hosting control panel

3. Configure your web server:

   **Apache (.htaccess):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx:**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## 🔧 Configuration Updates for Deployment

### Update Base Path (if deploying to subdirectory)

If deploying to a subdirectory (e.g., `yourdomain.com/wedding`), update `next.config.js`:

```javascript
const nextConfig = {
  basePath: '/wedding',
  // ... other config
}
```

### Update Asset Paths

If using a custom domain or CDN, update image references in:
- `components/GuestPage.tsx`
- `components/DashboardPage.tsx`
- `app/layout.tsx`

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_TENOR_KEY=your-tenor-api-key
```

For production, set these in your hosting platform's environment variables section.

## 🎯 Post-Deployment Testing

After deployment, verify:

1. ✅ Home page loads correctly
2. ✅ Guest name parameter works: `?to=YourName`
3. ✅ Countdown timer is working
4. ✅ All images load properly
5. ✅ Gallery carousel functions
6. ✅ Google Maps link works
7. ✅ Dashboard page is accessible
8. ✅ Mobile responsiveness
9. ✅ Bootstrap components work (carousel, modals)
10. ✅ Animations trigger on scroll

## 📊 Performance Optimization

After deployment:

1. **Test Performance:**
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

2. **Enable Compression:**
   - Most platforms enable this by default
   - Verify gzip/brotli compression is active

3. **CDN Configuration:**
   - Use a CDN for static assets
   - Configure caching headers

4. **Image Optimization:**
   - Compress images before deployment
   - Use WebP format where possible
   - Implement lazy loading (already included)

## 🔒 Security Considerations

1. **HTTPS:** Ensure your deployment uses HTTPS
2. **CORS:** Configure CORS if using external APIs
3. **Environment Variables:** Never commit sensitive keys to Git
4. **API Keys:** Use environment variables for API keys

## 🆘 Troubleshooting

### Build Fails

- Check Node.js version (18+ or 20+)
- Clear cache: `rm -rf .next out node_modules && npm install`
- Check for TypeScript errors

### Images Not Loading

- Verify images are in `public/assets/` directory
- Check image paths in components
- Ensure `unoptimized: true` in `next.config.js` for static export

### Routing Issues

- For static export, use client-side routing
- Check base path configuration
- Verify server redirects for SPA behavior

### Styles Not Applied

- Confirm CSS files are in `public/css/`
- Check Bootstrap and FontAwesome CDN links
- Verify `globals.css` imports

## 📞 Support

If you encounter issues during deployment:

1. Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
2. Review platform-specific guides (Vercel, Netlify, etc.)
3. Open an issue on GitHub
4. Contact the original template author

---

**Happy Deploying! 🎉**
