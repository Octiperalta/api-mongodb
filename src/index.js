const startServer = async (req, res) => {
  require("./loaders")(); // Agrego los parentesis para ejecutar la funcion que estoy importando
};

startServer();
