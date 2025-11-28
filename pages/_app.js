import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "../components/Toaster";

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
            <Toaster />
        </ThemeProvider>
    );
};

export default App;
