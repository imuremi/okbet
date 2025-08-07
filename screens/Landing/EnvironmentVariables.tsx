import { Collapsible } from "@/components/Collapsible";
import CollapsibleContentContainer from "@/components/CollapsibleContentContainer";
import { ThemedText } from "@/components/ThemedText";

export default function EnvironmentVariables() {
  return (
    <Collapsible title="Environment Variables">
     <CollapsibleContentContainer>
        <ThemedText>
          The template uses environment variables to configure the wallet.
        </ThemedText>
        <ThemedText>
          Create a copy of{" "}
          <ThemedText type="defaultSemiBold">.env.example</ThemedText> and
          rename it to <ThemedText type="defaultSemiBold">.env</ThemedText>
        </ThemedText>
        <ThemedText>Add the following variables:</ThemedText>
        <ThemedText type="defaultSemiBold">EXPO_PUBLIC_PRIVY_APP_ID</ThemedText>
        <ThemedText type="defaultSemiBold">
          EXPO_PUBLIC_PRIVY_CLIENT_ID
        </ThemedText>
        </CollapsibleContentContainer>
    </Collapsible>
  );
}


