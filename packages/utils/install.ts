import type { App, Plugin } from "vue";
import { each } from "lodash-es";

type SFCwithInstall<T> = T & Plugin;

export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) => {
    each(components, (component) => {
      app.use(component);
    });
  };
  return installer as Plugin;
}

export const withInstall = <T>(component: T) => {
  (component as SFCwithInstall<T>).install = (app: App) => {
    const name = (component as any).name;
    app.component(name, component as Plugin);
  };
  return component as SFCwithInstall<T>;
};
