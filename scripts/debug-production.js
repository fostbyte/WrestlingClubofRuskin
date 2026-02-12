#!/usr/bin/env node

/**
 * Debug script to check production deployment issues
 */

console.log('🔍 Debugging Production Issues...\n');

console.log('📋 Production Checklist:');
console.log('1. ✅ Proxy function code updated to allow /sync/products');
console.log('2. ❓ PRINTFUL_TOKEN environment variable in Netlify');
console.log('3. ❓ Proxy function deployed to Netlify');
console.log('4. ❓ Netlify functions enabled');

console.log('\n🔧 Required Actions:');
console.log('1. Go to Netlify Dashboard → Site settings → Build & deploy → Environment');
console.log('2. Add environment variable: PRINTFUL_TOKEN = fH4uZnuUVA04DTjE38JicnX2w7zYv45aBQVwSZHj');
console.log('3. Deploy site to update Netlify functions');
console.log('4. Check Netlify Functions tab to ensure printful-proxy is deployed');

console.log('\n🌐 Testing Proxy Function URL:');
console.log('The production site calls: /.netlify/functions/printful-proxy/sync/products');
console.log('This should proxy to: https://api.printful.com/sync/products');

console.log('\n📝 Debug Steps:');
console.log('1. Open browser DevTools on production site');
console.log('2. Check Network tab for failed requests');
console.log('3. Look for requests to /.netlify/functions/printful-proxy/*');
console.log('4. Check response status and error messages');

console.log('\n⚠️  Most Likely Issue:');
console.log('PRINTFUL_TOKEN environment variable is not set in Netlify');
console.log('Without this token, the proxy function cannot authenticate with Printful API');
