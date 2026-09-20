import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../../public/assets/font/Inter-VariableFont_opsz,wght.ttf", style: "normal", weight: "100 900" },
    { path: "../../public/assets/font/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Personal Portfolio of Riccy Riandy Intan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="font-inter min-h-full flex flex-col">{children}</body>
    </html>
  );
}
