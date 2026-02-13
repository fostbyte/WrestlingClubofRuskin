import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Checking Environment Variables...\n');

console.log('Available environment variables:');
console.log('VITE_PRINTFUL_TOKEN:', process.env.VITE_PRINTFUL_TOKEN ? `${process.env.VITE_PRINTFUL_TOKEN.substring(0, 10)}...` : 'NOT FOUND');
console.log('PRINTFUL_TOKEN:', process.env.PRINTFUL_TOKEN ? `${process.env.PRINTFUL_TOKEN.substring(0, 10)}...` : 'NOT FOUND');

console.log('\n💡 For Vite development, you need VITE_PRINTFUL_TOKEN');
console.log('💡 For production, Netlify needs PRINTFUL_TOKEN');
