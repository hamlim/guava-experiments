import { exec } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { promisify } from "node:util";

let execPromise = promisify(exec);

let commit = "c11c9510fa14bbd87053685c19bfdfec2f427f49";

if (existsSync("COMMIT_SHA")) {
  let contents = readFileSync("COMMIT_SHA", "utf8");
  console.log("Vendor SHA", contents);
  if (contents === commit) {
    console.log("Vendor up to date");
    process.exit(0);
  }
}
writeFileSync("COMMIT_SHA", commit);

await execPromise("mkdir -p vendor");

await execPromise(
  `bunx degit hamlim/react-artifacts/${commit}/oss-experimental ${process.cwd()}/vendor --force`,
);
