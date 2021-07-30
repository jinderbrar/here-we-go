import { combineReducers, createStore } from "redux";
import taskbar from "./reducers/taskbar";

const rootReducer = combineReducers({
  taskbar,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
