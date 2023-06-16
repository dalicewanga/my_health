const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async(adresse_mail, objet, contenu)=>{
    try{

        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:true, //false
            //requireTLS:true,
            tls: {
                rejectUnauthorized: false
            },
            service: "gmail",
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: SMTP_MAIL,
            to:adresse_mail,
            subject: objet,
            html:contenu
        }

        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Mail envoyé avec succès:-', info.response);
            }
        });

    } catch (error){
        console.log(error.message);
    }
}

module.exports = sendMail;