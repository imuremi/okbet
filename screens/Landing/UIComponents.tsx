import { Collapsible } from "@/components/Collapsible";
import CollapsibleContentContainer from "@/components/CollapsibleContentContainer";
import { ThemedText } from "@/components/ThemedText";

export default function UIComponents() {
    return <Collapsible title="UI Components">
    <CollapsibleContentContainer>
      <ThemedText>
        The template includes UI components in the{" "}
        <ThemedText type="defaultSemiBold">/components/ui</ThemedText>{" "}
        directory.
      </ThemedText>
      <ThemedText>
        The bottom sheets for send, receive and sign messages is available in
        the{" "}
        <ThemedText type="defaultSemiBold">/components/ui/sheets</ThemedText>{" "}
        directory.
      </ThemedText>
      <ThemedText>
        The fonts are in{" "}
        <ThemedText type="defaultSemiBold">/assets/fonts</ThemedText>{" "}
        directory.
      </ThemedText>
    </CollapsibleContentContainer>
  </Collapsible>
}