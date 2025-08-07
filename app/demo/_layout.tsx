import { PrivyProvider } from "@privy-io/expo";
import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { monadTestnet } from "viem/chains";

export default function DemoLayout() {
    const appId = process.env.EXPO_PUBLIC_PRIVY_APP_ID;
    const clientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;
    
    console.log("DemoLayout: Environment variables:", { appId, clientId });
    
    if (appId && clientId) {
        console.log("DemoLayout: Initializing PrivyProvider");
        return (
            <PrivyProvider
                clientId={clientId}
                appId={appId}
                supportedChains={[monadTestnet]}
                config={{
                    embeddedWallets: {
                        createOnLogin: "users-without-wallets",
                        requireUserPasswordOnCreate: false,
                        showWalletUIs: true
                    },
                    loginMethods: ['email']
                }}
            >
                <Slot />
            </PrivyProvider>
        );
    }

    console.log("DemoLayout: Environment variables not set, showing error screen");
    return <View style={styles.container}>
        <Text>PRIVY_APP_ID is not set</Text>
        <Text>App ID: {appId || 'Not set'}</Text>
        <Text>Client ID: {clientId || 'Not set'}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});