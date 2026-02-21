import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100"],
});

export const metadata: Metadata = {
  title: "trndO | Hyper-Local AI Operating System",
  description: "Advanced AI for MSMEs in small-town retail ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} antialiased bg-[#F8F8F8] text-[#0A0A0A] selection:bg-yellow-200 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
