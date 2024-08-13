import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "defenseNet",
  description: "defenseNet is a RL agent that deflects asteroids in space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./public/favicon.png" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
