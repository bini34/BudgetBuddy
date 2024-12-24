// src/middlewares/errorHandler.js
const apiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
 console.error(err.stack)
 return apiResponse.error(res, err.message, err.status || 500)
};
module.exports = errorHandler;