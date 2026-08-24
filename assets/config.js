'use strict';
// Deployment config for the Pacta website.
// Set PACTA_APP_URL to the public URL of the marketplace app; every
// "Open the app" link on the site is rewritten to it on page load.
window.PACTA_APP_URL = window.PACTA_APP_URL || 'http://localhost:3220';

// On-chain anchoring config, consumed by the homepage live element and the
// public verifier (/verify.html). The AnchorRegistry contract publishes one
// Merkle root of the agreement log to Base every 12 hours.
//
// LIVE: this points at the production AnchorRegistry on Base mainnet. The
// rpcUrl is a PUBLIC endpoint on purpose — config.js ships to the browser, so
// it must never carry a private API key. If the RPC is slow or unreachable the
// homepage live element and the verifier degrade gracefully: they explain the
// mechanism without inventing on-chain data, and never surface an error.
window.PACTA_ANCHOR = window.PACTA_ANCHOR || {
  address: '0x866316ae68b297cc2b3ed2daaf3cabd4f5e39de1', // AnchorRegistry on Base mainnet
  chainId: 8453,                            // 8453 = Base mainnet, 84532 = Base Sepolia
  rpcUrl: 'https://mainnet.base.org',       // public RPC, read in the browser
  explorer: 'https://basescan.org',         // Basescan base URL (no trailing slash)
  deployBlock: 50374472,                    // first block with a RootAnchored event; floor for the log scan
};
