import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = process.env.RESEND_API ? new Resend(process.env.RESEND_API) : null;

if (!resend) {
    console.warn("\x1b[33m%s\x1b[0m", "[WARN] RESEND_API is not set in .env. Email dispatch will be simulated in console.");
}

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        if (!resend) {
            console.log(`[Email Simulation] To: ${sendTo} | Subject: ${subject}`);
            return { id: 'simulated-email-id' };
        }

        const { data, error } = await resend.emails.send({
            from: 'MedWholesale <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("Resend error:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Send email error:", error);
        return null;
    }
};

export default sendEmail;
