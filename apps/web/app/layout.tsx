import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Workflow Automation",
  description: "Automate your workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen antialiased`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#fff",
              border: "1px solid #27272a",
              borderRadius: "8px",
            },
          }}
        />
        <main>{children}</main>
      </body>
    </html>
  );
}
