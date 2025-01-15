/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
      remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Pour l'utilisation Google 
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com', // Pour l'utilisation GitHub
            },
            {
                protocol: 'https',
                hostname: 'dev-6c5l2tdt7b7b3o3k.us.auth0.com', // pour l'utilisation Auth0
            },
        ],
    },
};

export default nextConfig;
