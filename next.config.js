/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Enable Turbopack with empty config to silence the warning
    turbopack: {},
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,POST,OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
        ],
    },
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
};

module.exports = nextConfig;
