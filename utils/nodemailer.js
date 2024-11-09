import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({


    service:'gmail',
    auth:{
        user :process.env.Email,
        pass :process.env.Pass
    }
});

export const sendOtpEmail = async(email,otp) => {
    const mailOptions = {
        from :process.env.Email,
        to: email,
        subject:'Your otp code',
        text:`Your otp code for verifcation is ${otp}. Thanks for registering.`

    };
    await transporter.sendMail(mailOptions);
};
