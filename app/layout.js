import { Inter } from "next/font/google";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bugettra",
  description: "One Stop Finance Platform",
  icons:{
    icon:"/budgettra-favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* <header className="fixed top-0"> */}
            <Header />
          {/* </header> */}
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💗 by Sujay Das</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
