// Test the service directly in Node.js environment
import { printfulService } from '../src/services/printfulService.js';

console.log('🧪 Testing Printful Service...\n');

async function testService() {
  try {
    console.log('Fetching products...');
    const products = await printfulService.getShopProducts();
    
    console.log(`✅ Service returned ${products.length} product(s):`);
    
    if (products.length > 0) {
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.name}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Images: ${product.images.length}`);
      });
    } else {
      console.log('❌ No products returned');
    }
    
  } catch (error) {
    console.error('❌ Service error:', error.message);
  }
}

testService();
