import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { FiltersProvider } from "./_utils/filters-context";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tratorino",
  description: "Peças para maquinas e tratores",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FiltersProvider>
      <html lang="pt-br">
        <body className={`${montserrat.variable} antialiased`}>
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" />
            {children}
          </QueryClientProvider>
        </body>
      </html>
    </FiltersProvider>
  );
}
