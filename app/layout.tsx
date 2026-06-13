import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Terkix AI Launch - RKIX3 Command Center",
  description:
    "A unified launch dashboard for the Terkix and RKIX3 AI repositories, ready for public .dev or .com deployment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
