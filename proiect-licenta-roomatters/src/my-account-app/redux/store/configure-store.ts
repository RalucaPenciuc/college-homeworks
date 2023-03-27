import { Reducer, Store, Middleware, createStore, applyMiddleware } from "redux";
import MyAccountState from "./store";
import { MyAccountActionType } from "../actions/types";
import myAccountReducer from "../reducers/myAccountReducer";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { generalSaga } from "../sagas/saga";

export default function configureStore() {
    const rootReducer: Reducer<MyAccountState, MyAccountActionType> = myAccountReducer;
    const sagaMiddleware: SagaMiddleware<MyAccountState> = createSagaMiddleware();
    const loggerMiddleware: Middleware = createLogger();

    const store: Store<MyAccountState, any> = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
    );
    sagaMiddleware.run(generalSaga);
    return store;
}