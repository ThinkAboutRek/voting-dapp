/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", 
    trailingSlash: true,  
    reactStrictMode: true,
    experimental: {
      appDir: true, 
    },
  };
  
  module.exports = nextConfig;
  