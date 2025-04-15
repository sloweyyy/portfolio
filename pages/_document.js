import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.png" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..900&display=swap"
                />
                <script
                    defer
                    async
                    client-code="KA-1959366-1"
                    src="https://static.katalon.com/libs/traffic-agent/v1/traffic-agent.min.js"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
