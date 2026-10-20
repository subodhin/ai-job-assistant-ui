import type { Metadata } from "next";
import "antd/dist/reset.css";
import "./globals.css";


export const metadata: Metadata = {
  title: "AI Job Assistant",
  description: "Your AI-powered career assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}