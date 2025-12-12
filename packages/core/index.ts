import { makeInstaller } from "@toy-element/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from "./printLogo";
import components from "./component";
import "@toy-element/theme/index.css";

printLogo();
library.add(fas);
const installer = makeInstaller(components);

export * from "@toy-element/components";
export default installer;
