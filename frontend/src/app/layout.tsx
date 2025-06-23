import "./globals.css";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
