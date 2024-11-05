/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3001"],
    },
  },
  webSocketServerPort: 3001,
  output: "standalone",
};

export default nextConfig;
