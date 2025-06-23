"use client";

import AuthSync from "@/app/util/AuthSync";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthSync />
      {children}
    </>
  );
}
