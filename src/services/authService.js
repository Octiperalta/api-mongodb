const AppError = require("../errors/AppError");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { auth } = require("../config");
const logger = require("../loaders/logger");

//* Funcion que se encarga de verificar todos los datos del login sean correctos para posteriormente proveer un token
const login = async (email, password) => {
  try {
    const user = await userService.findByEmail(email);
    //* Validacion del mail
    if (!user) {
      throw new AppError(
        "Authentication failed! Email and password provided are incorrect",
        401
      );
    }

    //* Validacion si el usuario esta habilitado
    if (!user.enabled) {
      throw new Error(
        "Authentication failed! The user is currently disabled",
        401
      );
    }

    //* Validacion de password
    const validPassword = await bcrypt.compare(password, user.password); //? Compara la pass literal con la encrpitada
    if (!validPassword) {
      throw new AppError(
        "Authentication failed! Email and password provided are incorrect.",
        401
      );
    }

    //* Si pasan las dos validaciones, se genera el JWT
    const token = _encrypt(user._id);

    return {
      token,
      user: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

//* Funcion privada que genera un token a partir de un ID, una clave privada y un tiempo de expiracion
const _encrypt = id => {
  return jwt.sign({ id }, auth.secret, { expiresIn: auth.ttl });
};

//* Funcion que se encarga de verificar que el token sea valido
const validateToken = async token => {
  try {
    // 1) Validar que lo que venga sea efectivamente un token
    if (!token) {
      throw new AppError("Authentication failed! Token missing.", 401);
    }
    // logger.info(`token received ${token}`);

    // 2) Validar que sea integro
    let id;
    try {
      const obj = jwt.verify(token, auth.secret); //? Devuelve la informacion asociada al token si existe; caso contrario, lanzara un excepcion
      id = obj.id;
      // logger.info(`id retrieved ${id}`);
    } catch (error) {
      throw new AppError("Token is invalid", 401);
    }

    // 3) Validar que el usuario asociado sea valido
    const user = await userService.findById(id);
    if (!user) {
      throw new AppError("Authentication failed! Invalid token.", 401);
    }
    logger.info(`user retrieved ${user}`);

    // 4) Validar que el usuario este habilitado
    if (!user.enabled) {
      throw new AppError(
        "Authentication failed! User is currently disabled.",
        401
      );
    }
    // logger.info(`user is enabled`);

    //* Si se cumplen todas las validaciones, se devuevle el usuario correspondiente
    return user;
  } catch (error) {
    throw error;
  }
};

//* Funcion que se encarga de verificar que el usuario cumpla con los roles necesarios
const validateRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError(
      "Authorization failed! The user does not have enough privileges to commit the request.",
      403
    );
  }
  return true;
};

module.exports = {
  login,
  validateToken,
  validateRole,
};
