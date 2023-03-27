import React, { Component } from "react";
import configureStore from "./redux/store/configure-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MyAccountRoutes from "./components/MyAccountRoutes";

const store = configureStore();

export default class MyAccountApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in MyAccountApp: ", error, info);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MyAccountRoutes />
        </BrowserRouter>
      </Provider>
    );
  }
}
