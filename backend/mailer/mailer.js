const nodemailer = require("nodemailer");


const mailer =  async (recipients, subject, html) => {

    const transporter = nodemailer.createTransport({
        pool: true,
        service: "gmail",
        auth: {
            user: process.env.EMAIL_MAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.verify((error, success) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages;");
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