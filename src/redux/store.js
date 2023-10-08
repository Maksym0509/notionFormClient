import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Extra/authSlice";
import formReducer from "./Form/formSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
  },
});
