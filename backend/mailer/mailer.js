const nodemailer = require("nodemailer");




const mailer =  async (recipients, subject, html) => {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'gretchen.lubowitz23@ethereal.email',
            pass: 'zvDtHYwEYPvjkhNfDF'
        }
    });

    const info = await transporter.sendMail({
        from: '"Harmoni" <gretchen.lubowitz23@ethereal.email>',
        to: recipients,
        subject: subject,
        html: html
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl());

};

module.exports = mailer;