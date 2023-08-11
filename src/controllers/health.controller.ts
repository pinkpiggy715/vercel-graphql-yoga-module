import { Request, Response } from "express";
import appConfig from "../configs";
import services from "../services";

export const getHealth = async (
  req: Request,
  res: Response<
    unknown,
    {
      txId: string;
    }
  >,
): Promise<Response> => {
  const { txId } = res.locals;

  const serviceObjects = [services.user];

  const results = await Promise.allSettled(
    serviceObjects.map((service) => service.health(txId)),
  );

  const servicesHealth: Record<string, "Down" | "Up"> = {};

  results.forEach((result, index) => {
    servicesHealth[serviceObjects[index].name] =
      result?.status === "fulfilled" && !!result?.value?.data ? "Up" : "Down";
  });

  const basicStatus = {
    atmGitCommit: appConfig.status.atmGitCommit,
    deployedEnv: appConfig.deployedEnv,
    nodeEnv: appConfig.nodeEnv,
    services: servicesHealth,
  };

  return res.json(basicStatus);
};
