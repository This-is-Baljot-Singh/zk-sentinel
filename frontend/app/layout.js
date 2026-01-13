import "./globals.css";

export const metadata = {
  title: "ZK-Sentinel",
  description: "Verifiable Financial Identity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
