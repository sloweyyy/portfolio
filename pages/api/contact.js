import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    try {
        const templatePath = path.join(
            process.cwd(),
            "utils/EmailTemplates/contact.html"
        );
        let emailTemplate = fs.readFileSync(templatePath, "utf-8");

        emailTemplate = emailTemplate
            .replace(/{{name}}/g, name)
            .replace(/{{email}}/g, email)
            .replace(/{{message}}/g, message);

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to: "truonglevinhphuc2006@gmail.com",
            subject: `New Contact Form Message from ${name}`,
            html: emailTemplate,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({
            message: "Failed to send email",
            error: error.message,
        });
    }
}
