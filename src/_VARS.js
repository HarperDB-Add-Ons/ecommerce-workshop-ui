const USE_CACHING_API = 0;

const config = {
  PRODUCT_API: USE_CACHING_API ? 'https://localhost:9926/api/' : 'https://ecommerce.edgecloud9.com/api/products'
}

export default config;
