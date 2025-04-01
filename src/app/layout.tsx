import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope} from "next/font/google"
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "sonner";

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Opal",
  description: "Share AI powered videos with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${manrope.className} bg-[#171717]`}
      >
        {/* WIP: ADD STYLES FOR LIGHT THEMES LATER. */}
        {/* UPDATE ALL PACKAGES AND CODE TO MEET LATEST STANDARDS */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ReduxProvider>
         <ReactQueryProvider>
          {children}
          <Toaster />
         </ReactQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
