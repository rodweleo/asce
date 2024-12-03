import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" type="image/x-icon" href="/logos/Asceflow Logo.png" />
      <body className="antialiased w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
