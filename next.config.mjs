/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                // port: '',
                // pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'disabilibabe.com',
                // port: '',
                // pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'www.dpzone.in',
                // port: '',
                // pathname: '/u/**',
            },
        ],
    },
};

export default nextConfig;
