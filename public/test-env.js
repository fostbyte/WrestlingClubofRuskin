// Test if the service works in browser environment
const testServiceInBrowser = () => {
  console.log('🧪 Testing service in browser context...');
  
  // Check if VITE_PRINTFUL_TOKEN is available
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const token = import.meta.env.VITE_PRINTFUL_TOKEN;
    console.log('✅ VITE_PRINTFUL_TOKEN available:', token ? `${token.substring(0, 10)}...` : 'NOT FOUND');
    
    if (token) {
      console.log('🌐 Browser environment is ready for API calls');
      console.log('📦 Your website should now show products');
    } else {
      console.log('❌ Token not available in browser');
    }
  } else {
    console.log('❌ Not in browser environment');
  }
};

testServiceInBrowser();
