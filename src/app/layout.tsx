import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Quang Minh — Graphic Designer Portfolio",
  description:
    "Full-stack graphic designer based in Ho Chi Minh City. Brand identity, print materials, e-commerce design, and video production.",
  openGraph: {
    title: "Quang Minh — Graphic Designer Portfolio",
    description:
      "Full-stack graphic designer based in Ho Chi Minh City. Brand identity, print materials, e-commerce design, and video production.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Quang Minh",
  jobTitle: "Graphic Designer",
  url: "https://behance.net/minhle123",
  email: "quangminh14320@gmail.com",
  telephone: "+84794759487",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
