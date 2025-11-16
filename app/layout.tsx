"use client";

import "./globals.css";
import { PropsWithChildren } from "react";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={lexend.className}>
      <body>{children}</body>
    </html>
  );
}
