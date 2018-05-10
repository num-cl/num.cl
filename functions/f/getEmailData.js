const fe = require("firebase-encode");
const fs = require('fs');

exports.handler = function(req, res, admin) {
  const defaultDesc = 'The mobsters, bootleggers and gangsters of the 1920s and 30s, such as Al Capone, Lucky Luciano, and Bugs Moran.';
  const defaultTitle = 'Original Gangsters';
  const defaultLogo = 'https://example.com/images/headerHQ.jpg';

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
    og += `<meta property="og:title" content="${data.u_name} | ${data.u_rut}" />`;
    og += `<meta property="og:description" content="${data.b_name} | ${data.b_type} | ${data.b_num} | ${data.u_email}" />`;
    og += `<meta property="og:url" content="${fullUrl}" />`;
    og += `<meta property="og:image" itemprop="image" content="https://num-cl.firebaseapp.com/images/logo.png" />`;
    og += `<meta property="og:type" content="website" />`;
    og += `<meta property="og:locale" content="es_LA" />`;
    return og;
  };

  var indexHTML = fs.readFileSync('./public/your-details.html').toString();
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
  const metaPlaceholder = '<meta name="functions-insert-dynamic-meta">';

  const user_email = req.path.replace('/', '');
  console.log(user_email);
  admin.database().ref('/u/' + fe.encode(user_email))
    .once('value').then(snap => {
      if (snap.val() !== null) {
        indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(snap.val()));
        res.status(200).send(indexHTML);
      } else {
        res.status(404).send('Ese mail no existe en nuestros registros :/');
      }
      return;
    }
  ).catch(err => res.status(500).send(err));
};
