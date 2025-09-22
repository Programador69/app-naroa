import type { Metadata } from "next";
import { Playfair_Display, Tilt_Neon } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const tilt = Tilt_Neon({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAROA",
  description: "Tu tienda de ropa favorita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.className} ${tilt.className}`}>
        {children}
      </body>
    </html>
  );
}
