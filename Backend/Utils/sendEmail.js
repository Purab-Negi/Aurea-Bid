import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const port = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : undefined;

    const transporter = nodeMailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      host: process.env.SMTP_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(options);
    console.log("Mail sent:", info.messageId, "to:", email);
    return info;
  } catch (error) {
    console.error(
      "Email sending failed:",
      error.response || error.message || error
    );
    throw error;
  }
};
