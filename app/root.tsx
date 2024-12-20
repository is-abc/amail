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

export async function loader({params}:LoaderFunctionArgs) {
	return {
		lang: params.lang || "en"
	}
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { lang } = useLoaderData<typeof loader>();

	return (
		<html lang={lang} className="light">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
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
