import React from 'react';
import { createRoot } from 'react-dom/client';
import WalletConnect from './WalletConnect';

const divWalletConnectPhantom = document.getElementById('wallet-connect-phantom');
if (divWalletConnectPhantom) {
    const rootWalletConnectPhantom = createRoot(divWalletConnectPhantom);
    rootWalletConnectPhantom.render(<WalletConnect />);
}
