/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other configurations...
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300, // Delay before rebuilding after changes
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  