let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testcoding975@gmail.com',
    pass: 'testCoding1998'
  }
});

module.exports = email = {
    mail: (emailcl,html) => {
        var mailOptions = {
            from: 'testcoding975@gmail.com',
            to: emailcl,
            subject: 'Success',
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
};