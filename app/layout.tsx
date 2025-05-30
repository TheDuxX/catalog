import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { FiltersProvider } from "./_utils/filters-context";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./_utils/quey-provider";
import { VisitTracker } from "./_components/VisitTracker";

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
          <QueryProvider>{children}</QueryProvider>
          <VisitTracker />
        </body>
      </html>
    </FiltersProvider>
  );
}
