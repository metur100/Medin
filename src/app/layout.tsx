import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medin Turkes — System Online",
  description: "Full-stack developer building modern web apps, APIs, and digital systems. Engineering meets design meets futuristic UI.",
  keywords: ["Medin Turkes", "developer", "Next.js", "React", "API", "Azure", "portfolio"],
  openGraph: {
    title: "Medin Turkes — System Online",
    description: "Enter the system. Full-stack developer & digital architect.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
