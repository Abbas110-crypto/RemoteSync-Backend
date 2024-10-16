const nodemailer = require('nodemailer');


const sendEmail = async (to, subject, VerificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services
        auth: {
            user: 'abbasmehdi692@gmail.com', // Replace with your email
            pass: 'ugxe werx dhrl lzat', // Replace with your email password
        },
    });

    // The URL that will be used for email verification
    const verificationUrl = `http://localhost:5173/verify-email/${VerificationToken}`;

    const mailOptions = {
        from: 'abbasmehdi692@gmail.com',
        to,
        subject,
        html: `
            <p>Please click the link below to verify your email:</p>
            <a href="${verificationUrl}">Click here to verify your email</a>
            <p>If you did not create an account, please ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail }; 
