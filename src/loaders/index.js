// Se instancia el servidor
const expressServer = require("./server/expressServer");
const config = require("../config");
const logger = require("./logger");

const startServer = async () => {
  const server = new expressServer();
  logger.info("Express loaded");

  server.start();
  logger.info(
    `\n╒══════════════════════════════════════════╕\n│ Server running on http://localhost:${config.port}/ │\n╘══════════════════════════════════════════╛`
  );
};

module.exports = startServer;
