    const nodemailer=require('nodemailer');
    const ejs = require('ejs');

    const EmailSend=async (emailTo, template, data, emailSubject)=>{
        try {

                const  transport= nodemailer.createTransport({
                host:"zpjamalpur.com",
                port: 465,
                secure: true,
                auth:{user:"noreply@zpjamalpur.com", pass:"}%cI}O)MOSBP"},
                tls:{rejectUnauthorized:true}
            })


            const htmlTemplate = await  ejs.renderFile(__dirname + '/../views/' + template +'.ejs', data, {async: true});

            const mailOption={
                from:'Zilla Porishad <noreply@zpjamalpur.com>',
                to:emailTo,
                subject:emailSubject,
                html:htmlTemplate
            }
            
            await transport.sendMail(mailOption);

        
        } catch (error) {
            console.log(error)
        }
       
    }

    module.exports=EmailSend;