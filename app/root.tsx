import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import "~/tailwind.css";
import enLocale from "~/locales/en.json";
import zhCNLocale from "~/locales/zh-CN.json";

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    lang: params.lang || "en",
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<typeof loader>();

  // Select locale based on current language
  const locale = lang === "zh-CN" ? zhCNLocale : enLocale;

  // Localized SEO metadata
  const seoMetadata = {
    title: `AMail - ${locale.title}`,
    description: locale.description,
    keywords:
      lang === "zh-CN"
        ? "临时邮箱, 免费邮箱, 开源邮箱, 自部署邮箱"
        : "Temporary Email, Free Email, Open-source Email, Self-hosted Email",
  };

  return (
    <html lang={lang} className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Primary SEO Meta Tags */}
        <title>{seoMetadata.title}</title>
        <meta name="title" content={seoMetadata.title} />
        <meta name="description" content={seoMetadata.description} />
        <meta name="keywords" content={seoMetadata.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://amail.com/${lang}`} />
        <meta property="og:title" content={seoMetadata.title} />
        <meta property="og:description" content={seoMetadata.description} />
        <meta
          property="og:image"
          content={`/images/amail-og-image-${lang}.svg`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://amail.com/${lang}`} />
        <meta property="twitter:title" content={seoMetadata.title} />
        <meta
          property="twitter:description"
          content={seoMetadata.description}
        />
        <meta
          property="twitter:image"
          content={`/images/amail-twitter-image-${lang}.svg`}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/png" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />

        {/* Robots and Canonical */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://amail.com/${lang}`} />

        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AMail",
            description: seoMetadata.description,
            operatingSystem: "Web, Windows, macOS, Linux",
            applicationCategory: "Productivity",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            inLanguage: lang,
          })}
        </script>

        <Meta />
        <Links />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RELSS6BFRH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RELSS6BFRH');
						`,
          }}
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
	return <Outlet />;
}
