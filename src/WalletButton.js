import React, { useState } from 'react';
import { PhantomButton } from 'wallet-connect-buttons';

function WalletButton() {
    const [publicKey, setPublicKey] = useState('');

    return (
        <PhantomButton setPublicKey={setPublicKey} />
    );
}

export default WalletButton;
