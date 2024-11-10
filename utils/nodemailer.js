import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email, // replace with your Gmail address
        pass: process.env.Pass // use the App Password or your Gmail password if Less Secure Apps is enabled
    }
});

export const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code for verification is ${otp}. Thanks for registering.`
    };
    await transporter.sendMail(mailOptions);
};
