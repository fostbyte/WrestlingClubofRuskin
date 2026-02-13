# Wrestling Club of Ruskin - The Little Horns

A modern single-page website for the Wrestling Club of Ruskin, featuring a Printful-powered fundraiser merchandise carousel.

## Features

- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Printful Integration**: Live product sync from Printful dashboard
- **Product Customization**: Add name and weight class to shirt backs
- **Modern UI**: Clean, athletic design with club colors (Purple, Gold, Black, White)
- **Smooth Animations**: Swiper.js carousel for merchandise
- **Contact Section**: Easy access to contact information and social media

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS variables
- **Carousel**: Swiper.js (CDN)
- **Hosting**: Netlify
- **Backend**: Netlify Functions for Printful API integration
- **Fonts**: Google Fonts (Montserrat, Poppins)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd WrestlingClubofRuskin
```

### 2. Install Netlify Function Dependencies
```bash
cd netlify/functions
npm install
cd ../..
```

### 3. Configure Environment Variables
1. Copy `.env.example` to `.env` (for local development)
2. Set up your Printful API key:
   - Get your API key from [Printful Dashboard](https://www.printful.com/dashboard/api)
   - Add `PRINTFUL_API_KEY` to your Netlify environment variables

### 4. Local Development
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local development server
netlify dev
```

### 5. Deploy to Netlify
1. Connect your repository to Netlify
2. Set the `PRINTFUL_API_KEY` environment variable in Netlify dashboard
3. Deploy!

## Printful Integration

The website automatically syncs products from your Printful store:

1. **Manage Products**: Create and manage products in your Printful dashboard
2. **Auto-Sync**: The website fetches live product data via the Printful API
3. **Checkout**: "Buy" buttons link directly to Printful product pages

### API Endpoint
- `/.netlify/functions/printful-products` - Fetches products from Printful
- `/.netlify/functions/customize-product` - Handles product customization requests

## Product Customization

The website allows customers to customize the back of wrestling shirts with:
- **Name**: Up to 20 characters
- **Weight Class**: Standard wrestling weight classes (106-285 lbs)

### Customization Workflow:
1. Customer fills out name and weight class in the product card
2. Clicks "Apply Customization" button
3. System processes the customization request
4. Customer receives confirmation message
5. Customization details are logged for order processing

### Current Implementation:
- **Frontend**: Form validation and user feedback
- **Backend**: API endpoint processes customization requests
- **Storage**: Customization details logged (ready for order integration)
- **Next Steps**: Integration with Printful order creation API

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --purple: #4B0082;
    --black: #000000;
    --gold: #FFD700;
    --white: #FFFFFF;
}
```

### Typography
- **Headings**: Montserrat Bold
- **Body**: Poppins Regular

### Logo
Replace the placeholder logo in the `.logo-placeholder` div with your actual logo.

## File Structure

```
WrestlingClubofRuskin/
├── index.html              # Main HTML file
├── styles.css              # Styles and responsive design
├── script.js               # JavaScript functionality
├── netlify/
│   └── functions/
│       ├── package.json    # Function dependencies
│       └── printful-products.js  # Printful API integration
├── netlify.toml            # Netlify configuration
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Contact Information

- **Email**: ruskin.lennard.wrestling@gmail.com
- **Phone**: 402-215-5111
- **Instagram**: @lennardwrestlin

## License

© 2026 Wrestling Club of Ruskin
