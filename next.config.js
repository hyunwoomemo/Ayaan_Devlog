/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: { unoptimized: true } ,
}

const rehypePrettyCode = require('rehype-pretty-code');
const fs = require('fs');
/** @type {import('rehype-pretty-code').Options} */
const options = {
  highlight: true,          // Enable word highlighting
  lineNumber: true,         // Show line numbers
  highlightLines: [2, 4],   // Highlight specific lines (optional)
  highlightLanguage: 'jsx', // Specify the language for highlighting (optional)
};
 
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

module.exports = {
  ...nextConfig,
  ...withMDX
}
