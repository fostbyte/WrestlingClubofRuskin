# Printify Integration Guide

## Current Setup
The site now includes a Printify shop carousel that displays merchandise. Currently, it's using mock data and placeholder images.

## To Connect Your Real Printify Store:

### Option 1: Printify API Integration (Recommended)
1. **Get your Printify API credentials:**
   - Go to Printify Dashboard → Settings → API
   - Generate API key

2. **Install Printify SDK:**
   ```bash
   npm install @printify/printify-js
   ```

3. **Update the PrintifyShop component:**
   - Replace the mock data with actual API calls
   - Use your real product images and URLs
   - Connect to your Printify store ID

### Option 2: Manual Product Updates (Simple)
1. **Replace mock data in `src/components/PrintifyShop.tsx`:**
   - Update product names, prices, and descriptions
   - Replace placeholder images with your actual product images
   - Update `printifyUrl` with your real Printify store URLs

2. **Your Printify store URL structure:**
   ```
   https://your-store-name.printify.store/products/product-id
   ```

### Option 3: Printify Buy Button (Easiest)
1. **Generate Buy Buttons in Printify:**
   - Go to Printify Dashboard → Products
   - Click "Share" → "Buy Button"
   - Copy the embed code

2. **Replace the carousel with individual buy buttons:**
   - Update the `handleAddToCart` function to use Printify's buy button code
   - Each product will have its own buy button that handles checkout

## Customization Options:

### Product Display
- Change carousel settings (speed, slides shown)
- Modify product card layout
- Add product variants (sizes, colors)

### Styling
- Update colors to match your brand
- Modify card shadows and hover effects
- Adjust spacing and typography

### Functionality
- Add product filtering
- Include product search
- Add wishlist functionality

## Next Steps:
1. Test the current setup with `npm run dev`
2. Choose your integration method
3. Update the component with your real products
4. Deploy to Netlify

## Notes:
- Printify handles all payment processing
- Orders are automatically fulfilled by Printify
- You'll need to update product information manually if not using the API
- Consider adding a "Coming Soon" message for products not yet available


