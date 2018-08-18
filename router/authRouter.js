const router = require('express').Router();
const authController = require('../controllers/authController');

const userRouter = () => {
  router.route('/')
    .post(authController.authenticate);

  return router;
};

module.exports = userRouter;
