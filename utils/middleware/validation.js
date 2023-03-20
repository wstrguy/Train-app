const Joi = require('joi');

// wrapper function
const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      if (!req.value) {
        req.value = {}; // create an empty object the request value doesn't exist yet
      }
      req.value["body"] = req.body;
      next();
    };
  };

    const schemas = {
    userSchema: Joi.object().keys({
        first_name: Joi.string().min(2).max(30).required(),
        last_name: Joi.string().min(2).max(30).required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: {allow: ["com", "org", "net"]}})
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .max(12)
        .trim()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phone: Joi.string().required(),
  }),
    loginSchema: Joi.object().keys({
        email: Joi.string()
        .email()
        .required(),
    password: Joi.string().required(),
}),
    bookingSchema: Joi.object().keys({
        // user_id: Joi.string().required(),
        destination: Joi.string().required(),
        date: Joi.string().required(),
        type: Joi.string().required(),
        time: Joi.string().required(),
    }),
        

};


// exporting the module
module.exports = {
    validateRequest,
    schemas,
};