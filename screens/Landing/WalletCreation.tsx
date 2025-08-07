import { Collapsible } from "@/components/Collapsible";
import CollapsibleContentContainer from "@/components/CollapsibleContentContainer";
import { ThemedText } from "@/components/ThemedText";

export default function WalletCreation() {
    return <Collapsible title="Wallet Creation">
    <CollapsibleContentContainer>
      <ThemedText>
        This demo uses email to create a wallet, make sure to have email
        enabled as a login method in your Privy dashboard.
      </ThemedText>
      <ThemedText>
        You can use Privy test accounts during development.
      </ThemedText>
    </CollapsibleContentContainer>
  </Collapsible>
}