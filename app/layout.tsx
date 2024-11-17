import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GradientProvider } from './contexts/GradientContext';
import { ThemeProvider } from './contexts/ThemeContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FuturePath - Goal Setting App",
  description: "Set and track your personal goals with FuturePath",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <GradientProvider>
            {children}
          </GradientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
