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
PRINTFUL_TOKEN=your_printful_token_here
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
GET /sync/products
```
Returns all products from your Printful store. This is the correct endpoint for sync products.

### Get Single Product
```
GET /sync/products/{id}
```
Returns details for a specific product, including variants and pricing.

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

**Important**: The `/sync/products` endpoint returns a different structure than `/store/products`. The sync endpoint returns:
- `id`, `name`, `variants`, `synced`, `thumbnail_url`, `is_ignored`
- Detailed product info (including pricing) requires fetching individual products via `/sync/products/{id}`

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
   - Ensure you're using `/sync/products` endpoint, not `/store/products`

2. **API errors**
   - Verify Printful API token is valid
   - Check if your store is properly configured in Printful
   - Ensure products are published and available
   - Make sure proxy function allows `/sync/products` endpoints

3. **Build errors**
   - Make sure all environment variables are properly set
   - Check that the Netlify function is properly deployed

4. **Products showing but no prices**
   - The `/sync/products` list endpoint doesn't include pricing
   - Service fetches individual product details to get pricing
   - Check if individual product API calls are working

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
