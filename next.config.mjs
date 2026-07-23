/** @type {import('next').NextConfig} */

// GitHub Pages serves project repos from a subpath
// (https://<user>.github.io/<repo>/), so assets and links need that prefix
// baked in at build time. The deploy workflow passes it in via PAGES_BASE_PATH.
// It's empty for local dev and for user/org root sites (<user>.github.io).
const raw = process.env.PAGES_BASE_PATH ?? "";
const basePath = raw === "/" ? "" : raw.replace(/\/$/, "");

const nextConfig = {
  output: "export", // emit a fully static site into ./out
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // required: a static export has no image server
  trailingSlash: true, // emit /path/index.html so direct loads/refreshes don't 404
};

export default nextConfig;
