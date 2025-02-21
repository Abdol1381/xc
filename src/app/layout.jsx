import "./globals.css";

import { headers } from "next/headers";

import { config } from "@/config";
import Web3ModalProvider from "@/context";
import { cookieToInitialState } from "wagmi";

export const metadata = {
  title: "nadswap",
  description: "nadswap app",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        <footer className="flex justify-between bg-[#200052] text-white px-24 py-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Community</h2>
            <ul className="flex gap-4">
              <li>Twitter</li>
              <li>Discord</li>
              <li>Telegram</li>
              <li>Medium</li>
            </ul>
          </div>
          {/* <div className="space-y-3">
            <h2 className="text-xl font-bold">Resources</h2>
            <ul className="space-y-1">
              <li>Docs</li>
              <li>Guides</li>
              <li>Audits</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Tools</h2>
            <ul className="space-y-1">
              <li>Analytics</li>
              <li>Block Explorer</li>
              <li>Bridge</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Business</h2>
            <ul className="space-y-1">
              <li>Token Listings</li>
              <li>Partnerships</li>
              <li>Contact Us</li>
            </ul>
          </div> */}
        </footer>
      </body>
    </html>
  );
}
