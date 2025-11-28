import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "../components/Toaster";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageTransition from "../components/PageTransition";

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => {
            if (url !== router.asPath) {
                setIsLoading(true);
            }
        };

        const handleComplete = (url) => {
            if (url === router.asPath) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500); // Add a small delay for smoother transition
            }
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
            {isLoading && <PageTransition />}
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
