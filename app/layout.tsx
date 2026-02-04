import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Projectly — Simple Project Updates for Clients",
    template: "%s | Projectly",
  },

  description:
    "Projectly helps freelancers share clear project updates with clients, track progress, and reduce back-and-forth. One link. Total clarity.",

  applicationName: "Projectly",

  keywords: [
    "project updates",
    "freelancer client updates",
    "client reporting",
    "project tracking",
    "freelancer tools",
    "status updates",
    "project dashboard",
  ],

  authors: [{ name: "Projectly Team" }],

  creator: "Projectly",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Projectly — Simple Project Updates for Clients",
    description:
      "Share professional project updates with clients using a single public link. Built for freelancers who value clarity.",
    siteName: "Projectly",
    images: [
      {
        url: "/favicon.ico", // add later
        width: 1200,
        height: 630,
        alt: "Projectly dashboard preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Projectly — Simple Project Updates for Clients",
    description:
      "A clean way for freelancers to keep clients updated without endless messages.",
    images: ["/favicon.ico"],
    creator: "@projectlyapp", // optional
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
