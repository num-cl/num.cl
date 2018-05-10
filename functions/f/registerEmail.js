const functions = require('firebase-functions');
const fe = require("firebase-encode");
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.handler = function(req, res, admin) {
  const user_email = req.query.user_email;

  // TODO:  Validate fields

  var registration = admin.database().ref('/pending/' + fe.encode(user_email)).push(
    {
      u_email: user_email,
      u_name: req.query.user_name,
      u_rut: req.query.user_rut,
      b_name: req.query.bank_name,
      b_type: req.query.bank_type,
      b_num: req.query.bank_num
    }).then(snap => {
      // https://github.com/firebase/functions-samples/tree/master/email-confirmation
      const mailOptions = {
        from: '"Num.cl" <test.num.cl@gmail.com>',
        to: user_email,
        subject: '[Num.cl] Valida tu email :)'
      };
      mailOptions.text = 'Para validar tu mail visita este link: '
        + 'https://us-central1-num-cl.cloudfunctions.net/validateEmail?'
        + 'user_email=' + fe.encode(user_email)
        + '&'
        + 'token=' + snap.key;

      mailTransport.sendMail(mailOptions).then(() => {
        res.redirect(303, 'https://num-cl.firebaseapp.com/validation-pending.html');
        return;
      }).catch(error => {
        console.error('There was an error while sending the email:', error);
        res.status(500).send('Error :c');
      });
      return;
  });
};
