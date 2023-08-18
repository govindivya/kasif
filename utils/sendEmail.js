const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
 const transporter = nodeMailer.createTransport({
   host: process.env.SMTP_HOST,
   port: process.env.SMTP_PORT,
   secure: true,
   service: process.env.SMTP_SERVICE,
   auth: {
     user: process.env.SMTP_EMAIL,
     pass: process.env.SMTP_PASSWORD,
   },
 });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
