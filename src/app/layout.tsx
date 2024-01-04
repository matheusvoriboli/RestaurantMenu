"use client";
import AppWrapper from "@/components/AppWrapper";
import { ReduxProvider } from "@/redux/provider";
import { Roboto_Flex as Roboto } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>Restaurant Menu</title>
      </Head>
      <ReduxProvider>
        <body className={roboto.className}>
          <AppWrapper>
            {children}
          </AppWrapper>
        </body>
      </ReduxProvider>
    </html>
  );
}
