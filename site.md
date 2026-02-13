<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 1. No logo for now. I will design one later. Have a place holder

2. a library is fine
3. I will my designs on printful's dashboard. They should auto sync to my site

Here's the finalized PRD **Version 1.2** incorporating your clarifications. I've updated the wireframe with a **placeholder logo**, specified **Swiper.js** (lightweight CDN library for the carousel), and confirmed **Printful dashboard management with API sync** (you create/upload designs in Printful's dashboard, then the site pulls live product data via API).[^1][^2]

***

# Product Requirements Document (PRD)

**Project Name:** Wrestling Club of Ruskin — “The Little Horns” Website
**Version:** 1.2
**Date:** February 2026
**Owner:** Wrestling Club of Ruskin
**Contact:** ruskin.lennard.wrestling@gmail.com, 402-215-5111, Instagram @lennardwrestlin

***

## 1. Overview

Modern single-page site for the Wrestling Club of Ruskin (“The Little Horns”). Features a Printful-powered fundraiser carousel (products auto-sync from your Printful dashboard), coming-soon info placeholders, and contact details. Hosted on Netlify with easy maintenance in mind.

***

## 2. Objectives

- Bold, athletic landing page for club awareness.
- Live fundraiser merch carousel (pulls from Printful API).
- Transparent “coming soon” placeholders for key info.
- Minimal JS dependency using CDN library.

***

## 3. Technical Stack

- **Hosting:** Netlify.
- **Frontend:** HTML/CSS + Swiper.js CDN for carousel.[^3][^4]
- **API:** Netlify Function (`/.netlify/functions/printful-products`) fetches from Printful API using `PRINTFUL_API_KEY` env var.[^1]
- **Printful Integration:**
    - You manage designs/products entirely in Printful dashboard (create, upload, set pricing).
    - Site auto-syncs via API call to `/store/products` or `/sync-products` endpoint (fetches thumbnails, names, prices, links).[^2][^1]
    - "Buy" buttons link directly to Printful product pages for checkout.

***

## 4. Design Requirements

### Colors

- Purple (\#4B0082), Black (\#000000), Gold (\#FFD700), White (\#FFFFFF).


### Typography

- Headings: Montserrat Bold.
- Body: Poppins Regular.

***

## 5. Wireframe (Updated with Your Specs)

**Placeholder Logo:** Use a temporary text-based logo like “LH” in gold on purple circle, or simple “Little Horns Wrestling” styled text. Reserve `<div class="logo-placeholder">` for future swap.

**Full Page Structure (Desktop View Sketch)**:

```text
HEADER (sticky top bar)
┌─────────────────────────────────────────────────┐
│ [LOGO PLACEHOLDER: "Little Horns Wrestling"]     │ Nav: About | Info | Gear | Contact
└─────────────────────────────────────────────────┘

HERO (full-width, purple bg)
┌─────────────────────────────────────────────────┐
│                                                  │
│     H1: "Little Horns Wrestling Club"            │
│     "Youth wrestling in Ruskin, FL"              │
│     "Building champions. Season info coming soon"│
│                                                  │
│                [CTA: "Get Info ↓"]               │
│                                                  │
└─────────────────────────────────────────────────┘

ABOUT
┌─────────────────────────────────────────────────┐
│ H2: "About Us"                                  │
│ Short para: "Community-focused wrestling club..."│
└─────────────────────────────────────────────────┘

INFO (2x2 grid cards)
┌───────────────────┬───────────────────┐
│ Dates             │ Coaches           │
│ Coming Soon       │ Coming Soon       │
├───────────────────┼───────────────────┤
│ Location          │ Cost              │
│ Coming Soon       │ Coming Soon       │
└───────────────────┴───────────────────┘

FUNDRAISER GEAR (Swiper Carousel)
┌─────────────────────────────────────────────────┐
│ H2: "Fundraiser Gear"                           │
│ "Support the club — all proceeds help us grow." │
│                                                  │
│ < [PREV]  [PRODUCT CARD]  [NEXT] >               │
│                                                  │
│ Product Card Example:                           │
│ ┌─────────────────────────────┐                 │
│ │ [Image from Printful]       │                 │
│ │ Hoodie - Little Horns       │                 │
│ │ $29.99                      │                 │
│ │ [Buy on Printful →]         │                 │
│ └─────────────────────────────┘                 │
│ Dots: • ○ ○                                     │
└─────────────────────────────────────────────────┘

CONTACT
┌─────────────────────────────────────────────────┐
│ H2: "Get In Touch"                              │
│ 📧 ruskin.lennard.wrestling@gmail.com           │
│ 📞 402-215-5111                                 │
│ 📱 @lennardwrestlin on Instagram                │
└─────────────────────────────────────────────────┘

FOOTER (thin black bar)
┌─────────────────────────────────────────────────┐
│ © 2026 Wrestling Club of Ruskin                 │ [IG icon]
└─────────────────────────────────────────────────┘
```

**Mobile Adjustments:**

- Nav collapses to hamburger menu.
- Info cards stack vertically.
- Carousel shows 1 product at a time with swipe gestures.

***

## 6. Implementation Notes

### 6.1 Logo Placeholder

```html
<div class="logo-placeholder">
  <h1 style="color: #FFD700; font-family: 'Montserrat', sans-serif;">
    LH<br>Wrestling
  </h1>
  <!-- TODO: Replace with logo.svg when ready -->
</div>
```


### 6.2 Carousel (Swiper.js)

```
- CDN: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">` and `<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>`[^4][^3]
```

```
- HTML: `<div class="swiper"> <div class="swiper-wrapper"> <!-- Products inserted here --> </div> <div class="swiper-button-next"></div> ... </div>`  
```

- JS Init: After fetching products, loop to create slides, then `new Swiper('.swiper', { loop: true, navigation: {...} });`


### 6.3 Printful Sync

- Netlify Function (Node.js):

```js
const fetch = require('node-fetch');
exports.handler = async (event) => {
  const key = process.env.PRINTFUL_API_KEY;
  const res = await fetch('https://api.printful.com/store/products', {
    headers: { Authorization: `Bearer ${key}` }
  });
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data.result) };
};
```

- Frontend JS: `fetch('/.netlify/functions/printful-products').then(...)` → populate Swiper slides.
- Auto-sync: Products update live when you change them in Printful dashboard (no manual pushes needed).[^5][^1]

***

## 7. Next Steps for You

- Set up Printful API key and test dashboard products.
- Fork a starter repo or build from the wireframe.
- Deploy to Netlify, add env var.

This is ready to code — let me know if you want me to generate starter HTML/CSS/JS files or the full Netlify Function code!
<span style="display:none">[^10][^11][^12][^13][^14][^15][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://developers.printful.com/docs/

[^2]: https://help.printful.com/hc/en-us/articles/11818539480348-How-do-I-manually-sync-products-to-my-store

[^3]: https://www.bizstream.com/blog/building-carousels-with-swiper/

[^4]: https://www.gracefulwebstudio.com/blog-articles/the-easiest-accessible-swiper-js-carousel-solution-to-date

[^5]: https://help.printful.com/hc/en-us/articles/360014007240-How-do-I-add-products-to-my-store

[^6]: https://www.printful.com/api

[^7]: https://www.reddit.com/r/printful/comments/10vl9zk/printful_api_to_create_and_push_synced_product/

[^8]: https://www.ultimatewb.com/blog/5216/tutorial-easiest-way-to-integrate-your-custom-website-with-printful/

[^9]: https://pipedream.com/apps/printful

[^10]: https://www.printful.com/integrations

[^11]: https://developers.printful.com/docs/v2-beta/

[^12]: https://www.printful.com/glossary/integrations

[^13]: https://stackoverflow.com/questions/77438292/how-to-use-swiper-modules-from-cdn-build-in-browser

[^14]: https://stackoverflow.com/questions/75667535/create-product-in-printful-using-api-python

[^15]: https://www.youtube.com/watch?v=pH2ZaBKQhK4

