import "./utils/initConfig";

import http from "node:http";
import app from "./app";
import appConfig from "./configs";
import asciiArt from "./misc/asciiArt";
import Logger from "./utils/log";

const server = http.createServer(app);

server.listen(appConfig.port, () => {
  Logger.log.trace(
    {
      DEPLOYED_ENV: appConfig.deployedEnv,
      NODE_ENV: appConfig.nodeEnv,
      PORT: appConfig.port,
    },
    asciiArt,
  );
});

const shutDownServer = async (signal: string) => {
  Logger.log.info({
    message: `${signal} signal received at ${new Date().toISOString()}`,
  });
  server.close((err) => {
    if (err) {
      Logger.log.error({ message: err });
      return process.exit(1);
    }
    Logger.log.info({ message: "Graceful shutdown complete" });
    return process.exit(0);
  });
};

process.on("SIGINT", shutDownServer);
process.on("SIGTERM", shutDownServer);
