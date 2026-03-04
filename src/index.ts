import os from "os";
import type { NextConfig } from "next";

export interface LocalQROptions {
  /** Override the port (default: process.env.PORT or 3000) */
  port?: number | string;
  /** Suppress all terminal output */
  silent?: boolean;
}

function getLocalIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] ?? []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

function printQR(url: string): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const qrcode = require("qrcode-terminal") as {
      generate: (text: string, opts: { small: boolean }, cb: (qr: string) => void) => void;
    };
    console.log(`\n → Scan to preview: \x1B[36m${url}\x1B[0m`);

    qrcode.generate(url, { small: true }, (qr: string) => {
      const indented = qr
        .split("\n")
        .map((line) => " " + line)
        .join("\n");
      console.log(indented);
    });
  } catch (error) {
    console.log(`\n \x1b[36m${url}\x1b[0m`);
  }
}

export function withLocalQR(
  nextConfig: NextConfig = {},
  options: LocalQROptions = {}
): NextConfig {
  if (process.env.NODE_ENV === "production") {
    return nextConfig;
  }

  const port = options.port ?? process.env.PORT ?? 3000;
  const ip = getLocalIPAddress();
  const localURL = `http://${ip}:${port}`;

  if (!options.silent) {
    setImmediate(() => printQR(localURL));
  }

  return nextConfig;
}