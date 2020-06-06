const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require("../config/email.config");

var options = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'app/views',
        layoutsDir: 'app/views',
        defaultLayout: 'email.hbs',
    },
    viewPath: 'app/views',
    extName: '.hbs'
};


async function sendEmail(email, task){
    const transport = nodemailer.createTransport(config);
    transport.use('compile', hbs(options));

    var mail = {
        from: 'admin@todoApp.com',
        to: email,
        subject: 'Test',
        template: 'email',
        context: {
            task_id: task.id,
            task_title: task.title,
            task_des: task.description
        }
    };

    try {
        transport.sendMail(mail);
        console.log("Email sent");

    } catch (error) {
        console.log("Email not sent due to ", error);
        return error;
    }

}

// async function send(req, res){
//     const data = req.body;
//     try {
//         sendEmail(data.email, data.task_id, data.task_name);
//         res.send({
//             message: 'Email sent successfully'
//         });
        
//     } catch (error) {
//         console.log(err.message);
//         res.status(500).send({
//             status: "FAILURE",
//             message:
//                 err.message || "DB error"
//         });       
//     }
// }

module.exports = {
    sendEmail,
    // send
};
