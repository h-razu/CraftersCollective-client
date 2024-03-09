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

    const user = {
      userName: userCredential.user.displayName,
      email: userCredential.user.email,
      accountType: "",
      profileImageUrl: userCredential.user.photoURL,
    };

    return user;
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
    const res = await fetch(`http://localhost:5000/api/v1/user/${email}`);
    const data = await res.json();

    if (data.success) {
      return data.data;
    }
    return { email };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsSuccess: (state, action) => {
      state.isSuccess = false;
    },
    handleLogOut: (state, action) => {
      state.user = { email: "", accountType: "", profileImage: "", name: "" };
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
        state.isSuccess = true;
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
        if (action.payload.email) {
          state.user.email = action.payload.email;
          state.user.name = action.payload.userName;
          state.user.accountType = action.payload.accountType;
          state.user.profileImage = action.payload.profileImageUrl;
          state.isSuccess = true;
        }
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user.email = "";
        state.user.name = "";
        state.user.accountType = "";
        state.user.profileImage = "";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { toggleIsSuccess, handleLogOut } = authSlice.actions;
export default authSlice.reducer;
