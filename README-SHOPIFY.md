# Shopify Integration Setup Guide

This guide will help you set up the Shopify integration with Ninjaprint POD app for the Wrestling Club of Ruskin website.

## Prerequisites

1. A Shopify store with the Ninjaprint POD app installed
2. Products created in your Shopify store
3. Storefront API access token from Shopify

## Setup Instructions

### 1. Configure Environment Variables

Update the `.env` file with your Shopify store details:

```env
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
SHOPIFY_API_VERSION=2024-01
```

### 2. Get Your Shopify Store URL

Your store URL is typically in the format: `your-store-name.myshopify.com`

### 3. Create a Storefront API Access Token

1. Go to your Shopify Admin
2. Navigate to **Apps** > **Develop apps**
3. Click **Create an app**
4. Give it a name (e.g., "Wrestling Club Website")
5. Configure the **Admin API integration** and **Storefront API integration**
6. For Storefront API, grant these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_product_inventory`
7. Install the app and copy the Storefront API access token

### 4. Configure Ninjaprint POD App

1. Install the Ninjaprint POD app from the Shopify App Store
2. Configure your products with customization options
3. Set up the custom attributes mapping:
   - `_customizer_name` - Customer's name
   - `_customizer_weight_class` - Weight class selection
   - `_ninjaprint_customization` - Flag for customizations

### 5. Product Setup

Make sure your products in Shopify have:
- Proper variants with pricing
- Product images
- Tags for organization (optional)

## How It Works

### Product Display
- Products are fetched from your Shopify store using the Storefront API
- Displayed in a responsive carousel
- Shows product images, names, and prices

### Customization Process
1. User selects a product from the carousel
2. Customization form expands with:
   - Name field (max 20 characters)
   - Weight class dropdown (standard wrestling weight classes)
3. When "Apply Customization" is clicked:
   - A Shopify checkout is created with custom attributes
   - Custom attributes are passed to Ninjaprint for POD fulfillment
   - User is redirected to Shopify checkout to complete purchase

### Direct Purchase
- Users can also click "Buy on Shopify" for direct purchase without customization

## Custom Attributes for Ninjaprint

The system passes these custom attributes to Shopify checkout:

```javascript
{
  "_customizer_name": "John Doe",
  "_customizer_weight_class": "132",
  "_ninjaprint_customization": "true"
}
```

Make sure your Ninjaprint app is configured to read these attributes and apply them to the back of the shirt.

## Testing

1. Update your `.env` file with real Shopify credentials
2. Open the website in a browser
3. Navigate to the "Gear" section
4. Products should load from your Shopify store
5. Test the customization flow:
   - Enter a name
   - Select a weight class
   - Click "Apply Customization"
   - Verify you're redirected to Shopify checkout
6. Test direct purchase without customization

## Troubleshooting

### Products Not Loading
- Check your `.env` file for correct store URL and access token
- Verify the Storefront API token has the correct permissions
- Check browser console for API errors

### Checkout Creation Fails
- Ensure the product variant ID is valid
- Check that the product is available for sale
- Verify custom attributes are properly formatted

### Customizations Not Applied
- Make sure Ninjaprint app is properly configured
- Verify custom attribute names match exactly
- Check Ninjaprint app documentation for attribute mapping

## File Structure

```
├── index.html          # Main HTML file
├── script.js           # Main JavaScript with Shopify integration
├── shopify.js          # Shopify API wrapper class
├── styles.css          # Styling (unchanged)
├── .env               # Environment variables
└── package.json       # Dependencies
```

## Support

For issues related to:
- Shopify API: Check Shopify documentation
- Ninjaprint app: Contact Ninjaprint support
- Website functionality: Review the code and console errors
