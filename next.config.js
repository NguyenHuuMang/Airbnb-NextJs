/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
           "avatars.githubusercontent.com",
           'lh3.googleusercontent.com',
           'res.cloudinary.com'
        ]
    },
    resolve: {
        fallback: {
            "fs": false
        }
      },
}

module.exports = nextConfig
