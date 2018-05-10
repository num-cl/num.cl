const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const registerEmail = require('./f/registerEmail');
const validateEmail = require('./f/validateEmail');
const getEmailData = require('./f/getEmailData');

exports.registerEmail = functions.https.onRequest((req, res) => {
    registerEmail.handler(req, res, admin);
});
exports.validateEmail = functions.https.onRequest((req, res) => {
    validateEmail.handler(req, res, admin);
});
exports.getEmailData = functions.https.onRequest((req, res) => {
    getEmailData.handler(req, res, admin);
});
