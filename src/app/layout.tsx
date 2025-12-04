import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/common/WalletProvider";
import { DevReset } from "@/components/common/DevReset";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KiddyGuard Zypherpunk",
  description: "Privacy-first pediatric AI agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <WalletProvider>
          {children}
          <DevReset />
        </WalletProvider>
      </body>
    </html>
  );
}
