import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import StaticLayout from "./components/StaticLayout";

export default class LayoutApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in RootPage: ", error, info);
  }

  render() {
    return (
      <BrowserRouter>
        <AppRoutes />
        <StaticLayout />
      </BrowserRouter>
    );
  }
}
