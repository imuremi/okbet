import { PrivyConfig, PrivyProvider } from "@privy-io/expo";
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { privyConfig } from "./privyConfig";
import { wagmiConfig } from "./wagmiConfig";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID as string}
            clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID as string}
            config={privyConfig as PrivyConfig}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
                    {children}
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}
