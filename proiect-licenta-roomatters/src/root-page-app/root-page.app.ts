import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import RootPageApp from "./root.component";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RootPageApp,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];
export const mount = [reactLifecycles.mount];
export const unmount = [reactLifecycles.unmount];

function domElementGetter(): Element {
  return <Element>document.getElementById("root-page-app");
}
