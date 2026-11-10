import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import GoogleTags from "@/components/GoogleTags";
import { SITE } from "@/lib/site";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

// Same typeface as jasonturtoga.com.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.name,
  description: "SEO services from Jason Turtoga Digital.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <GoogleTags />
      </body>
    </html>
  );
}
