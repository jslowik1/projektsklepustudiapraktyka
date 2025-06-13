import type { Metadata } from "next";
import "./assets/styles/index.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Providers } from "./context/ContextProviders";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GameZone",
  description: "Projekt zaliczeniowy - Jakub Słowik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mainbody`}>
        <Providers>
          <Navbar />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #ff2e88',
                borderRadius: '0.75rem',
                width: "fit-content",
                fontSize: '0.95rem',
                color: '#fff',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
              }
            }}
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
