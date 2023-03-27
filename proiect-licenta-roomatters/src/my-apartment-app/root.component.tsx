import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configure-store";
import MyApartmentComponent from "./components/MyApartmentComponent";

const store = configureStore();

export default class MyApartmentApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in MyApartmentApp: ", error, info);
  }

  render() {
    return (
      <Provider store={store}>
        <MyApartmentComponent />
      </Provider>
    );
  }
}
