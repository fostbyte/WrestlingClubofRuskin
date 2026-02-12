# Printful Integration Guide

## Overview
This project has been migrated from Printify to Printful for merchandise sales. The integration uses Printful's REST API to fetch and display products on the website.

## Setup Instructions

### 1. Get Printful API Credentials
1. Sign up for a Printful account at https://www.printful.com/
2. Go to Settings > Store > Add Store
3. Set up your store and get your API token
4. Note your API token - this will be used for authentication

### 2. Environment Variables

#### Development
Create a `.env` file in your project root:
```env
VITE_PRINTFUL_TOKEN=your_printful_token_here
```

#### Production (Netlify)
Add the following environment variable in Netlify Dashboard:
1. Go to Site settings → Build & deploy → Environment
2. Add: `PRINTFUL_TOKEN=your_printful_token_here`

### 3. API Integration

#### Service Layer
- `src/services/printfulService.ts` - Handles API communication with Printful
- Supports both development (direct API calls) and production (via Netlify proxy)

#### Netlify Proxy
- `netlify/functions/printful-proxy.js` - Secure proxy for production API calls
- Routes requests through Netlify functions to hide API tokens

#### Component
- `src/components/PrintifyShop.tsx` - Display component (renamed from PrintifyShop but kept for consistency)
- Fetches products using the Printful service
- Displays products in a carousel format

## API Endpoints Used

### Get Store Products
```
GET /store/products
```
Returns all products from your Printful store.

### Get Single Product
```
GET /store/products/{id}
```
Returns details for a specific product.

## Product Data Structure

```typescript
interface PrintfulProduct {
  id: string
  name: string
  description: string
  price: number
  images: Array<{
    url: string
    thumbnail_url?: string
  }>
  variants: Array<{
    id: string
    name: string
    price: number
  }>
  retail_price: number
}
```

## Deployment Notes

1. Ensure `PRINTFUL_TOKEN` is set in Netlify environment variables
2. The proxy function automatically handles authentication
3. Products are fetched client-side in development, server-side in production

## Troubleshooting

### Common Issues

1. **No products showing**
   - Check your Printful store has published products
   - Verify API token is correct and has proper permissions
   - Check Netlify environment variables are set

2. **API errors**
   - Verify Printful API token is valid
   - Check if your store is properly configured in Printful
   - Ensure products are published and available

3. **Build errors**
   - Make sure all environment variables are properly set
   - Check that the Netlify function is properly deployed

## Migration from Printify

The following changes were made during migration:
- Replaced `printifyService.ts` with `printfulService.ts`
- Updated API endpoints from Printify to Printful format
- Changed product data structure to match Printful's response format
- Updated environment variable names
- Modified Netlify proxy function for Printful API

## Support

For Printful-specific issues:
- Printful API Documentation: https://www.printful.com/docs/
- Printful Support: https://www.printful.com/support/

For integration issues:
- Check the browser console for JavaScript errors
- Verify network requests in browser dev tools
- Check Netlify function logs for API errors
