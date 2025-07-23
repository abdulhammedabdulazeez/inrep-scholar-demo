import Providers from "@/providers/providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "InRep Scholar Demo",
  description: "UI/UX Demo for Institutional Repository",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
