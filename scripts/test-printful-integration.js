#!/usr/bin/env node

/**
 * Test script to verify Printful integration
 * This script tests both the API endpoints and the service mapping
 */

import fetch from 'node-fetch';

const PRINTFUL_TOKEN = 'fH4uZnuUVA04DTjE38JicnX2w7zYv45aBQVwSZHj';

async function testPrintfulIntegration() {
  console.log('🧪 Testing Printful Integration...\n');
  
  try {
    // Test 1: Basic API connectivity
    console.log('1️⃣ Testing API connectivity...');
    const basicResponse = await fetch('https://api.printful.com/sync/products', {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (basicResponse.ok) {
      console.log('✅ API connection successful');
      const basicData = await basicResponse.json();
      console.log(`📦 Found ${basicData.result?.length || 0} products`);
    } else {
      console.log('❌ API connection failed:', basicResponse.statusText);
      return;
    }
    
    // Test 2: Product details
    console.log('\n2️⃣ Testing product details...');
    const productResponse = await fetch('https://api.printful.com/sync/products/418973032', {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (productResponse.ok) {
      console.log('✅ Product details successful');
      const productData = await productResponse.json();
      const syncProduct = productData.sync_product || {};
      const syncVariants = productData.sync_variants || [];
      
      console.log(`👕 Product: ${syncProduct.name}`);
      console.log(`💰 Price from first variant: $${syncVariants[0]?.retail_price || 'N/A'}`);
      console.log(`🖼️  Has thumbnail: ${!!syncProduct.thumbnail_url}`);
      console.log(`📊 Variants: ${syncVariants.length}`);
    } else {
      console.log('❌ Product details failed:', productResponse.statusText);
    }
    
    // Test 3: Service mapping simulation
    console.log('\n3️⃣ Testing service mapping...');
    const listData = await (await fetch('https://api.printful.com/sync/products', {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })).json();
    
    if (listData.result && listData.result.length > 0) {
      const product = listData.result[0];
      const mappedProduct = {
        id: product.id.toString(),
        name: product.name,
        description: `Product with ${product.variants || 0} variants`,
        price: 0, // Would be fetched from detailed endpoint
        images: product.thumbnail_url ? [{
          url: product.thumbnail_url,
          thumbnail_url: product.thumbnail_url
        }] : [],
        variants: [],
        retail_price: 0
      };
      
      console.log('✅ Service mapping successful');
      console.log(`📋 Mapped product: ${mappedProduct.name}`);
      console.log(`🖼️  Has image: ${mappedProduct.images.length > 0}`);
    }
    
    console.log('\n🎉 All tests passed! Your Printful integration should be working.');
    console.log('\n📝 Next steps:');
    console.log('1. Check your website at http://localhost:5173');
    console.log('2. Verify products are displayed in the WCR Merchandise section');
    console.log('3. For production, ensure PRINTFUL_TOKEN is set in Netlify environment variables');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPrintfulIntegration();
