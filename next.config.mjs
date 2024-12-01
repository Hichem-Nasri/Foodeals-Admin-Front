/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.dicebear.com'], // TODO: Remove when /me endpoint is implemented
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
        ]
    },

    // Dynamic headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Forwarded-Host',
                        value: '*',
                    },
                ],
            },
        ]
    },
}

export default nextConfig
