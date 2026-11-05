import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camo Clash · Collect the canopy",
  description: "Collect chameleon cards, build your deck and battle in the canopy.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
