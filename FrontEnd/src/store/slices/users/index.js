import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const routeApi = "http://127.0.0.1:8000/api/";
const config = { headers: { "Content-Type": "application/json" } };

export const login = createAsyncThunk("users/login", (data) => {
  const routeUser = routeApi + "login";
  data = JSON.stringify(data);
  return axios
    .post(routeUser, data, config)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
});

export const register = createAsyncThunk("users/register", (data) => {
  const routeUser = routeApi + "register";
  data = JSON.stringify(data);
  return axios
    .post(routeUser, data, config)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
});

export const listTasksINC = createAsyncThunk("users/listTasksINC", (token) => {
  const routeUser = routeApi + "list-task";
  const configg = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return axios
    .get(routeUser, configg)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
});

export const listTasksCOM = createAsyncThunk("users/listTasksCOM", (token) => {
  const routeUser = routeApi + "list-task-completed";
  const configg = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return axios
    .get(routeUser, configg)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
});

const initialState = {
  user: null,
  isLogged: false,
  resp: "",
  isRegister: false,
  listTasksI: [],
  listTasksC: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action) => {
      state.isLogged = true;
    },
    setResp: (state, action) => {
      state.resp = action.payload.resp;
    },
    setIsRegister: (state, action) => {
      state.isRegister = true;
    },
    setInit: (state, action) => {
      state.user = null;
      state.isLogged = false;
      state.resp = "";
      state.isRegister = false;
      state.listTasksI = [];
      state.listTasksC = [];
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.isLogged = typeof action.payload !== "string";
      if (state.isLogged) {
        state.user = action.payload;
        localStorage.setItem("userLS", JSON.stringify(state.user));
      } else {
        state.resp = action.payload;
      }
    },
    [register.fulfilled.type]: (state, action) => {
      state.isRegister = true;
      state.resp = action.payload;
    },
    [listTasksINC.fulfilled.type]: (state, action) => {
      state.listTasksI = action.payload;
    },
    [listTasksCOM.fulfilled.type]: (state, action) => {
      state.listTasksC = action.payload;
    },
  },
});

export const { setUser, setIsLogged, setIsRegister, resp, setInit } = userSlice.actions;

export default userSlice.reducer;
