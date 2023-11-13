import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
};

const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export default async function sendEmail(data: EmailPayload): Promise<object> {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  });
}
