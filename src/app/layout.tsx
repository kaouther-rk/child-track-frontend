import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Child Track",
  description: "Child Track app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
