// src/utils/apiResponse.js
const success = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
     success: true,
     message,
     data
    });
   };
   const created = (res, data, message = 'Created', statusCode = 201) => {
     res.status(statusCode).json({
      success: true,
      message,
      data
     });
    };
   const updated = (res, data, message = 'Updated Successfully', statusCode = 200) => {
     res.status(statusCode).json({
      success: true,
      message,
      data
     });
    };
   const deleted = (res, message = 'Deleted Successfully', statusCode = 200) => {
     res.status(statusCode).json({
      success: true,
      message
     });
    };
   const error = (res, message = 'Server Error', statusCode = 500) => {
    res.status(statusCode).json({
     success: false,
     message,
    });
   };
   const badRequest = (res, message = 'Bad Request', statusCode = 400) => {
    res.status(statusCode).json({
     success: false,
     message,
    });
   };
   const unauthorized = (res, message = 'Unauthorized', statusCode = 401) => {
    res.status(statusCode).json({
     success: false,
     message,
    });
   };
   const forbidden = (res, message = 'Forbidden', statusCode = 403) => {
    res.status(statusCode).json({
     success: false,
     message,
    });
   };
   const notFound = (res, message = 'Not Found', statusCode = 404) => {
    res.status(statusCode).json({
     success: false,
     message,
    });
   };
   module.exports = {
    success,
    created,
    updated,
    deleted,
    error,
    badRequest,
    unauthorized,
    forbidden,
    notFound
   }