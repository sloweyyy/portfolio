import { google } from "googleapis";

export default async function handler(req, res) {
    if (
        !process.env.CLIENT_EMAIL ||
        !process.env.PRIVATE_KEY ||
        !process.env.SPREADSHEET_ID
    ) {
        return res
            .status(500)
            .json({ error: "Environment variables are not set" });
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    try {
        const range = "Contact!A2:C2";
        console.log(
            `Appending data to range: ${range} in spreadsheet ID: ${process.env.SPREADSHEET_ID}`
        );

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range,
            valueInputOption: "RAW",
            resource: {
                values: [[req.body.name, req.body.email, req.body.message]],
            },
        });
        res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
        console.error(
            "Error adding data to Google Sheets:",
            error.response ? error.response.data : error.message
        );
        res.status(500).json({
            error: "Error adding data",
            details: error.response ? error.response.data : error.message,
        });
    }
}
