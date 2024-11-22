import { $ } from "bun";

let expectedArgs = [
  // `${OWNER}/${NAME}
  "repo",
  // any string
  "ref",
  // any string
  "dest",
  // any string
  "path",
];

type Args = {
  repo: string;
  ref: string;
  dest: string;
  path: string;
};

let args = process.argv.slice(2).reduce((acc, rawArg) => {
  let key = rawArg;
  if (key.startsWith("--")) {
    key = key.slice(2);
  }
  if (key.includes("=")) {
    let [k, v] = key.split("=");
    acc[k as keyof Args] = v;
  }
  return acc;
}, {} as Args);

for (let arg of expectedArgs) {
  if (!(arg in args)) {
    throw new Error(`Missing required argument: ${arg}`);
  }
}

// clone repo
// make the cache dir
try {
  await $`mkdir -p ~/.degit-cache`;
} catch (e) {
  console.error(`Failed to create cache dir: ${e}`);
  process.exit(1);
}

let repoName = args.repo.split("/").pop();

try {
  await $`git clone --branch ${args.ref} --single-branch https://github.com/${args.repo} ~/.degit-cache/${repoName}-${args.ref}`;
} catch (e) {
  console.error(`Failed to clone repo: ${e}`);
  process.exit(1);
}

// copy the path to the local dest
try {
  await $`cp -r ~/.degit-cache/${repoName}-${args.ref}/${args.path} ${args.dest}`;
} catch (e) {
  console.error(`Failed to copy path: ${e}`);
  process.exit(1);
}

console.log(`Copied ${args.path} to ${args.dest}`);
