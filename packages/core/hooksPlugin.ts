import { each, isFunction } from "lodash-es";
import shell from "shelljs";

export default function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fname) => shell.rm("-rf", fname));
      isFunction(beforeBuild) && beforeBuild();
    },
    closeBundle() {
      isFunction(afterBuild) && afterBuild();
    },
  };
}
