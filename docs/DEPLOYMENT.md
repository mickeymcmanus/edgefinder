# Deployment Guide

This guide covers how to deploy EdgeFinder to various platforms and environments.

## 🚀 Current Deployment

**Live Application:** https://edgefinder-r-d-explo-v4nu.bolt.host

EdgeFinder is currently deployed on **Bolt Hosting**, which provides:
- ✅ **Static site hosting** with global CDN
- ✅ **Automatic builds** from source code
- ✅ **Custom domain support**
- ✅ **SSL certificates** (HTTPS)
- ✅ **Performance optimization**

## 🏗️ Build Process

### **Development Build**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:5173
```

### **Production Build**
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Build output in /dist directory
```

### **Build Configuration**
The build process uses **Vite** with the following optimizations:
- **TypeScript compilation** with type checking
- **CSS optimization** with Tailwind CSS purging
- **Asset optimization** (images, fonts, etc.)
- **Code splitting** for optimal loading
- **Tree shaking** to remove unused code

## 🌐 Deployment Platforms

### **1. Bolt Hosting (Current)**

**Advantages:**
- Integrated with development environment
- Automatic deployments
- Built-in CDN and SSL
- Custom domain support

**Deployment Steps:**
1. Code is automatically built and deployed
2. Access via provided URL
3. Set up custom domain if needed

### **2. Netlify**

**Setup:**
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables (in Netlify dashboard)
VITE_EDGEFINDER_API_KEY=your_api_key
VITE_SUPERCONNECTOR_API_URL=https://api.superconnector.network/v1
VITE_SUPERCONNECTOR_CLIENT_ID=your_client_id
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **3. Vercel**

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **4. GitHub Pages**

**Setup with GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_EDGEFINDER_API_KEY: ${{ secrets.VITE_EDGEFINDER_API_KEY }}
        VITE_SUPERCONNECTOR_API_URL: ${{ secrets.VITE_SUPERCONNECTOR_API_URL }}
        VITE_SUPERCONNECTOR_CLIENT_ID: ${{ secrets.VITE_SUPERCONNECTOR_CLIENT_ID }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### **5. AWS S3 + CloudFront**

**Setup:**
```bash
# Install AWS CLI
aws configure

# Build application
npm run build

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

**S3 Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## 🔧 Environment Configuration

### **Environment Variables**
Create `.env` file for local development:
```env
# EdgeFinder Configuration
VITE_EDGEFINDER_API_KEY=your_edgefinder_api_key_here

# SuperConnector Integration
VITE_SUPERCONNECTOR_API_URL=https://api.superconnector.network/v1
VITE_SUPERCONNECTOR_CLIENT_ID=your_superconnector_client_id

# Convergent Research Integration  
VITE_CONVERGENT_RESEARCH_API_KEY=your_convergent_research_api_key
```

### **Production Environment Variables**
Set these in your deployment platform:
- `VITE_EDGEFINDER_API_KEY`
- `VITE_SUPERCONNECTOR_API_URL`
- `VITE_SUPERCONNECTOR_CLIENT_ID`
- `VITE_CONVERGENT_RESEARCH_API_KEY`

## 🔒 Security Configuration

### **Content Security Policy**
Add to your hosting platform or `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.superconnector.network https://convergentresearch.org;
  font-src 'self';
">
```

### **HTTPS Configuration**
- **Always use HTTPS** in production
- **Redirect HTTP to HTTPS**
- **Use HSTS headers** for security

## 📊 Performance Optimization

### **Build Optimizations**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### **CDN Configuration**
- **Static assets** served from CDN
- **Gzip/Brotli compression** enabled
- **Cache headers** properly configured
- **Image optimization** for web formats

## 🔍 Monitoring & Analytics

### **Performance Monitoring**
```javascript
// Add to index.html
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### **Error Tracking**
Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Google Analytics** for usage analytics

## 🚨 Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Analyze bundle
npm run build:analyze
```

#### **Environment Variable Issues**
- Ensure variables start with `VITE_`
- Check variable names match exactly
- Verify values are set in deployment platform

#### **Routing Issues (SPA)**
Add redirect rules for single-page application:
```
/*    /index.html   200
```

#### **API Connection Issues**
- Check CORS configuration
- Verify API endpoints are accessible
- Test with fallback data

### **Debug Mode**
Enable debug logging:
```typescript
// Add to main.tsx
if (import.meta.env.DEV) {
  console.log('EdgeFinder Debug Mode Enabled');
  window.EdgeFinderDebug = true;
}
```

## 🔄 CI/CD Pipeline

### **GitHub Actions Example**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run type-check
    - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - name: Deploy to Production
      run: |
        # Your deployment script here
```

## 📋 Deployment Checklist

### **Pre-Deployment**
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Environment variables configured
- [ ] Build optimization verified
- [ ] Security headers configured

### **Post-Deployment**
- [ ] Application loads correctly
- [ ] All features functional
- [ ] API integrations working
- [ ] Performance metrics acceptable
- [ ] Error tracking configured
- [ ] Analytics implemented

### **Production Readiness**
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] Documentation updated

---

**Need help with deployment?** Check our [GitHub Discussions](https://github.com/yourusername/edgefinder/discussions) or create an [issue](https://github.com/yourusername/edgefinder/issues).