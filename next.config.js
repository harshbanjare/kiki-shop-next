/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config options...

  // Add custom webpack config
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "string-replace-loader",
          options: {
            search: 'cz-shortcut-listen="true"',
            replace: "",
            flags: "g",
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
