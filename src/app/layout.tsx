import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kani Group",
  description: "Interactive Kani Group building navigation"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body>{children}</body>
    </html>
  );
}
