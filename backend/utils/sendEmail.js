import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // Gmail App Password (NO spaces)
      },
      tls: {
        rejectUnauthorized: false,  // Fix Gmail TLS issues
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
    });

    console.log("Email sent to:", email);

  } catch (error) {
    console.log("Email Error:", error);
    throw new Error("Email sending failed");
  }
};
