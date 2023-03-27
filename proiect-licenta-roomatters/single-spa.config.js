import { registerApplication, start } from "single-spa";
import { getCookie } from "./src/authentication-app/services/CookieService";

registerApplication(
  "root-page-app",
  () => import("./src/root-page-app/root-page.app"),
  () =>
    location.pathname === "" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/home")
);

registerApplication(
  "layout-app",
  () => import("./src/layout-app/layout.app"),
  () => getCookie("not-token")
);

registerApplication(
  "authentication-app",
  () => import("./src/authentication-app/authentication.app"),
  () =>
    (location.pathname === "/sign-up" || location.pathname === "/login") && !getCookie("not-token")
);

registerApplication(
  "dashboard-page-app",
  () => import("./src/dashboard-page-app/dashboard-page.app"),
  () => location.pathname === "/dashboard" && getCookie("not-token")
);

registerApplication(
  "my-account-app",
  () => import("./src/my-account-app/my-account.app"),
  () => location.pathname.includes("/my-account")
);

registerApplication(
  "my-apartment-app",
  () => import("./src/my-apartment-app/my-apartment.app"),
  () => location.pathname === "/my-apartment"
);

start();
