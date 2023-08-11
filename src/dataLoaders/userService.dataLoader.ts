import DataLoader from "dataloader";
import services from "../services";

export default class userServiceDataLoader {
  getName = (txId: string) =>
    new DataLoader(async (uuids: readonly string[]) => uuids.map(() => "x"));

  saveName = (txId: string) =>
    new DataLoader(
      async (
        keys: readonly {
          A: number;
          B: string;
        }[],
      ) => keys.map(({ A, B }) => "data saved"),
    );
}
