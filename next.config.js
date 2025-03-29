/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
        domains: [
            "images.unsplash.com",
            "avatars.githubusercontent.com",
            "img.youtube.com",
        ],
    },
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
    },
    serverRuntimeConfig: {
        JWT_SECRET: process.env.JWT_SECRET,
        api: {
            bodyParser: {
                sizeLimit: "1mb",
            },
        },
    },
    publicRuntimeConfig: {
        // Add any client-side environment variables here (but NOT secrets)
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            if (!process.env.JWT_SECRET) {
                console.warn(
                    "WARNING: JWT_SECRET environment variable is not set. Authentication will not work properly."
                );
            }
        }
        return config;
    },
};

module.exports = nextConfig;
