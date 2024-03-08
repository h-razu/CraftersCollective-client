import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: {
    email: "",
    accountType: "",
    profileImage: "",
    name: "",
  },
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
};

type UserType = {
  email: string;
  password: string;
};
//==create user with email and password
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: UserType) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return userCredential.user;
  }
);

//==create user with google sign in
export const createUserWithGoogle = createAsyncThunk(
  "auth/googleSignIn",
  async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    return userCredential.user;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: UserType) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return userCredential.user;
  }
);

//==get user full data from mongoDB
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (email: string) => {
    return email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsSuccess: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //==create user
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
        if (action.payload.email) state.user.email = action.payload.email;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user.email = "";
        if (action.error.message) state.error = action.error.message;
      }) //==google sign in
      .addCase(createUserWithGoogle.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(createUserWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
        if (action.payload.email) state.user.email = action.payload.email;
      })
      .addCase(createUserWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user.email = "";
        if (action.error.message) state.error = action.error.message;
      }) //===log in
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
        if (action.payload.email) state.user.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.isSuccess = false;
        if (action.error.message) state.error = action.error.message;
      })
      //==get user
      .addCase(getUserData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (action.payload) state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user.email = "";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { toggleIsSuccess } = authSlice.actions;
export default authSlice.reducer;
