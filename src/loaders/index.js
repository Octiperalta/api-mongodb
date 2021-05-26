// Se instancia el servidor
const expressServer = require("./server/expressServer");
const config = require("../config");
const logger = require("./logger");
const mongooseConnect = require("./mongoose");

const startServer = async () => {
  await mongooseConnect();
  logger.info(
    `╒════════════════════════════════════════╕
      │ ✔ DB loaded and connected successfully │
      ╘════════════════════════════════════════╛`
  );
  const server = new expressServer();
  logger.info(
    `╒════════════════════════════╕
      │ ✔ Express loaded correctly │
      ╘════════════════════════════╛`
  );

  server.start();
  logger.info(
    `╒════════════════════════════════════════════╕
      │ ✔ Server running on http://localhost:${config.port}/ │
      ╘════════════════════════════════════════════╛`
  );
};

module.exports = startServer;
