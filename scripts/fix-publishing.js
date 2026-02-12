import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function fixPublishingIssues() {
  try {
    console.log('🔧 Fixing publishing issues...\n');
    
    // Step 1: Get all products
    console.log('📦 Getting current products...');
    const productsResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!productsResponse.ok) {
      throw new Error(`API Error: ${productsResponse.status} ${productsResponse.statusText}`);
    }

    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    console.log(`Found ${products.length} products:\n`);

    // Step 2: Delete stuck products
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🗑️  Deleting: ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Status: ${product.published ? 'PUBLISHED' : 'DRAFT'}`);
      
      const deleteResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}.json`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (deleteResponse.ok) {
        console.log(`   ✅ Successfully deleted`);
      } else {
        const error = await deleteResponse.json();
        console.log(`   ❌ Failed to delete: ${JSON.stringify(error)}`);
      }
      console.log('');
    }

    // Step 3: Wait a moment for deletion to process
    console.log('⏳ Waiting 3 seconds for deletions to process...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 4: Recreate products (you'll need to do this manually or we can create basic ones)
    console.log('📝 Products deleted. You now need to:');
    console.log('1. Go to your Printify dashboard');
    console.log('2. Create new products with your designs');
    console.log('3. Use the API to publish them properly');
    
    // Alternative: Create basic products programmatically
    console.log('\n🚀 Would you like me to create basic products programmatically?');
    console.log('(This would create simple products that you can then edit in the dashboard)');

  } catch (error) {
    console.error('❌ Error fixing publishing:', error.message);
  }
}

async function createBasicProducts() {
  try {
    console.log('🏗️  Creating basic products...\n');
    
    // This is a simplified version - you'd need to configure proper variants, images, etc.
    const basicProducts = [
      {
        title: 'District Championships Football Crest Sweatshirt | Palm Trees, 2026',
        description: 'Premium sweatshirt with district championship design',
        variants: [
          {
            id: 'variant_1',
            title: 'S',
            price: 3447, // $34.47 in cents
            option1: 'S',
            option2: null,
            option3: null
          }
        ],
        images: [
          {
            src: 'https://via.placeholder.com/400x500/4A1D96/FFFFFF?text=Football+Sweatshirt',
            alt: 'District Championships Football Crest Sweatshirt'
          }
        ]
      },
      {
        title: 'District Championships Horse Rider Tee | Palm Trees, 2026 Shield Design',
        description: 'Premium t-shirt with horse rider design',
        variants: [
          {
            id: 'variant_2',
            title: 'S',
            price: 1583, // $15.83 in cents
            option1: 'S',
            option2: null,
            option3: null
          }
        ],
        images: [
          {
            src: 'https://via.placeholder.com/400x500/6B46C1/FFFFFF?text=Horse+Rider+Tee',
            alt: 'District Championships Horse Rider Tee'
          }
        ]
      }
    ];

    for (const productData of basicProducts) {
      console.log(`📦 Creating: ${productData.title}`);
      
      const createResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (createResponse.ok) {
        const newProduct = await createResponse.json();
        console.log(`   ✅ Created with ID: ${newProduct.id}`);
      } else {
        const error = await createResponse.json();
        console.log(`   ❌ Failed to create: ${JSON.stringify(error)}`);
      }
    }

  } catch (error) {
    console.error('❌ Error creating products:', error.message);
  }
}

// Run the fix
fixPublishingIssues();
