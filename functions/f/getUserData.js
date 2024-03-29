const functions = require('firebase-functions');
const encoder = require('./helper/encoder');
const fs = require('fs');

exports.handler = function(req, res, admin) {
  const hostUrl = functions.config().application.host;
  const fullUrl = hostUrl + req.originalUrl;
  const getOpenGraph = (data) => {
    let og = `<meta property="fb:app_id" content="921373517372" />`;
    og += `<meta property="og:type" content="website" />`;
    og += `<meta property="og:title" content="${data.user_name} | ${data.user_rut}" />`;
    og += `<meta property="og:description" content="${data.bank_name} | ${data.account_type} | ${data.account_number} | ${data.user_email}" />`;
    og += `<meta property="og:url" content="${fullUrl}" />`;
    og += `<meta property="og:type" content="website" />`;
    og += `<meta property="og:locale" content="es_LA" />`;
    return og;
  };

  const replaceUserData = (template, data) => {
    template = template.replace(/\$user_name/g, data.user_name);
    template = template.replace(/\$user_rut/g, data.user_rut);
    template = template.replace(/\$bank_name/g, data.bank_name);
    template = template.replace(/\$account_type/g, data.account_type);
    template = template.replace(/\$account_number/g, data.account_number);
    template = template.replace(/\$user_email/g, data.user_email);
    full_data = `${data.user_name}\n${data.user_rut}\n${data.bank_name}\n${data.account_type}\n${data.account_number}\n${data.user_email}`;
    return template.replace(/\$full_data/g, full_data);
  }

  var indexHTML = fs.readFileSync('./views/your-details.html').toString();
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';

  const retrieveUserData = (email) => {
    admin.database().ref(`/user/by_email/${encoder.encode(email)}`)
      .once('value').then(snap => {
        if (snap.val() !== null) {
          indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(snap.val()));
          indexHTML = replaceUserData(indexHTML, snap.val());
          res.status(200).send(indexHTML);
        } else {
          console.log(email);
          res.status(404).send(`El mail ${email} no existe en nuestros registros :/`);
        }
        return;
      }
    ).catch(err => res.status(500).send(err));
  }

  const retrieveUserEmailAndThenData = (username) => {
    admin.database().ref(`/user/by_username/${encoder.encode(username)}`)
      .once('value').then(snap => {
        if (snap.val() !== null) {
          retrieveUserData(snap.val());
        } else {
          console.log(username);
          res.status(404).send('Ese usuario no existe en nuestros registros :/');
        }
        return;
      }
    ).catch(err => res.status(500).send(err));
  }

  const user_reference = req.path.replace('/', '');
  if (user_reference.indexOf('@') > -1) {
    retrieveUserData(user_reference);
  } else {
    retrieveUserEmailAndThenData(user_reference);
  }
};
