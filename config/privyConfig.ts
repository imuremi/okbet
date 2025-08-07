import type { PrivyClientConfig } from '@privy-io/react-auth';

// Replace this with your Privy config
export const privyConfig: PrivyClientConfig = {
    embeddedWallets: {
        createOnLogin: 'users-without-wallets',
        requireUserPasswordOnCreate: false,
        showWalletUIs: true
      },
  loginMethods: ['email']
};