import nodemailer from "nodemailer"
import { EMAIL } from "../constants/constants.js";

const Mail = {
    sendMail: async (receiver,subject,content,html) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: 'uxtg smmg wzku bxlt'
            }
        });

        const mailOptions = {
            from: EMAIL,
            to: receiver,
            subject: subject,
            text: content,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
    
}

export default Mail;