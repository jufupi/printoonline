# Deployment Guide for Printoonline

## Netlify Deployment

The application uses in-memory mock data, so **no environment variables or database configuration is required**. Simply deploy the application and it will work out of the box!

### Steps to Deploy

1. **Connect your repository to Netlify**
   - Log in to your Netlify Dashboard
   - Click "Add new site" > "Import an existing project"
   - Connect your Git provider and select your repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - These should be detected automatically from `netlify.toml`

3. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Verification

After deployment:

1. Visit your deployed site
2. Go to the **/compare** page
3. Fill out the comparison form:
   - Select a product type (business cards, flyers, posters, or banners)
   - Enter a quantity (e.g., 500)
   - Choose delivery time (standard or express)
4. Submit to see price comparison results from 6 different printers

### Troubleshooting

**Build fails**
- Check the build logs in Netlify dashboard
- Ensure Node.js version is compatible (14.x or later)
- Try clearing the build cache: Deploy settings > Clear build cache

**No results appear when comparing prices**
- Check the browser console for JavaScript errors
- Verify the API endpoint is accessible: `/api/compare`
- Check Netlify function logs for server-side errors

**Page displays but form doesn't work**
- Ensure JavaScript is enabled in the browser
- Check for Content Security Policy (CSP) issues in browser console

## Alternative: Deploy to Vercel

If you prefer Vercel:

1. Import your repository to Vercel
2. The build settings will be detected automatically from Next.js
3. Deploy
4. No environment variables needed!

## Alternative: Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- **Netlify** (recommended, includes `netlify.toml`)
- **Vercel** (recommended for Next.js)
- **Any platform supporting Node.js** (AWS, Google Cloud, Azure, etc.)

## Support

If you continue to have deployment issues:
1. Check the full build logs
2. Ensure Node.js version is 14.x or later
3. Verify all dependencies install correctly
4. Test the build locally first: `npm run build`
