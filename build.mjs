import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "cjs",
  outfile: "dist/index.js",
  external: ["next", "qrcode-terminal"],
  minify: false,
  sourcemap: false,
});

console.log("built dist/index.js");
