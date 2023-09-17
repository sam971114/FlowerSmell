import { configureStore, createSlice } from "@reduxjs/toolkit";

let baseUrl = createSlice({
  name: "baseUrl",
  initialState: {
    url: "http://localhost:8080",
  },
  reducers: {
    changeUrl(state, action) {
      state.url = action.payload.url;
    },
  },
});

let userS = createSlice({
  name: "userS",
  initialState: {
    id: -1,
    name: "",
    role: "",
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
  },
});

let selectedShop = createSlice({
  name: "selectedShop",
  initialState: {
    b_id: -1,
    name: "",
    address: "",
    phoneNum: "",
    issub: false,
  },
  reducers: {
    changeShop(state, action) {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.phoneNum = action.payload.phoneNum;
      state.issub = action.payload.issub;
      state.b_id = action.payload.b_id;
    },
  },
});

export let { changeShop } = selectedShop.actions;
export let { changeName } = userS.actions;
export let { changeUrl } = baseUrl.actions;

export default configureStore({
  reducer: {
    selectedShop: selectedShop.reducer,
    userS: userS.reducer,
    baseUrl: baseUrl.reducer,
  },
});
