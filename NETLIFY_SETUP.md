# Netlify Environment Setup for Printify Integration

## 🔐 Step 1: Add Environment Variables to Netlify

### **Via Netlify Dashboard (Recommended)**

1. **Log into Netlify**: https://app.netlify.com
2. **Select your site**: `ruskinwrestlingsite.netlify.app`
3. **Go to Site Settings** → **Build & deploy** → **Environment**
4. **Add these variables**:

| Variable Name | Value |
|--------------|--------|
| `VITE_PRINTIFY_TOKEN` | Your Printify API token |
| `VITE_PRINTIFY_SHOP_ID` | Your Printify Shop ID |

### **How to find your Printify Shop ID:**
1. Go to Printify Dashboard
2. Click on your store
3. Look at the URL: `https://printify.com/shops/[SHOP_ID]/...`
4. The number in brackets is your Shop ID

## 🚀 Step 2: Deploy to Netlify

### **Option A: Automatic Deploy (GitHub Connected)**
```bash
git add .
git commit -m "Add Printify integration with environment variables"
git push origin main
```

### **Option B: Manual Deploy**
```bash
# Install Netlify CLI (already done)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## 🔧 Step 3: Test the Integration

1. **Check environment variables** are working
2. **Verify products load** from your Printify store
3. **Test purchase flow** opens Printify checkout
4. **Monitor console** for any API errors

## 🛠️ Troubleshooting

### **Common Issues:**

#### **Netlify Setup Instructions**

## Environment Variables

### In Netlify Dashboard (Site Settings → Build & deploy → Environment)

**Required Environment Variables:**
- `PRINTIFY_TOKEN`: Your Printify API token (server-side only)
- `VITE_PRINTIFY_SHOP_ID`: Your Printify shop ID (client-side)

**Important Security Notes:**
- `PRINTIFY_TOKEN` is now server-side only and will NOT be exposed to the browser
- `VITE_PRINTIFY_SHOP_ID` is safe for client-side use as it's not sensitive
- Never add `VITE_PRINTIFY_TOKEN` as it would expose your API token to users

## Architecture Changes

The application now uses a serverless function proxy to secure your Printify API token:

1. **Client-side**: React app calls `/.netlify/functions/printify-proxy/*`
2. **Serverless function**: Proxies requests to Printify API with server-side token
3. **Security**: API token is never exposed in browser bundle

## Deployment

1. Push your changes to Git
2. Netlify will automatically build and deploy
3. Add environment variables in Netlify Dashboard
4. The build should now pass secrets scanning

#### **Build errors:**
- Ensure environment variables are set in Netlify (not just locally)
- Check variable names match exactly (case-sensitive)

#### **CORS issues:**
- Printify API should work from client-side
- If issues occur, may need server-side proxy

## 📱 Local Development

Create a `.env.local` file for local testing:
```env
VITE_PRINTIFY_SHOP_ID=your_shop_id_here
```

**Important:** `.env.local` is in `.gitignore` and won't be deployed to Netlify.

## 🔍 Debug Mode

The PrintifyShop component includes:
- **Loading states** while fetching products
- **Error handling** with fallback to mock data
- **Console logging** for debugging
- **Fallback products** if API fails

## 📊 Expected Behavior

1. **Page loads** → Shows loading spinner
2. **API call** → Fetches your Printify products
3. **Success** → Displays your actual products
4. **Fallback** → Shows mock products if API fails
5. **Click product** → Opens Printify checkout in new tab

## 🎯 Next Steps

After setup:
1. **Deploy and test** the integration
2. **Update product images** in Printify dashboard
3. **Customize product descriptions** 
4. **Monitor sales** through Printify dashboard
5. **Set up shipping** and tax settings in Printify

## 🔒 Security Notes

- ✅ Token is server-side only (Netlify environment)
- ✅ No sensitive data in client code
- ✅ API calls are read-only (products only)
- ✅ Printify handles all payment processing
