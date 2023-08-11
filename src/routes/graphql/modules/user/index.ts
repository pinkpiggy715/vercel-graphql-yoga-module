import { loadFiles, loadFilesSync } from "@graphql-tools/load-files";
import { createModule } from "graphql-modules";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userModule = createModule({
  dirname: __dirname,
  id: "user",
  resolvers: await loadFiles(join(__dirname, "./**/**/*.resolver.*")),
  typeDefs: loadFilesSync(join(__dirname, "./**/*.graphql")),
});

export default userModule;
