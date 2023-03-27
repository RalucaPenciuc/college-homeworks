import { Reducer, Store, Middleware, createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { generalSaga } from "../sagas/saga";
import MyApartmentState from "./store";
import { MyApartmentActionType } from "../actions/types";
import myApartmentReducer from "../reducers/myApartmentReducer";

export default function configureStore() {
    const rootReducer: Reducer<MyApartmentState, MyApartmentActionType> = myApartmentReducer;
    const sagaMiddleware: SagaMiddleware<MyApartmentState> = createSagaMiddleware();
    const loggerMiddleware: Middleware = createLogger();

    const store: Store<MyApartmentState, any> = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
    );
    sagaMiddleware.run(generalSaga);
    return store;
}