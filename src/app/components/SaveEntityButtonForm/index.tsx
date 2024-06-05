"use client";
import { useFormStatus } from "react-dom";
import { SaveEntityButtonContainer } from "./styles";

export function SaveEntityButtonForm() {
  const { pending } = useFormStatus();

  return (
    <SaveEntityButtonContainer type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </SaveEntityButtonContainer>
  );
}
