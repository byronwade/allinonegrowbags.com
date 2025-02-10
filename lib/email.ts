import nodemailer from "nodemailer";

interface EmailPayload {
	to: string;
	subject: string;
	html: string;
}

const smtpOptions = {
	host: process.env.SMTP_HOST || "smtp.gmail.com",
	port: parseInt(process.env.SMTP_PORT || "587"),
	secure: false,
	auth: {
		user: process.env.SMTP_USER || "zugzology@gmail.com",
		pass: process.env.SMTP_PASSWORD,
	},
};

const transporter = nodemailer.createTransport(smtpOptions);

export async function sendEmail(data: EmailPayload) {
	const emailOptions = {
		from: process.env.SMTP_FROM || "zugzology@gmail.com",
		...data,
	};

	return await transporter.sendMail(emailOptions);
}
