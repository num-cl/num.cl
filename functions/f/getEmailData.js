const fe = require("firebase-encode");
const fs = require('fs');

exports.handler = function(req, res, admin) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const getOpenGraph = (data) => {
    let og = `<meta property="fb:app_id" content="921373517372" />`;
    og += `<meta property="og:type" content="website" />`;

    if (!data) {
      og += `<meta property="og:title" content="${defaultTitle}" />`;
      og += `<meta property="og:description" content="${defaultDesc}" />`;
      og += `<meta property="og:image" content="${defaultLogo}" />`;
      og += `<meta property="og:url" content="https://example.com" />`;
      return og;
    }
    og += `<meta property="og:title" content="${data.user_name} | ${data.user_rut}" />`;
    og += `<meta property="og:description" content="${data.bank_name} | ${data.bank_account_type} | ${data.bank_account_number} | ${data.user_email}" />`;
    og += `<meta property="og:url" content="${fullUrl}" />`;
    og += `<meta property="og:image" itemprop="image" content="https://num-cl.firebaseapp.com/images/logo.png" />`;
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
    return template.replace(/\$user_email/g, data.user_email);
  }

  var indexHTML = fs.readFileSync('./views/your-details.html').toString();
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';

  const user_email = req.path.replace('/', '');
  console.log(user_email);
  admin.database().ref('/u/' + fe.encode(user_email))
    .once('value').then(snap => {
      if (snap.val() !== null) {
        indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(snap.val()));
        indexHTML = replaceUserData(indexHTML, snap.val());
        res.status(200).send(indexHTML);
      } else {
        res.status(404).send('Ese mail no existe en nuestros registros :/');
      }
      return;
    }
  ).catch(err => res.status(500).send(err));
};
