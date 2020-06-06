const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require("../config/email.config");


async function sendEmail(user, task){
    const transport = nodemailer.createTransport(config);
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
    transport.use('compile', hbs(options));

    var mail = {
        from: 'admin@todoApp.com',
        to: user.email,
        subject: 'Task assigned',
        template: 'email',
        context: {
            username: user.name,
            task_id: task.id,
            task_title: task.title,
            task_des: task.description
        }
    };

    try {
        transport.sendMail(mail);

    } catch (error) {
        console.log("Email not sent due to ", error);
        return error;
    }

}

async function sendReminderEmail(user, task){
    const transport = nodemailer.createTransport(config);
    var options = {
        viewEngine: {
            extName: '.hbs',
            partialsDir: 'app/views',
            layoutsDir: 'app/views',
            defaultLayout: 'reminder.hbs',
        },
        viewPath: 'app/views',
        extName: '.hbs'
    };
    transport.use('compile', hbs(options));

    var mail = {
        from: 'admin@todoApp.com',
        to: user.email,
        subject: 'Reminder Email',
        template: 'reminder',
        context: {
            username: user.name,
            task_id: task.id,
            task_title: task.title,
            task_des: task.description
        }
    };

    try {
        transport.sendMail(mail);

    } catch (error) {
        console.log("Email not sent due to ", error);
        return error;
    }

}

module.exports = {
    sendEmail,
    sendReminderEmail
};
