/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/community-profiles",
				permanent: true,
			},
		];
	},
};
module.exports = nextConfig;
