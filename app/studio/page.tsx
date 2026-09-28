import type { Metadata } from "next";
import { StudioShell } from "@/components/studio/StudioShell";

export const metadata: Metadata = {
  title: "Studio — System Studio",
};

export default function StudioPage() {
  return <StudioShell />;
}
