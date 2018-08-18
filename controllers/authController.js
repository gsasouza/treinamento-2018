const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const UserSchema = require('../models/userSchema');

const SECRET = process.env.SECRET;

const authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;
    await UserSchema.validate(req.body);
    const user = await User.findOne({ username }).select('username password');

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado'
      });

    }

    const authenticated = await user.authenticate(password);

    if (!authenticated) {
      return res.status(400).json({
        message: 'Usuário ou senha inválidos'
      });
    }

    const token = `JWT ${jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d'})}`;

    return res.status(200).json({
      message: 'Autenticado com sucesso',
      token,
    })

  } catch (err) {
    return res.status(500).json({
      message: 'Erro no servidor ao tentar autenticar.',
      err,
    });
  }
};


/** use this to protect routes */
const isAuthenticated = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({
      message: 'Usuário não autenticado.'
    });
  }
  try {
    const { id } = await jwt.verify(token.replace('JWT', '').trim(), SECRET);
    req.user = {
      id,
    };
    return next();
  } catch (err) {
    return res.status(500).json({
      message: 'Erro inesperado',
      err,
    });
  }

};

module.exports = {
  authenticate,
  isAuthenticated,
};
