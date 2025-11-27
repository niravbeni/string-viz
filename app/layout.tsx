import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "String Art Generator",
  description: "Transform images into beautiful string art patterns using a greedy algorithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
