import * as core from "@actions/core";
import * as shell from "shelljs";
import * as path from "path";

const homedir = require("os").homedir();
const bin = path.join(homedir, "bin");

export async function install(javaVersion: string, jabbaVersion: string) {
  setEnvironmentVariableCI();
  installSbt();
}

function setEnvironmentVariableCI() {
  core.exportVariable("CI", "true");
}

function installSbt() {
  core.startGroup("Install sbt");
  core.addPath(bin);
  curl(
    "https://raw.githubusercontent.com/paulp/sbt-extras/master/sbt",
    path.join(bin, "sbt")
  );
  curl(
    "https://raw.githubusercontent.com/coursier/sbt-extras/master/sbt",
    path.join(bin, "csbt")
  );
  core.endGroup();
}

function curl(url: string, outputFile: string) {
  shell.exec(`curl -sL ${url}`, { silent: true }).to(outputFile);
  shell.chmod(755, outputFile);
  shell.cat(outputFile);
  console.log(`Downloaded '${path.basename(outputFile)}' to ${outputFile}`);
}
