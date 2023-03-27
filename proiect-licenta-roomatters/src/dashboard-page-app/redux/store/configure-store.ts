import { Reducer, Store, Middleware, createStore, applyMiddleware } from "redux";
import DashboardState from "./store";
import { DashboardActionType } from "../actions/types";
import dashboardReducer from "../reducers/dashboardReducer";
import createSagaMiddleware, { SagaMiddleware } from "@redux-saga/core";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { generalSaga } from "../sagas/saga";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';


const persistConfiguration: PersistConfig<any, any, any, any> = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["toggleAddForm", "toggleViewForm", "viewFormContent"]
  };
  
export default function configureStore() {
    const rootReducer: Reducer<DashboardState & PersistPartial, DashboardActionType> = persistReducer(persistConfiguration, dashboardReducer);
    const sagaMiddleware: SagaMiddleware<DashboardState> = createSagaMiddleware();
    const loggerMiddleware: Middleware = createLogger();

    const store: Store<DashboardState & PersistPartial, any> = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
    );
    const persistor = persistStore(store);
    sagaMiddleware.run(generalSaga);
    return { store, persistor };
}