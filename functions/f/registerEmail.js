const functions = require('firebase-functions');
const fe = require("firebase-encode");
const sgMail = require('@sendgrid/mail');

exports.handler = function(req, res, admin) {
  const user_email = req.query.user_email;
  const hostUrl = functions.config().num.host;
  sgMail.setApiKey(functions.config().sendgrid.api_key);

  // TODO:  Validate fields

  data = {
    user_email: user_email,
    user_name: req.query.user_name,
    user_rut: req.query.user_rut,
    bank_name: req.query.bank_name,
    account_type: req.query.account_type,
    account_number: req.query.account_number
  }
  if (req.query.short_url !== null) {
    data["username"] = req.query.short_url;
  }

  const sendValidationEmail = (snap) => {
    link = `${hostUrl}/function/validate_email?user_email=${fe.encode(user_email)}&token=${snap.key}`;
    const msg = {
      to: user_email,
      from: `"Num.cl" <${functions.config().sendgrid.from_email}>`,
      subject: '[Num.cl] Valida tu email :)',
      text: `Para validar tu mail visita este link: ${link}`
    };
    sgMail.send(msg);
    res.redirect(303, `${hostUrl}/validation-pending.html`);
    return;
  }

  const registerUser = () => {
    var registration = admin.database().ref('/pending/' + fe.encode(user_email)).push(
      data
    ).then(snap => {
      sendValidationEmail(snap);
      return;
    });
  }

  admin.database().ref(`/user/by_username/${data.username}`)
    .once('value').then(snap => {
      if (snap.val() !== null) {
        res.status(409).send(`La url num.cl/${data.username} ya está tomada :( Por favor prueba con otra url`);
      } else {
        registerUser();
      }
      return;
    }
  ).catch(err => res.status(500).send(err));
};
