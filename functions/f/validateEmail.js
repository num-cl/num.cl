const fe = require("firebase-encode");

exports.handler = function(req, res, admin) {
  // link de validacion tipo: /validateEmail?user_email=mi@mail.cl&token=-Kasdafeigysdbg(token de firebase)
  const user_email = req.query.user_email;
  const token = req.query.token;

  var tokenRef = admin.database().ref('/pending/' + fe.encode(user_email)).child(token);
  tokenRef.once('value').then(snapshot => {
    if (snapshot.val() !== null) {
      admin.database().ref('/u/' + fe.encode(user_email)).set(snapshot.val());
      tokenRef.remove();
      res.redirect(303, 'https://num-cl.firebaseapp.com/' + user_email);
    } else {
      res.status(500).send('Error :c');
    }
    return;
  }).catch(err => res.status(500).send(err));
};
