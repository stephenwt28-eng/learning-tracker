import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HandwritingLines from "@/components/layout/HandwritingLines";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Learning Tracker",
  description: "A simple, private dashboard to track what you're learning.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)]">
        <div className="flex-1">{children}</div>
        <HandwritingLines />
      </body>
    </html>
  );
}
