const mailer = require('nodemailer');

require('dotenv').config();

const transporter = mailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 25,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PWD
    }
});

transporter.verify()
    .then(() => console.log('Ready to send messages'))
    .catch((err) => console.log(err));

module.exports = transporter;