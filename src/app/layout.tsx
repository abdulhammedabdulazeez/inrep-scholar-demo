import "./globals.css";

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
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
