/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images:{
        domains:
        [
            "zleadsbackend.onrender.com",
            "localhost"

        ]
    },
}

module.exports = nextConfig
