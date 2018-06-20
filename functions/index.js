const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const registerEmail = require('./f/registerEmail');
const validateEmail = require('./f/validateEmail');
const getUserData = require('./f/getUserData');

exports.registerEmail = functions.https.onRequest((req, res) => {
    registerEmail.handler(req, res, admin);
});
exports.validateEmail = functions.https.onRequest((req, res) => {
    validateEmail.handler(req, res, admin);
});
exports.getUserData = functions.https.onRequest((req, res) => {
    getUserData.handler(req, res, admin);
});
