const Yup = require('yup');

module.exports = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  name: Yup.string(),
});
