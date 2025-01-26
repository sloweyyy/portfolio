import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
        </ThemeProvider>
    );
};

export default App;
