const authService = require('../services/authServices');

exports.register = (req, res) => {
    authService.register(req.body)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
};

exports.login = (req, res) => {
    authService.login(req.body)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
};

exports.logout = (req, res) => {
    authService.logout(req.body)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
};

exports.refreshToken = (req, res) => {
    authService.refreshToken(req.body)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
};
