"use client";
import Simulator from "@/components/simulator";
import { WorkspaceProvider } from "@/components/simulator/Context";

export default function LandingPage() {
  return (
    <WorkspaceProvider>
      <Simulator />
    </WorkspaceProvider>
  );
}
