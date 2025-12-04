# 🚀 Deployment Guide - Vercel

## Quick Deploy Steps

### Step 1: Push to GitHub

1. **Create GitHub Repository**
   - Go to [GitHub.com](https://github.com)
   - Click "New Repository"
   - Name it: `kiddyguard-zypherpunk` (or `kiddyguard-sentinel`)
   - Set to **Public** (required for Vercel free tier)
   - **DO NOT** initialize with README (we already have one)

2. **Add Remote and Push**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kiddyguard-zypherpunk.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Vercel

1. **Sign Up / Login**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up using your **GitHub account** (recommended)

2. **Import Project**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find `kiddyguard-zypherpunk` and click "Import"

3. **Configure Environment Variables** ⚠️ **CRITICAL**
   
   **DO NOT click Deploy yet!**
   
   Open the "Environment Variables" section and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_USE_MOCK_AGENT` | `true` |
   | `NEXT_PUBLIC_NEAR_NETWORK` | `testnet` |
   
   Click "Add" for each variable.

4. **Deploy**
   - Click the big "Deploy" button
   - Wait 1-2 minutes for build to complete
   - You'll get a live URL: `https://kiddyguard-zypherpunk.vercel.app`

### Step 3: Verify Deployment

1. Visit your live URL
2. Test the complete flow:
   - Connect wallet
   - Upload video
   - View results
   - Claim grant

---

## 🔗 Vercel URLs

Vercel provides multiple URLs:

1. **Main URL**: `https://kiddyguard-zypherpunk.vercel.app`
2. **Branch URL**: `https://kiddyguard-zypherpunk-git-main-YOUR_USERNAME.vercel.app`
3. **Preview URLs**: For each commit/PR

**Hackathon Tip**: Use the main URL for submission, but keep branch URL as backup (some firewalls block `.vercel.app` domains).

---

## 🔧 Troubleshooting

### Build Fails
- Check Environment Variables are set correctly
- Verify `NEXT_PUBLIC_USE_MOCK_AGENT=true` is set
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Make sure variable names start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding variables
- Check Vercel dashboard → Settings → Environment Variables

### Wallet Connection Issues
- Ensure `NEXT_PUBLIC_NEAR_NETWORK=testnet` is set
- Test with NEAR Wallet browser extension
- Check browser console for errors

---

## 📝 Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Build successful (no errors)
- [ ] Landing page loads correctly
- [ ] Wallet connection works
- [ ] Scanner page accessible
- [ ] Grant claim flow works
- [ ] All animations working
- [ ] Mobile responsive (test on phone)

---

## 🎯 Hackathon Submission

**Live Demo URL**: `https://kiddyguard-zypherpunk.vercel.app`

**Backup URL**: `https://kiddyguard-zypherpunk-git-main-YOUR_USERNAME.vercel.app`

**GitHub Repository**: `https://github.com/YOUR_USERNAME/kiddyguard-zypherpunk`

---

## 💡 Why Vercel?

- ✅ Zero configuration (works out of the box with Next.js)
- ✅ Free SSL/HTTPS automatically
- ✅ Perfect Next.js 14 App Router support
- ✅ Instant deployments
- ✅ Free tier is generous
- ✅ Reliable (judges can access it)

**Note**: While IPFS/Fleek is cool for "cypherpunk" hosting, Next.js 14 App Router requires special configuration for static export. Vercel is the safest choice for hackathon deadlines.

---

## 🚨 Important Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Environment Variables** must be set in Vercel dashboard
3. **Mock Mode** is enabled by default (`NEXT_PUBLIC_USE_MOCK_AGENT=true`)
4. **Test thoroughly** before submission deadline

---

**Ready to deploy? Follow the steps above!** 🚀

