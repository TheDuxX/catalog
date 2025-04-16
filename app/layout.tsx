import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { FiltersProvider } from "./_utils/filters-context";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tratorino",
  description: "Peças para maquinas e tratores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FiltersProvider>
      <html lang="pt-br">
        <body className={`${montserrat.variable} antialiased`}>
        <Toaster position="bottom-right" />
        {children}</body>
      </html>
    </FiltersProvider>
  );
}
