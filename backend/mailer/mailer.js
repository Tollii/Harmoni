const nodemailer = require("nodemailer");

module.exports = () => {

    return async () => {

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
            to: "andreas.tolnes@ymail.com, andreas.tolnes@gmail.com",
            subject: "Test mail from Harmoni",
            html: "<b>YEET<b>"
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl());

    };
};



