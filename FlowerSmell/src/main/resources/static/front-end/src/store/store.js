// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // 여기서는 리듀서를 import 해야합니다.

const store = createStore(rootReducer);

export default store;
