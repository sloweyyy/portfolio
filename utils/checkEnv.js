const checkRequiredEnvVars = () => {
    const requiredVars = ["JWT_SECRET", "MONGODB_URI"];
    const missing = [];

    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });

    if (missing.length > 0) {
        console.error(
            `ERROR: Missing required environment variables: ${missing.join(
                ", "
            )}`
        );
        console.error(
            "Make sure your .env.local file contains these variables or they are set in your environment."
        );

        if (process.env.NODE_ENV === "production") {
            throw new Error("Missing required environment variables");
        }
    } else {
        console.log("✅ All required environment variables are present");
    }
};

export default checkRequiredEnvVars;
