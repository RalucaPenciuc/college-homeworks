import React, { Component } from "react";
import { Provider } from "react-redux";
import DashboardComponent from "./components/DashboardComponent";
import configureStore from "./redux/store/configure-store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

export default class DashboardPageApp extends Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("Error occured in DashboardComponent: ", error, info);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <DashboardComponent />
        </PersistGate>
      </Provider>
    );
  }
}
